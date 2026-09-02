// Client-side notification system for scheduled meetings.
//
// There is no push backend: reminders are derived purely from each meeting's
// `startsAt` timestamp. The same derived list feeds both the in-app bell/panel
// and (opt-in) OS-level browser notifications.

const PREFS_KEY = 'gif_notif_prefs'
const STATE_KEY = 'gif_notif_state'

// How far ahead of a meeting's start each reminder fires.
export const REMINDER_OFFSETS = [
  { minutes: 60, tag: 't60', phrase: 'in 1 hour' },
  { minutes: 15, tag: 't15', phrase: 'in 15 minutes' },
  { minutes: 0, tag: 't0', phrase: 'now' },
]

const CLOCK_KEY = 'gif_notif_test_clock'

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? { ...fallback, ...JSON.parse(raw) } : { ...fallback }
  } catch {
    return { ...fallback }
  }
}

const readRaw = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — notifications degrade to in-memory only */
  }
}

const PREFS_DEFAULT = { browser: false }
const STATE_DEFAULT = { seenAt: 0, dismissed: [], delivered: [] }

export const getNotifPrefs = () => read(PREFS_KEY, PREFS_DEFAULT)

export function setNotifPrefs(patch) {
  const next = { ...getNotifPrefs(), ...patch }
  write(PREFS_KEY, next)
  return next
}

// Anything that mutates persisted notification state or the test clock calls
// this, so open bell instances re-read localStorage instead of drifting from it.
const changeListeners = new Set()

export function subscribeNotifications(listener) {
  changeListeners.add(listener)
  return () => changeListeners.delete(listener)
}

const notifyChange = () => {
  for (const listener of changeListeners) {
    try {
      listener()
    } catch (err) {
      console.warn('Notification listener failed:', err)
    }
  }
}

export const getNotifState = () => read(STATE_KEY, STATE_DEFAULT)

export function setNotifState(patch) {
  const next = { ...getNotifState(), ...patch }
  write(STATE_KEY, next)
  notifyChange()
  return next
}

// --- Test-mode clock override ----------------------------------------------
// Lets reminder logic evaluate against a fake "now" so the notification flow
// can be exercised without waiting for a real meeting time. Persisted in
// localStorage so it survives reloads and the poll interval. Ignored whenever a
// caller passes an explicit timestamp (unit tests stay deterministic).
//
//   setTestClock('2026-09-04T10:55')            frozen fake now
//   setTestClock({ offsetMs: 4 * 864e5 })       real clock shifted forward (keeps ticking)
//   setTestClock(null)                          back to real time

export const getTestClock = () => readRaw(CLOCK_KEY)

export function clearTestClock() {
  try {
    localStorage.removeItem(CLOCK_KEY)
  } catch {
    /* ignore */
  }
  notifyChange()
  return null
}

export function setTestClock(config) {
  if (config == null) return clearTestClock()

  let next
  if (typeof config === 'string' || config instanceof Date) {
    next = { fixedAt: new Date(config).getTime() }
  } else if (typeof config === 'number') {
    next = { offsetMs: config }
  } else if (config.fixedAt != null) {
    next = { fixedAt: new Date(config.fixedAt).getTime() }
  } else if (config.offsetMs != null) {
    next = { offsetMs: Number(config.offsetMs) }
  } else {
    return clearTestClock()
  }

  if (Number.isNaN(next.fixedAt) || Number.isNaN(next.offsetMs)) {
    throw new Error('setTestClock: invalid value')
  }

  write(CLOCK_KEY, next)
  notifyChange()
  return next
}

// The current time all reminder logic evaluates against: real time unless a
// test clock override is active.
export function now() {
  const clock = getTestClock()
  if (clock?.fixedAt != null) return clock.fixedAt
  if (clock?.offsetMs != null) return Date.now() + clock.offsetMs
  return Date.now()
}

// Applies a test clock from URL params so reminders can be driven from a device
// with no dev console (e.g. a phone): ?now=2026-09-05T15:00 · ?nowOffset=3600000
// · ?now=clear. Invalid values are ignored rather than blanking the app.
export function applyTestClockFromUrl(search = window.location.search) {
  const params = new URLSearchParams(search)
  const fixed = params.get('now')
  const offset = params.get('nowOffset')
  try {
    if (fixed === 'clear' || offset === 'clear') return clearTestClock()
    if (fixed) return setTestClock(fixed)
    if (offset) return setTestClock({ offsetMs: Number(offset) })
  } catch (err) {
    console.warn('Ignoring invalid test clock in URL:', err)
  }
  return getTestClock()
}

// Records that the user has seen every reminder due as of `at` (clears badge).
export const markNotificationsRead = (at = now()) => setNotifState({ seenAt: at })

export function dismissNotification(id) {
  const { dismissed } = getNotifState()
  if (dismissed.includes(id)) return dismissed
  const next = [...dismissed, id]
  setNotifState({ dismissed: next })
  return next
}

const startTime = (m) => (m.startsAt ? new Date(m.startsAt).getTime() : NaN)
const endTime = (m) => {
  const end = m.endsAt ? new Date(m.endsAt).getTime() : NaN
  return Number.isNaN(end) ? startTime(m) + 30 * 60000 : end
}

// The list of reminder notifications that are due as of `now`, newest first.
// A reminder disappears once its meeting has ended or the user dismisses it.
export function computeNotifications(meetings, at = now(), state = getNotifState()) {
  const { dismissed = [], seenAt = 0 } = state
  const items = []

  for (const meeting of meetings) {
    const start = startTime(meeting)
    if (Number.isNaN(start)) continue
    const end = endTime(meeting)

    for (const offset of REMINDER_OFFSETS) {
      const id = `${meeting.id}:${offset.tag}`
      const fireAt = start - offset.minutes * 60000
      if (at < fireAt || at > end || dismissed.includes(id)) continue

      items.push({
        id,
        meetingId: meeting.id,
        meeting,
        fireAt,
        offsetMinutes: offset.minutes,
        title:
          offset.minutes === 0
            ? `${meeting.partnerName} meeting starting now`
            : `Meeting with ${meeting.partnerName} ${offset.phrase}`,
        body: `${meeting.title} · ${meeting.time} · ${meeting.location}`,
        unread: fireAt > (seenAt || 0),
      })
    }
  }

  return items.sort((a, b) => b.fireAt - a.fireAt)
}

// Meetings that have not started yet — shown in the panel's "Upcoming" section.
export function upcomingMeetings(meetings, at = now()) {
  return meetings
    .filter((m) => {
      const start = startTime(m)
      return !Number.isNaN(start) && start > at
    })
    .sort((a, b) => startTime(a) - startTime(b))
}

export function getBrowserPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported'
  return Notification.permission
}

export async function requestBrowserPermission() {
  if (getBrowserPermission() === 'unsupported') return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'
  try {
    return await Notification.requestPermission()
  } catch {
    return Notification.permission
  }
}

// Fires an OS notification for each newly-due reminder, once. Delivery is
// deduped via localStorage so a reminder is not re-fired on every poll or reload.
export function deliverBrowserNotifications(notifications) {
  if (!getNotifPrefs().browser || getBrowserPermission() !== 'granted') return

  const { delivered } = getNotifState()
  const sent = new Set(delivered)
  const fresh = notifications.filter((n) => !sent.has(n.id))
  if (fresh.length === 0) return

  for (const n of fresh) {
    try {
      new Notification(n.title, { body: n.body, tag: n.id, icon: '/favicon.svg' })
    } catch (err) {
      console.warn('Browser notification failed:', err)
    }
    sent.add(n.id)
  }

  setNotifState({ delivered: [...sent] })
}

import { beforeEach, describe, expect, it } from 'vitest'
import {
  applyTestClockFromUrl,
  clearTestClock,
  computeNotifications,
  dismissNotification,
  getNotifPrefs,
  getTestClock,
  markNotificationsRead,
  now,
  setNotifPrefs,
  setTestClock,
  upcomingMeetings,
} from './notifications'

const MEETING = {
  id: 'm1',
  title: '1-on-1 Deal Discussion',
  partnerName: 'Akash Gupta',
  time: '11:00 AM – 11:30 AM',
  dayLabel: 'Day 1',
  location: 'Table 03',
  startsAt: '2026-09-04T11:00:00',
  endsAt: '2026-09-04T11:30:00',
}
const START = new Date(MEETING.startsAt).getTime()
const minutes = (n) => n * 60000

beforeEach(() => localStorage.clear())

describe('computeNotifications', () => {
  it('returns nothing well before the first reminder', () => {
    expect(computeNotifications([MEETING], START - minutes(90))).toHaveLength(0)
  })

  it('surfaces the 1-hour reminder once inside the window', () => {
    const items = computeNotifications([MEETING], START - minutes(45))
    expect(items).toHaveLength(1)
    expect(items[0].id).toBe('m1:t60')
    expect(items[0].offsetMinutes).toBe(60)
  })

  it('surfaces all three reminders at start time, newest first', () => {
    const items = computeNotifications([MEETING], START)
    expect(items.map((n) => n.id)).toEqual(['m1:t0', 'm1:t15', 'm1:t60'])
  })

  it('drops reminders once the meeting has ended', () => {
    expect(computeNotifications([MEETING], START + minutes(31))).toHaveLength(0)
  })

  it('omits a dismissed reminder but keeps the others', () => {
    dismissNotification('m1:t60')
    const items = computeNotifications([MEETING], START)
    expect(items.map((n) => n.id)).toEqual(['m1:t0', 'm1:t15'])
  })

  it('ignores meetings without a startsAt', () => {
    expect(computeNotifications([{ id: 'x', title: 't' }], START)).toHaveLength(0)
  })

  it('marks reminders unread until markNotificationsRead is called', () => {
    const now = START - minutes(45)
    expect(computeNotifications([MEETING], now)[0].unread).toBe(true)
    markNotificationsRead(now)
    expect(computeNotifications([MEETING], now)[0].unread).toBe(false)
  })
})

describe('upcomingMeetings', () => {
  it('returns only future meetings, soonest first', () => {
    const later = { ...MEETING, id: 'm2', startsAt: '2026-09-05T09:00:00' }
    const past = { ...MEETING, id: 'm0', startsAt: '2026-09-01T09:00:00' }
    const result = upcomingMeetings([later, past, MEETING], START - minutes(120))
    expect(result.map((m) => m.id)).toEqual(['m1', 'm2'])
  })
})

describe('test-mode clock', () => {
  it('now() tracks real time when no override is set', () => {
    expect(Math.abs(now() - Date.now())).toBeLessThan(1000)
  })

  it('freezes now() at a fixed timestamp', () => {
    setTestClock('2026-09-04T10:55:00')
    expect(now()).toBe(new Date('2026-09-04T10:55:00').getTime())
  })

  it('shifts now() by an offset while the real clock keeps ticking', () => {
    setTestClock({ offsetMs: 60000 })
    expect(Math.abs(now() - Date.now() - 60000)).toBeLessThan(1000)
  })

  it('clearTestClock / setTestClock(null) restores real time', () => {
    setTestClock('2026-09-04T10:55:00')
    clearTestClock()
    expect(Math.abs(now() - Date.now())).toBeLessThan(1000)
  })

  it('rejects an invalid date', () => {
    expect(() => setTestClock('not-a-date')).toThrow()
  })

  it('makes reminder logic evaluate against the fake now', () => {
    // 5 minutes before MEETING starts: the 60- and 15-minute reminders are due.
    setTestClock('2026-09-04T10:55:00')
    expect(computeNotifications([MEETING]).map((n) => n.id)).toEqual(['m1:t15', 'm1:t60'])

    // Jump past the meeting's end: everything clears.
    setTestClock('2026-09-04T12:00:00')
    expect(computeNotifications([MEETING])).toHaveLength(0)
  })

  it('is ignored when an explicit timestamp is passed', () => {
    setTestClock('2026-09-04T10:55:00')
    expect(computeNotifications([MEETING], START - minutes(90))).toHaveLength(0)
  })
})

describe('applyTestClockFromUrl', () => {
  it('sets a fixed clock from ?now=', () => {
    applyTestClockFromUrl('?now=2026-09-04T10:55:00')
    expect(now()).toBe(new Date('2026-09-04T10:55:00').getTime())
  })

  it('sets an offset clock from ?nowOffset=', () => {
    applyTestClockFromUrl('?nowOffset=60000')
    expect(Math.abs(now() - Date.now() - 60000)).toBeLessThan(1000)
  })

  it('clears the clock with ?now=clear', () => {
    setTestClock('2026-09-04T10:55:00')
    applyTestClockFromUrl('?now=clear')
    expect(getTestClock()).toBeNull()
  })

  it('leaves the clock untouched when no param is present', () => {
    setTestClock('2026-09-04T10:55:00')
    applyTestClockFromUrl('?foo=bar')
    expect(getTestClock().fixedAt).toBe(new Date('2026-09-04T10:55:00').getTime())
  })

  it('ignores an invalid ?now= without throwing', () => {
    expect(() => applyTestClockFromUrl('?now=not-a-date')).not.toThrow()
    expect(getTestClock()).toBeNull()
  })
})

describe('notification prefs', () => {
  it('defaults browser alerts to off and persists changes', () => {
    expect(getNotifPrefs().browser).toBe(false)
    setNotifPrefs({ browser: true })
    expect(getNotifPrefs().browser).toBe(true)
  })
})

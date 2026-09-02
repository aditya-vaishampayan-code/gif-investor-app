import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  clearTestClock,
  computeNotifications,
  deliverBrowserNotifications,
  dismissNotification,
  getBrowserPermission,
  getNotifPrefs,
  getNotifState,
  getTestClock,
  markNotificationsRead,
  now,
  requestBrowserPermission,
  setNotifPrefs,
  subscribeNotifications,
  upcomingMeetings,
} from '../services/notifications'

const POLL_MS = 30000

// Drives the notification bell: recomputes due reminders on an interval,
// tracks the unread badge, and fans out to OS notifications when enabled.
export function useMeetingNotifications(meetings) {
  const [nowMs, setNowMs] = useState(() => now())
  const [prefs, setPrefs] = useState(getNotifPrefs)
  const [permission, setPermission] = useState(getBrowserPermission)
  const [notifState, setStoredState] = useState(getNotifState)
  const [testClock, setTestClockState] = useState(getTestClock)

  // localStorage is the source of truth — re-read it on every poll tick and
  // whenever anything (this tab, devtools, a URL param) mutates it.
  useEffect(() => {
    const sync = () => {
      setNowMs(now())
      setStoredState(getNotifState())
      setTestClockState(getTestClock())
    }
    const id = setInterval(sync, POLL_MS)
    const unsubscribe = subscribeNotifications(sync)
    sync()
    return () => {
      clearInterval(id)
      unsubscribe()
    }
  }, [])

  const notifications = useMemo(
    () => computeNotifications(meetings, nowMs, notifState),
    [meetings, nowMs, notifState]
  )
  const upcoming = useMemo(() => upcomingMeetings(meetings, nowMs), [meetings, nowMs])
  const unreadCount = notifications.filter((n) => n.unread).length

  useEffect(() => {
    deliverBrowserNotifications(notifications)
  }, [notifications, prefs.browser, permission])

  const markAllRead = useCallback(() => markNotificationsRead(), [])
  const dismiss = useCallback((id) => dismissNotification(id), [])
  const clearClock = useCallback(() => clearTestClock(), [])

  const enableBrowser = useCallback(async () => {
    const result = await requestBrowserPermission()
    setPermission(getBrowserPermission())
    setPrefs(setNotifPrefs({ browser: result === 'granted' }))
    return result
  }, [])

  const disableBrowser = useCallback(() => {
    setPrefs(setNotifPrefs({ browser: false }))
  }, [])

  return {
    notifications,
    upcoming,
    unreadCount,
    markAllRead,
    dismiss,
    prefs,
    permission,
    enableBrowser,
    disableBrowser,
    testClock,
    testNow: nowMs,
    clearClock,
  }
}

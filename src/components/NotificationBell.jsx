import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMeetingNotifications } from '../hooks/useMeetingNotifications'

function BellIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function relativeTime(ts, now = Date.now()) {
  const diff = ts - now
  const abs = Math.abs(diff)
  const mins = Math.round(abs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return diff > 0 ? `in ${mins} min` : `${mins} min ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return diff > 0 ? `in ${hrs} h` : `${hrs} h ago`
  const days = Math.round(hrs / 24)
  return diff > 0 ? `in ${days} d` : `${days} d ago`
}

export default function NotificationBell({ meetings }) {
  const [open, setOpen] = useState(false)
  const {
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
    testNow,
    clearClock,
  } = useMeetingNotifications(meetings)

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next) markAllRead()
  }

  const browserBlocked = permission === 'denied'
  const browserUnsupported = permission === 'unsupported'
  const browserOn = prefs.browser && permission === 'granted'

  return (
    <div className="relative">
      <button
        onClick={toggle}
        aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
        className="w-9 h-9 rounded-full border-2 border-white/70 bg-white/15 text-white flex items-center justify-center relative shrink-0 cursor-pointer"
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-[3px] rounded-full bg-orange text-white text-[9px] font-bold flex items-center justify-center border border-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 mt-2 w-[300px] max-h-[72vh] overflow-y-auto z-50 rounded-2xl bg-white shadow-xl border border-ink/10"
            >
              <div className="px-4 pt-3.5 pb-3 border-b border-ink/8">
                <p className="font-display text-[14px] font-bold text-ink">Notifications</p>

                {testClock && (
                  <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1.5">
                    <span className="text-[10px] font-semibold text-amber-800 leading-snug">
                      ⏱ Test clock ·{' '}
                      {new Date(testNow).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                    <button
                      onClick={clearClock}
                      className="shrink-0 text-[10px] font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full border-none cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* Browser notification opt-in */}
                <div className="mt-2.5 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-ink">Browser alerts</p>
                    <p className="text-[10px] text-ink/50 leading-snug">
                      {browserUnsupported
                        ? 'Not supported on this device'
                        : browserBlocked
                          ? 'Blocked — enable in browser settings'
                          : browserOn
                            ? 'On — alerts fire even if this tab is in the background'
                            : 'Get notified when a meeting is about to start'}
                    </p>
                  </div>
                  {!browserUnsupported && !browserBlocked && (
                    <button
                      onClick={browserOn ? disableBrowser : enableBrowser}
                      className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border-none cursor-pointer ${
                        browserOn ? 'bg-emerald-50 text-emerald-700' : 'bg-orange/15 text-orange'
                      }`}
                    >
                      {browserOn ? 'On' : 'Enable'}
                    </button>
                  )}
                </div>
              </div>

              {/* Active reminders */}
              {notifications.length > 0 && (
                <div className="py-1">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-4 py-2.5 flex gap-2.5 items-start hover:bg-slate-50">
                      <span
                        className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                          n.offsetMinutes === 0 ? 'bg-orange' : 'bg-steel'
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-semibold text-ink leading-snug">{n.title}</p>
                        <p className="text-[10.5px] text-ink/55 leading-snug mt-0.5">{n.body}</p>
                        <p className="text-[10px] text-ink/40 mt-0.5">{relativeTime(n.fireAt)}</p>
                      </div>
                      <button
                        onClick={() => dismiss(n.id)}
                        aria-label="Dismiss"
                        className="shrink-0 text-ink/30 hover:text-ink/60 text-sm leading-none px-1 bg-transparent border-none cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upcoming meetings */}
              {upcoming.length > 0 && (
                <div className="border-t border-ink/8 py-1">
                  <p className="px-4 pt-2 pb-1 text-[9.5px] font-bold text-ink/35 uppercase tracking-wider">
                    Upcoming
                  </p>
                  {upcoming.map((m) => (
                    <div key={m.id} className="px-4 py-2 flex justify-between items-center gap-2">
                      <div className="min-w-0">
                        <p className="text-[11.5px] font-semibold text-ink truncate">{m.partnerName}</p>
                        <p className="text-[10px] text-ink/50 truncate">{m.dayLabel} · {m.time}</p>
                      </div>
                      <span className="shrink-0 text-[10px] font-semibold text-ink/45">
                        {relativeTime(new Date(m.startsAt).getTime())}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {notifications.length === 0 && upcoming.length === 0 && (
                <div className="px-4 py-8 text-center">
                  <p className="text-[12px] text-ink/50">You're all caught up</p>
                  <p className="text-[10.5px] text-ink/35 mt-1">
                    Reminders appear here before each meeting.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'
import ProfileSheet from '../components/ProfileSheet'
import SessionCard from '../components/SessionCard'
import { getUser } from '../services/dataService'
import { getStandaloneSessions, getCurrentSession } from '../data/agenda'

// Session id whose "Happening Now" card gets the gala thumbnail + startup
// count instead of its plain title/location.
const GALA_SESSION_ID = 'pitch-night-gala-day1'

// How often we re-check the clock to catch a session becoming current, or the
// next one coming up.
const NEXT_UP_POLL_MS = 30 * 1000

export default function Grid() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [, setTick] = useState(0)
  const [now, setNow] = useState(() => Date.now())
  const [expandedIds, setExpandedIds] = useState(() => new Set())
  const [thumbFailed, setThumbFailed] = useState(false)
  const nav = useNavigate()
  const user = getUser()
  const initial = user?.name ? user.name[0].toUpperCase() : '?'

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), NEXT_UP_POLL_MS)
    return () => clearInterval(id)
  }, [])

  const currentSession = getCurrentSession(now)
  const isGala = currentSession?.id === GALA_SESSION_ID

  // Sessions later today that haven't started yet — soonest first. Tomorrow's
  // agenda belongs on the Agenda tab, not "Next Up".
  const endOfToday = new Date(now)
  endOfToday.setHours(24, 0, 0, 0)
  const nextUpEvents = getStandaloneSessions()
    .filter((session) => session.start.getTime() > now && session.start.getTime() < endOfToday.getTime())
    .sort((a, b) => a.start - b.start)

  const toggleExpanded = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <Frame className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, #EF4E3D 0%, #6591B0 55%, #4B546B 100%)',
        }}
      />

      <div className="flex-1 flex flex-col pb-[88px]">
        {/* Top bar */}
        <div className="px-5 pt-5 flex justify-between items-start">
          <img src="/logo-lockup-white.png" alt="Global Impact Forum" className="w-[187px] h-[57px]" />
          <button
            onClick={() => setProfileOpen(true)}
            aria-label="Profile"
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/70 shrink-0 bg-orange text-white font-display text-sm font-bold flex items-center justify-center"
          >
            {initial}
          </button>
        </div>
        <div className="px-5 pt-2">
          <span className="text-[11px] font-semibold text-white/80 uppercase" style={{ letterSpacing: '0.14em' }}>
            Global Impact Forum – Edition II
          </span>
        </div>

        {/* HAPPENING NOW */}
        {currentSession && (
          <div className="px-5 pt-6 pb-3">
            <div className="flex items-center justify-between mb-3.5">
              <span className="font-display text-[13px] font-bold text-white uppercase" style={{ letterSpacing: '0.08em' }}>
                Happening Now
              </span>
              <div className="flex items-center gap-[5px]">
                <div className="w-[6px] h-[6px] bg-orange rounded-full" />
                <span className="text-[11px] font-semibold text-white" style={{ letterSpacing: '0.08em' }}>LIVE</span>
              </div>
            </div>
            <button
              onClick={() => nav(isGala ? '/gala' : '/agenda')}
              className="w-full text-left rounded-2xl overflow-hidden border-none p-0 block bg-white active:scale-[0.98] transition-transform shadow-lg"
            >
              <div className="relative overflow-hidden" style={{ height: 160, background: 'linear-gradient(135deg,#EF4E3D 0%,#6591B0 60%,#4B546B 100%)' }}>
                {isGala && !thumbFailed && (
                  <img
                    src="/pitch-night-thumb.jpg"
                    alt={currentSession.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    onError={() => setThumbFailed(true)}
                  />
                )}
                <div className="absolute inset-0 opacity-25 pointer-events-none z-10" style={{ background: 'var(--stripe-gradient)' }} />
                <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 70%)' }} />
              </div>
              <div className="p-4">
                <div className="font-display text-[22px] font-bold text-orange mb-0.5" style={{ letterSpacing: '-0.02em' }}>
                  {currentSession.title}
                </div>
                <div className="text-[13px] text-ink/55 font-semibold">
                  {isGala ? '6 Startups' : currentSession.location}
                </div>
              </div>
            </button>
          </div>
        )}

        {/* NEXT UP */}
        <div className="px-5 pt-1 pb-6">
          <div className="font-display text-[13px] font-bold text-white/90 uppercase mb-3.5" style={{ letterSpacing: '0.08em' }}>
            Next Up
          </div>
          <div className="flex flex-col gap-3">
            {nextUpEvents.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                collapsible
                expanded={expandedIds.has(session.id)}
                onToggle={() => toggleExpanded(session.id)}
              />
            ))}
            {nextUpEvents.length === 0 && (
              <div className="text-[12px] text-white/60 px-1">Nothing queued up yet — check back soon.</div>
            )}
          </div>
        </div>
      </div>

      <BottomNav active="today" />

      {profileOpen && (
        <ProfileSheet user={user} onClose={() => setProfileOpen(false)} onSaved={() => setTick((t) => t + 1)} />
      )}
    </Frame>
  )
}

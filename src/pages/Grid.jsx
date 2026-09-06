import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'
import ProfileSheet from '../components/ProfileSheet'
import SessionCard, { TrackList } from '../components/SessionCard'
import SessionThumb from '../components/SessionThumb'
import { getUser } from '../services/dataService'
import { getStandaloneSessions, getCurrentSession } from '../data/agenda'

// Session id whose "Happening Now" card shows a startup count instead of a
// location. (The hero image is data-driven — see `thumb` in agenda.js — and the
// route through to the Innovators tab comes from that session's `link`.)
const GALA_SESSION_ID = 'pitch-night-gala-day1'

// How often we re-check the clock to catch a session becoming current, or the
// next one coming up.
const NEXT_UP_POLL_MS = 30 * 1000

export default function Grid() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [, setTick] = useState(0)
  const [now, setNow] = useState(() => Date.now())
  const [expandedIds, setExpandedIds] = useState(() => new Set())
  const [heroOpen, setHeroOpen] = useState(false)
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
            {/* Expands in place rather than jumping to the Agenda tab. No
                `overflow-hidden`: the thumb carries its own top radii, so a
                coloured child never gets clipped against the white card. */}
            <div className="w-full rounded-2xl bg-white shadow-lg">
              <button
                onClick={() => setHeroOpen((v) => !v)}
                aria-expanded={heroOpen}
                className="w-full text-left border-none p-0 block bg-transparent cursor-pointer"
              >
                <SessionThumb session={currentSession} style={{ borderRadius: '16px 16px 0 0' }} />
                <div className="p-4 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-display text-[22px] font-bold text-orange mb-0.5" style={{ letterSpacing: '-0.02em' }}>
                      {currentSession.title}
                    </div>
                    <div className="text-[13px] text-ink/55 font-semibold">
                      {isGala ? '6 Startups' : currentSession.location}
                    </div>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-ink/40 shrink-0 mt-2 transition-transform"
                    style={{ transform: heroOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </button>

              {heroOpen && (
                <div className="px-4 pb-4">
                  {currentSession.description && (
                    <p className="text-[12px] text-ink/40">{currentSession.description}</p>
                  )}
                  {currentSession.tracks && <TrackList tracks={currentSession.tracks} />}
                  {currentSession.link && (
                    <button
                      type="button"
                      onClick={() => nav(currentSession.link.to)}
                      className="w-full mt-3 py-2.5 rounded-xl bg-orange text-white font-display text-[12px] font-bold border-none cursor-pointer active:scale-[0.98] transition-transform"
                      style={{ letterSpacing: '0.04em' }}
                    >
                      {currentSession.link.label} →
                    </button>
                  )}
                </div>
              )}
            </div>
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

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'
import ProfileSheet from '../components/ProfileSheet'
import VenueMapModal from '../components/VenueMapModal'
import NotificationBell from '../components/NotificationBell'
import Logo from '../components/Logo'
import { getUser, getRatings } from '../services/dataService'
import { getMeetingsForUser } from '../data/meetings'
import { STARTUPS, MONEY_BY_SCORE, formatMoney } from '../data/startups'

export default function Meetings() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [, setTick] = useState(0)
  const [mapLocation, setMapLocation] = useState(null)
  const nav = useNavigate()

  const user = getUser()
  const initial = user?.name ? user.name[0].toUpperCase() : '?'
  const meetings = getMeetingsForUser(user)

  const ratings = getRatings()
  const ratedCount = Object.keys(ratings).length
  const portfolio = Object.entries(ratings)
    .map(([id, r]) => ({ id, score: r.score, startup: STARTUPS.find((s) => s.id === id) }))
    .filter((r) => r.startup)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
  const totalMoney = Object.values(ratings).reduce((sum, r) => sum + (MONEY_BY_SCORE[r.score] || 0), 0)

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
          <div className="flex items-center gap-2">
            <NotificationBell meetings={meetings} />
            <button
              onClick={() => setProfileOpen(true)}
              aria-label="Profile"
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/70 shrink-0 bg-orange text-white font-display text-sm font-bold flex items-center justify-center cursor-pointer"
            >
              {initial}
            </button>
          </div>
        </div>

        {/* Heading */}
        <div className="px-6 pt-5 pb-6 text-center">
          <p className="text-[11px] font-semibold text-white/80 uppercase mb-2" style={{ letterSpacing: '0.14em' }}>
            Global Impact Forum – VIP Deal Making
          </p>
          <h1 className="font-display text-[22px] font-medium text-white mb-2" style={{ lineHeight: 1.15 }}>
            Your Scheduled Meetings
          </h1>
          <p className="text-[12px] text-white/85" style={{ lineHeight: 1.5 }}>
            View your scheduled 1-on-1 investor meetings and deal-making sessions.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex-1 px-5 pb-6">
          <div className="rounded-[20px] p-5" style={{ background: '#EAF9FF' }}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-ink/10">
              <span className="text-[11px] font-bold text-ink/60 uppercase tracking-wider">
                Confirmed Schedule ({meetings.length})
              </span>
              <span className="text-[11px] font-semibold text-orange bg-orange/15 px-2.5 py-0.5 rounded-full">
                {user?.name || 'Attendee'}
              </span>
            </div>

            {meetings.length > 0 ? (
              <div className="flex flex-col gap-4">
                {meetings.map((m) => (
                  <div key={m.id} className="bg-white rounded-2xl p-4 shadow-sm border border-ink/5">
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-orange uppercase tracking-wide">
                        {m.dayLabel} · {m.time}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {m.status}
                      </span>
                    </div>

                    <h3 className="font-display text-[16px] font-bold text-ink mb-1">{m.title}</h3>

                    <div className="bg-slate-50 p-2.5 rounded-xl my-2.5 border border-ink/5">
                      <div className="text-[10px] font-bold text-ink/40 uppercase mb-0.5">Meeting Partner</div>
                      <div className="text-[13px] font-bold text-ink">{m.partnerName}</div>
                      <div className="text-[11px] text-ink/60">{m.partnerRole}</div>
                    </div>

                    <div className="flex items-center justify-between text-[12px] pt-1">
                      <div className="flex items-center gap-1.5 text-ink/60 truncate">
                        <span>📍 {m.location}</span>
                      </div>
                      <button
                        onClick={() => setMapLocation(m.location)}
                        className="text-[10px] font-bold text-orange bg-orange/10 hover:bg-orange/20 px-2.5 py-1 rounded-full border-none cursor-pointer shrink-0"
                      >
                        View Map
                      </button>
                    </div>

                    {m.notes && (
                      <div className="mt-3 pt-2.5 border-t border-ink/8 text-[11px] text-ink/50 italic">
                        "{m.notes}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Blank state as instructed */
              <div className="py-10 px-4 text-center">
                <div className="w-12 h-12 rounded-full bg-orange/10 text-orange mx-auto flex items-center justify-center text-xl mb-3">
                  📅
                </div>
                <h3 className="font-display text-[16px] font-bold text-ink mb-1">No Meetings Scheduled</h3>
                <p className="text-[12px] text-ink/60 max-w-[240px] mx-auto leading-relaxed">
                  There are currently no 1-on-1 meetings scheduled for <strong className="text-ink">{user?.name || 'your account'}</strong>.
                </p>
                <p className="text-[11px] text-ink/40 mt-4">
                  Visit the VIP Deal Making desk in the Gateway Room for assistance.
                </p>
              </div>
            )}
          </div>

          {/* Rate the startups you meet */}
          <div className="rounded-[20px] p-5 mt-5" style={{ background: '#EAF9FF' }}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-ink/10">
              <span className="text-[11px] font-bold text-ink/60 uppercase tracking-wider">
                Rate the Startups ({STARTUPS.length})
              </span>
              <span className="text-[11px] font-semibold text-orange bg-orange/15 px-2.5 py-0.5 rounded-full">
                {ratedCount}/{STARTUPS.length} rated
              </span>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-xl py-3 text-center shadow-sm border border-ink/5">
                <div className="text-[10px] font-semibold text-ink/40 uppercase mb-1" style={{ letterSpacing: '0.1em' }}>Investors</div>
                <div className="font-display text-[18px] font-bold text-ink" style={{ letterSpacing: '-0.02em' }}>1</div>
              </div>
              <div className="bg-white rounded-xl py-3 text-center shadow-sm border border-ink/5">
                <div className="text-[10px] font-semibold text-ink/40 uppercase mb-1" style={{ letterSpacing: '0.1em' }}>Your Picks</div>
                <div className="font-display text-[18px] font-bold text-ink" style={{ letterSpacing: '-0.02em' }}>{ratedCount}/{STARTUPS.length}</div>
              </div>
            </div>

            {/* Portfolio summary */}
            {portfolio.length > 0 && (
              <div className="p-4 mb-4 border border-orange/18 rounded-xl" style={{ background: 'rgba(239,78,61,0.06)' }}>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[11px] font-semibold text-orange uppercase" style={{ letterSpacing: '0.08em' }}>Your Portfolio</span>
                  <span className="font-display text-[13px] font-bold text-orange">{formatMoney(totalMoney)}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {portfolio.map(({ id, score, startup }) => (
                    <button key={id} onClick={() => nav(`/startup/${id}`)}
                            className="flex items-center gap-2.5 w-full text-left bg-transparent border-none cursor-pointer p-0">
                      <div className="w-7 h-7 rounded-[6px] flex items-center justify-center shrink-0 overflow-hidden" style={{ background: startup.monoBg }}>
                        {startup.logo ? (
                          <img src={startup.logo} alt={startup.name} className="w-full h-full object-contain p-0.5 bg-white" />
                        ) : (
                          <span style={{ color: startup.monoFg }}><Logo id={startup.id} size={16} /></span>
                        )}
                      </div>
                      <span className="flex-1 text-[13px] font-semibold text-ink">{startup.name}</span>
                      <span className="font-display text-[13px] font-bold text-orange">{score}/10</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Startup grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {STARTUPS.map((s) => {
                const r = ratings[s.id]
                return (
                  <button key={s.id} onClick={() => nav(`/startup/${s.id}`)}
                          className="text-left bg-white border border-ink/9 rounded-[10px] overflow-hidden relative active:scale-[0.98] transition-transform p-0 cursor-pointer shadow-sm">
                    <div className="h-16 flex items-center justify-center relative overflow-hidden" style={{ background: s.monoBg }}>
                      <div className="absolute inset-0 opacity-10" style={{ background: 'var(--stripe-gradient)' }} />
                      {s.logo ? (
                        <img src={s.logo} alt={s.name} className="absolute inset-0 w-full h-full object-contain p-2.5 bg-white" />
                      ) : (
                        <span className="relative" style={{ color: s.monoFg }}><Logo id={s.id} size={28} /></span>
                      )}
                    </div>
                    <div className="px-2.5 pt-2 pb-3">
                      <p className="text-[12px] font-semibold text-ink mb-0.5" style={{ lineHeight: 1.2 }}>{s.name}</p>
                      <p className="text-[10px] text-orange font-medium">{s.sector}</p>
                    </div>
                    {r && (
                      <span className="absolute top-1.5 right-1.5 bg-ink/80 text-white text-[9px] font-semibold px-1.5 py-[2px]"
                            style={{ borderRadius: 10, letterSpacing: '0.06em' }}>
                        🔒 {r.score}/10
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="meetings" />

      {profileOpen && (
        <ProfileSheet user={user} onClose={() => setProfileOpen(false)} onSaved={() => setTick((t) => t + 1)} />
      )}

      {mapLocation && (
        <VenueMapModal
          isOpen={true}
          onClose={() => setMapLocation(null)}
          location={mapLocation}
        />
      )}
    </Frame>
  )
}

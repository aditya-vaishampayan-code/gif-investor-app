import { useState } from 'react'
import { Link } from 'react-router-dom'
import Frame from '../components/Frame'
import Logo from '../components/Logo'
import ProfileSheet from '../components/ProfileSheet'
import { STARTUPS } from '../data/startups'
import { getRatings, getUser } from '../services/dataService'

export default function Grid() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [, setTick] = useState(0)
  const ratings = getRatings()
  const rated = Object.keys(ratings).length
  const user = getUser()
  const initial = user?.name ? user.name[0].toUpperCase() : '?'

  return (
    <Frame>
      <div className="sticky top-0 z-10 border-b border-ink/8"
           style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(8px)' }}>
        <div className="px-4 pt-3.5 pb-3">
          <div className="flex justify-between items-center mb-3">
            <span className="font-display text-sm font-bold text-ink" style={{ letterSpacing: '-0.01em' }}>GIF II</span>
            <div className="flex items-center gap-2">
              <Link to="/agenda"
                    className="text-orange text-[11px] font-semibold px-[11px] py-1.5"
                    style={{ background: 'rgba(240,100,40,0.08)', border: '1px solid rgba(240,100,40,0.25)', letterSpacing: '0.05em' }}>
                AGENDA ↗
              </Link>
              <button onClick={() => setProfileOpen(true)} aria-label="Profile"
                      className="w-8 h-8 bg-orange text-white font-display text-xs font-bold flex items-center justify-center shrink-0">
                {initial}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex-1 h-0.5 bg-ink/10">
              <div className="h-full bg-orange transition-all duration-500" style={{ width: `${rated * 10}%` }} />
            </div>
            <span className="text-[11px] text-ink/45 whitespace-nowrap" style={{ letterSpacing: '0.04em' }}>
              {rated} of 10 rated
            </span>
          </div>
          <Link to="/portfolio"
                className="inline-block border border-ink/20 text-ink/60 text-[11px] font-semibold px-3 py-1.5"
                style={{ letterSpacing: '0.06em' }}>
            MY PORTFOLIO →
          </Link>
        </div>
      </div>
      <div className="px-3.5 pt-[18px] pb-12 grid grid-cols-2 gap-2.5">
        {STARTUPS.map((s) => {
          const r = ratings[s.id]
          return (
            <Link key={s.id} to={`/startup/${s.id}`}
                  className="border border-ink/9 relative overflow-hidden active:scale-[0.98] transition-transform"
                  style={{ background: 'rgba(255,255,255,0.75)' }}>
              <div className="h-[76px] flex items-center justify-center relative overflow-hidden" style={{ background: s.monoBg }}>
                <div className="absolute inset-0 opacity-10" style={{ background: 'var(--stripe-gradient)' }} />
                <span className="relative" style={{ color: s.monoFg }}>
                  <Logo id={s.id} size={30} />
                </span>
              </div>
              <div className="px-3 pt-2.5 pb-3.5">
                <p className="text-[13px] font-semibold text-ink mb-[3px]" style={{ lineHeight: 1.25 }}>{s.name}</p>
                <p className="text-[11px] text-orange font-medium" style={{ letterSpacing: '0.03em' }}>{s.sector}</p>
              </div>
              {r && (
                <span className="absolute top-[7px] right-[7px] bg-ink/80 text-white text-[10px] font-semibold px-[7px] py-[3px]"
                      style={{ letterSpacing: '0.06em' }}>
                  {r.score}/10
                </span>
              )}
            </Link>
          )
        })}
      </div>
      <div className="px-3.5 pb-8 text-center">
        <Link to="/admin" className="text-[11px] text-ink/25 p-2" style={{ letterSpacing: '0.08em' }}>
          ORGANIZER VIEW →
        </Link>
      </div>
      {profileOpen && (
        <ProfileSheet user={user} onClose={() => setProfileOpen(false)} onSaved={() => setTick((t) => t + 1)} />
      )}
    </Frame>
  )
}

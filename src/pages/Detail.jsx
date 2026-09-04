import { Link, useNavigate, useParams, Navigate } from 'react-router-dom'
import Frame from '../components/Frame'
import { STARTUPS, INNOVATOR_STARTUPS, MONEY_BY_SCORE, formatMoney, initials } from '../data/startups'
import { getRating } from '../services/dataService'

const label = 'text-[10px] font-semibold text-muted uppercase mb-3.5'

export default function Detail() {
  const { id } = useParams()
  const nav = useNavigate()
  const innovator = INNOVATOR_STARTUPS.find((x) => x.id === id)
  const s = innovator ?? STARTUPS.find((x) => x.id === id)
  if (!s) return <Navigate to="/" replace />
  const rateable = Boolean(innovator)
  const r = rateable ? getRating(id) : null

  return (
    <Frame>
      {/* Hero banner */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 220, background: s.monoBg }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: 'var(--stripe-gradient)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top,rgba(27,23,20,0.7) 0%,transparent 55%)' }} />
        <button onClick={() => nav(-1)} className="absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1.5 border border-white/25 cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)', borderRadius: 20, lineHeight: 1 }}>
          ← Back
        </button>
        {s.logo && (
          <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center overflow-hidden p-1.5">
            <img src={s.logo} alt={`${s.name} logo`} className="w-full h-full object-contain" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <div className="flex gap-1.5 mb-2">
            <span className="text-[10px] font-semibold text-white uppercase px-2 py-[3px]"
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 12, letterSpacing: '0.06em' }}>
              {s.sector}
            </span>
            {s.metrics.stage && s.metrics.stage !== 'TBD' && (
              <span className="text-[10px] font-semibold text-white uppercase px-2 py-[3px]"
                    style={{ background: 'rgba(239,78,61,0.8)', borderRadius: 12, letterSpacing: '0.06em' }}>
                {s.metrics.stage}
              </span>
            )}
          </div>
          <h1 className="font-display text-[28px] font-bold text-white mb-1" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{s.name}</h1>
          <p className="text-[12px] text-white/65 italic">{s.tagline}</p>
        </div>
      </div>

      {/* Meta row */}
      <div className="px-5 py-3.5 flex gap-5 border-b border-ink/7" style={{ background: 'rgba(255,255,255,0.85)' }}>
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-orange shrink-0" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 9h18M8 3v4M16 3v4" />
          </svg>
          <span className="text-[12px] text-ink/60">Tonight, Forum II</span>
        </div>
        {s.website && (
          <a href={s.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 ml-auto text-orange">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9z" />
            </svg>
            <span className="text-[12px] font-semibold">Visit Website ↗</span>
          </a>
        )}
      </div>

      <div className="px-5 pt-5 pb-12 overflow-y-auto">
        <p className="text-[14px] text-ink-2 mb-6" style={{ lineHeight: 1.7 }}>{s.description}</p>

        {s.founders?.length > 0 && (
        <div className="mb-6">
          <p className={label} style={{ letterSpacing: '0.14em' }}>The Lineup</p>
          <div className="flex flex-col gap-2.5">
            {s.founders.map((f) => {
              const Tag = f.linkedin ? 'a' : 'div'
              return (
                <Tag key={f.name} {...(f.linkedin ? { href: f.linkedin, target: '_blank', rel: 'noopener noreferrer' } : {})}
                     className="flex items-center gap-3 px-3 py-2.5 border border-ink/7"
                     style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 8 }}>
                  <div className="w-9 h-9 bg-orange flex items-center justify-center shrink-0 rounded-full">
                    <span className="font-display text-[11px] font-bold text-white">{initials(f.name)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-ink" style={{ lineHeight: 1.3 }}>{f.name}</p>
                    <p className="text-[11px] text-orange font-medium uppercase" style={{ letterSpacing: '0.04em' }}>{f.role}</p>
                  </div>
                  {f.linkedin && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" style={{ color: '#0A66C2' }} aria-hidden="true">
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.5h4.56V23H.22V8.5zM8.5 8.5h4.37v1.98h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.99V23h-4.55v-6.98c0-1.67-.03-3.81-2.32-3.81-2.33 0-2.69 1.82-2.69 3.7V23H8.5V8.5z" />
                    </svg>
                  )}
                </Tag>
              )
            })}
          </div>
        </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <p className={label} style={{ letterSpacing: '0.14em', marginBottom: 0 }}>The Numbers</p>
            <span className="text-[11px] font-semibold text-orange" style={{ letterSpacing: '0.04em' }}>Details ↗</span>
          </div>
          <div className="px-3.5 py-3.5 border border-ink/7" style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 8 }}>
            <p className="text-[13px] text-ink-2" style={{ lineHeight: 1.65 }}>{s.metrics.traction}</p>
          </div>
        </div>

        {rateable && (r ? (
          <div className="border-2 border-orange p-5 text-center" style={{ borderRadius: 10, background: 'rgba(239,78,61,0.04)' }}>
            <p className="text-[10px] font-semibold text-orange uppercase mb-2" style={{ letterSpacing: '0.14em' }}>Interest Locked</p>
            <p className="font-display text-[44px] font-bold text-ink leading-none mb-1" style={{ letterSpacing: '-0.03em' }}>{r.score}/10</p>
            <p className="text-[15px] text-orange font-semibold mb-1.5">{formatMoney(MONEY_BY_SCORE[r.score])}</p>
            <p className="text-[11px] text-muted">Ratings are final.</p>
          </div>
        ) : (
          <Link to={`/rate/${s.id}`}
                className="block w-full text-center bg-orange text-white py-4 font-display font-bold text-[15px]"
                style={{ borderRadius: 10, letterSpacing: '0.02em' }}>
            Rate this startup →
          </Link>
        ))}
      </div>
    </Frame>
  )
}

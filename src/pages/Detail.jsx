import { Link, useParams, Navigate } from 'react-router-dom'
import Frame from '../components/Frame'
import { STARTUPS, MONEY_BY_SCORE, formatMoney, initials } from '../data/startups'
import { getRating } from '../services/dataService'

const label = 'text-[10px] font-semibold text-muted uppercase mb-3.5'

export default function Detail() {
  const { id } = useParams()
  const s = STARTUPS.find((x) => x.id === id)
  if (!s) return <Navigate to="/" replace />
  const r = getRating(id)

  return (
    <Frame>
      {/* Hero banner */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 220, background: s.monoBg }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: 'var(--stripe-gradient)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top,rgba(27,23,20,0.7) 0%,transparent 55%)' }} />
        <Link to="/gala" className="absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1.5 border border-white/25"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)', borderRadius: 20, lineHeight: 1 }}>
          ← Back
        </Link>
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <div className="flex gap-1.5 mb-2">
            <span className="text-[10px] font-semibold text-white uppercase px-2 py-[3px]"
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 12, letterSpacing: '0.06em' }}>
              {s.sector}
            </span>
            <span className="text-[10px] font-semibold text-white uppercase px-2 py-[3px]"
                  style={{ background: 'rgba(240,100,40,0.8)', borderRadius: 12, letterSpacing: '0.06em' }}>
              {s.metrics.stage}
            </span>
          </div>
          <h1 className="font-display text-[28px] font-extrabold text-white mb-1" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{s.name}</h1>
          <p className="text-[12px] text-white/65 italic">{s.tagline}</p>
        </div>
      </div>

      {/* Meta row */}
      <div className="px-5 py-3.5 flex gap-5 border-b border-ink/7" style={{ background: 'rgba(255,255,255,0.85)' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 bg-orange rounded-[2px] shrink-0" />
          <span className="text-[12px] text-ink/60">Tonight, Forum II</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 border border-ink/30 rounded-full shrink-0" />
          <span className="text-[12px] text-ink/60">{s.metrics.ask} ask</span>
        </div>
      </div>

      <div className="px-5 pt-5 pb-12 overflow-y-auto">
        <p className="text-[14px] text-ink-2 mb-6" style={{ lineHeight: 1.7 }}>{s.description}</p>

        <div className="mb-6">
          <p className={label} style={{ letterSpacing: '0.14em' }}>The Lineup</p>
          <div className="flex flex-col gap-2.5">
            {s.founders.map((f) => (
              <div key={f.name} className="flex items-center gap-3 px-3 py-2.5 border border-ink/7"
                   style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 8 }}>
                <div className="w-9 h-9 bg-orange flex items-center justify-center shrink-0 rounded-full">
                  <span className="font-display text-[11px] font-bold text-white">{initials(f.name)}</span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink" style={{ lineHeight: 1.3 }}>{f.name}</p>
                  <p className="text-[11px] text-orange font-medium uppercase" style={{ letterSpacing: '0.04em' }}>{f.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <p className={label} style={{ letterSpacing: '0.14em', marginBottom: 0 }}>The Numbers</p>
            <span className="text-[11px] font-semibold text-orange" style={{ letterSpacing: '0.04em' }}>Details ↗</span>
          </div>
          <div className="px-3.5 py-3.5 border border-ink/7" style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 8 }}>
            <p className="text-[13px] text-ink-2" style={{ lineHeight: 1.65 }}>{s.metrics.traction}</p>
          </div>
        </div>

        {r ? (
          <div className="border-2 border-orange p-5 text-center" style={{ borderRadius: 10, background: 'rgba(240,100,40,0.04)' }}>
            <p className="text-[10px] font-semibold text-orange uppercase mb-2" style={{ letterSpacing: '0.14em' }}>Interest Locked</p>
            <p className="font-display text-[44px] font-extrabold text-ink leading-none mb-1" style={{ letterSpacing: '-0.03em' }}>{r.score}/10</p>
            <p className="text-[15px] text-orange font-semibold mb-1.5">{formatMoney(MONEY_BY_SCORE[r.score])}</p>
            <p className="text-[11px] text-muted">Ratings are final.</p>
          </div>
        ) : (
          <Link to={`/rate/${s.id}`}
                className="block w-full text-center bg-orange text-white py-4 font-display font-bold text-[15px]"
                style={{ borderRadius: 10, letterSpacing: '0.02em' }}>
            Rate this startup →
          </Link>
        )}
      </div>
    </Frame>
  )
}

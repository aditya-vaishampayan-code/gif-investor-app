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
      <div className="bg-ink px-5 pt-4">
        <Link to="/" className="inline-block text-white/50 text-xs font-semibold pb-4" style={{ letterSpacing: '0.08em' }}>
          ← BACK
        </Link>
      </div>
      <div className="bg-ink px-5 pt-5 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: 'var(--stripe-gradient)' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ background: s.monoBg }}>
              <span className="font-display text-sm font-extrabold" style={{ color: s.monoFg }}>{s.monogram}</span>
            </div>
            <p className="text-[10px] font-semibold text-orange uppercase" style={{ letterSpacing: '0.12em' }}>
              {s.sector} · {s.metrics.stage}
            </p>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-white mb-2" style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {s.name}
          </h1>
          <p className="text-sm text-white/55 italic" style={{ lineHeight: 1.55 }}>{s.tagline}</p>
        </div>
      </div>
      <div className="px-5 pt-6 pb-12">
        <p className="text-[15px] text-ink-2 mb-7" style={{ lineHeight: 1.7 }}>{s.description}</p>

        <div className="mb-7">
          <p className={label} style={{ letterSpacing: '0.14em' }}>Founders</p>
          <div className="flex flex-col gap-3">
            {s.founders.map((f) => (
              <div key={f.name} className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] bg-orange flex items-center justify-center shrink-0">
                  <span className="font-display text-xs font-extrabold text-white">{initials(f.name)}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink" style={{ lineHeight: 1.3 }}>{f.name}</p>
                  <p className="text-xs text-muted">{f.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className={label} style={{ letterSpacing: '0.14em' }}>Traction</p>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-card border border-ink/9 p-4">
              <p className="text-[10px] font-semibold text-muted uppercase mb-1.5" style={{ letterSpacing: '0.1em' }}>Ask</p>
              <p className="font-display text-[22px] font-extrabold text-ink leading-none" style={{ letterSpacing: '-0.02em' }}>{s.metrics.ask}</p>
              <p className="text-xs text-muted mt-[3px]">{s.metrics.stage}</p>
            </div>
            <div className="bg-card border border-ink/9 p-4">
              <p className="text-[10px] font-semibold text-muted uppercase mb-1.5" style={{ letterSpacing: '0.1em' }}>Traction</p>
              <p className="text-xs text-ink-2" style={{ lineHeight: 1.6 }}>{s.metrics.traction}</p>
            </div>
          </div>
        </div>

        {r ? (
          <div className="border-2 border-orange p-6 text-center">
            <p className="text-[10px] font-semibold text-orange uppercase mb-2.5" style={{ letterSpacing: '0.14em' }}>Interest Locked</p>
            <p className="font-display text-5xl font-extrabold text-ink leading-none" style={{ letterSpacing: '-0.03em' }}>{r.score}/10</p>
            <p className="text-base text-orange font-semibold mt-1.5 mb-2">{formatMoney(MONEY_BY_SCORE[r.score])}</p>
            <p className="text-xs text-muted">Ratings are final.</p>
          </div>
        ) : (
          <Link to={`/rate/${s.id}`}
                className="block w-full text-center bg-orange text-white py-[18px] font-display font-extrabold text-base"
                style={{ letterSpacing: '0.04em' }}>
            RATE THIS STARTUP →
          </Link>
        )}
      </div>
    </Frame>
  )
}

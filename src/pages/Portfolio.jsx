import { Link, useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import { MONEY_BY_SCORE, STARTUPS, formatMoney } from '../data/startups'
import { getRatings } from '../services/dataService'

export default function Portfolio() {
  const nav = useNavigate()
  const ratings = getRatings()
  const rated = STARTUPS.filter((s) => ratings[s.id])
    .map((s) => ({ ...s, score: ratings[s.id].score }))
    .sort((a, b) => b.score - a.score)
  const totalK = rated.reduce((sum, s) => sum + MONEY_BY_SCORE[s.score], 0)
  const totalFmt = totalK >= 1000 ? `$${(totalK / 1000).toFixed(1)}M` : `$${totalK.toLocaleString()}K`

  return (
    <Frame>
      <div className="bg-ink px-5 pt-4">
        <Link to="/" className="inline-block text-white/50 text-xs font-semibold pb-4" style={{ letterSpacing: '0.08em' }}>
          ← BACK
        </Link>
      </div>
      <div className="bg-orange px-5 pt-7 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: 'var(--stripe-gradient)' }} />
        <div className="relative">
          <p className="text-[10px] font-semibold text-white/70 uppercase mb-2" style={{ letterSpacing: '0.14em' }}>Total Allocated</p>
          <p className="font-display text-[44px] font-extrabold text-white leading-none mb-1.5" style={{ letterSpacing: '-0.03em' }}>{totalFmt}</p>
          <p className="text-sm text-white/70">Across {rated.length} {rated.length === 1 ? 'startup' : 'startups'}</p>
        </div>
      </div>

      {rated.length === 0 ? (
        <div className="px-5 py-16 text-center">
          <p className="font-display text-[22px] font-extrabold text-ink mb-2.5">No investments yet.</p>
          <p className="text-sm text-muted mb-8" style={{ lineHeight: 1.6 }}>Rate at least one startup to build your portfolio.</p>
          <Link to="/" className="inline-block bg-orange text-white px-7 py-3.5 font-display font-extrabold text-sm" style={{ letterSpacing: '0.04em' }}>
            VIEW STARTUPS →
          </Link>
        </div>
      ) : (
        <div className="px-3.5 pt-5 pb-12 flex flex-col gap-2">
          {rated.map((s, i) => (
            <button key={s.id} onClick={() => nav(`/startup/${s.id}`)}
                    className="flex items-center gap-3 bg-card border border-ink/9 p-3.5 text-left">
              <span className="font-display text-base font-extrabold text-ink/18 w-[26px] shrink-0 text-right">#{i + 1}</span>
              <div className="w-[38px] h-[38px] flex items-center justify-center shrink-0" style={{ background: s.monoBg }}>
                <span className="font-display text-xs font-extrabold" style={{ color: s.monoFg }}>{s.monogram}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink" style={{ lineHeight: 1.3 }}>{s.name}</p>
                <p className="text-xs text-muted">{s.sector}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-lg font-extrabold text-orange leading-none" style={{ letterSpacing: '-0.02em' }}>{s.score}/10</p>
                <p className="text-xs text-muted mt-0.5">{formatMoney(MONEY_BY_SCORE[s.score])}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </Frame>
  )
}

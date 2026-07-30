import Frame from '../components/Frame'
import { STARTUPS } from '../data/startups'
import { getAggregates } from '../services/dataService'

export default function Admin() {
  const rows = [...getAggregates()].sort((a, b) => b.avgScore - a.avgScore)
  const totalRaters = rows.length > 0 ? Math.max(...rows.map((r) => r.raterCount)) : 0

  return (
    <Frame wide>
      <div className="bg-ink px-10 py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: 'var(--stripe-gradient)' }} />
        <div className="relative flex justify-between items-end">
          <div>
            <p className="text-[10px] font-semibold text-white/35 uppercase mb-2.5" style={{ letterSpacing: '0.18em' }}>
              Global Impact Forum II
            </p>
            <h1 className="font-display text-[32px] font-extrabold text-white leading-none" style={{ letterSpacing: '-0.02em' }}>
              Live Leaderboard
            </h1>
            <p className="text-[13px] text-white/40 mt-2">State of the room.</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="font-display text-[28px] font-extrabold text-orange">{totalRaters}</p>
            <p className="text-xs text-white/35" style={{ letterSpacing: '0.06em' }}>RATERS</p>
          </div>
        </div>
      </div>
      <div className="px-10 pt-3 pb-14">
        {rows.map((r, i) => {
          const s = STARTUPS.find((x) => x.id === r.id)
          return (
            <div key={r.id} className="flex items-center gap-[18px] py-4 border-b border-ink/7">
              <span className="font-display text-[13px] font-extrabold text-ink/20 w-[22px] text-right shrink-0">{i + 1}</span>
              <div className="w-11 h-11 flex items-center justify-center shrink-0" style={{ background: s.monoBg }}>
                <span className="font-display text-[13px] font-extrabold" style={{ color: s.monoFg }}>{s.monogram}</span>
              </div>
              <div className="min-w-0" style={{ flex: '0 0 160px' }}>
                <p className="text-[15px] font-semibold text-ink truncate">{r.name}</p>
                <p className="text-xs text-muted">{s.sector}</p>
              </div>
              <div className="flex-1">
                <div className="h-1.5 bg-ink/8">
                  <div className="h-full bg-orange transition-all duration-700" style={{ width: `${(r.avgScore / 10) * 100}%` }} />
                </div>
              </div>
              <div className="text-right shrink-0 min-w-[90px]">
                <p className="font-display text-[22px] font-extrabold text-ink leading-none" style={{ letterSpacing: '-0.02em' }}>
                  {r.avgScore.toFixed(1)}
                </p>
                <p className="text-[11px] text-muted mt-0.5">{r.raterCount} raters</p>
              </div>
            </div>
          )
        })}
      </div>
    </Frame>
  )
}

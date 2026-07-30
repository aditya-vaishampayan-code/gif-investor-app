import Shell from '../components/Shell'
import { MONEY_BY_SCORE, STARTUPS, formatMoney } from '../data/startups'
import { getRatings } from '../services/dataService'

export default function Portfolio() {
  const ratings = getRatings()
  const rated = STARTUPS.filter((s) => ratings[s.id])
    .map((s) => ({ ...s, score: ratings[s.id].score }))
    .sort((a, b) => b.score - a.score)
  const totalK = rated.reduce((sum, s) => sum + MONEY_BY_SCORE[s.score], 0)
  const done = rated.length === STARTUPS.length

  return (
    <Shell title="My Portfolio" back="/">
      <div className="rounded-2xl bg-gradient-to-br from-surface to-ink border border-gold/30 p-5 text-center mb-6">
        <p className="text-fog/60 text-sm">{done ? '🎉 All 10 rated — total interest allocated' : `Interest allocated (${rated.length}/10 rated)`}</p>
        <p className="text-4xl font-extrabold text-gold mt-1">{formatMoney(totalK)}</p>
      </div>
      {rated.length === 0 && <p className="text-center text-fog/50">No investments yet — go rate some startups!</p>}
      <div className="space-y-2">
        {rated.map((s, i) => (
          <div key={s.id} className="flex items-center gap-3 bg-surface rounded-xl p-3">
            <span className="text-fog/40 font-bold w-5">{i + 1}</span>
            <span className="text-2xl">{s.logoEmoji}</span>
            <div className="flex-1">
              <p className="font-semibold text-fog text-sm">{s.name}</p>
              <p className="text-fog/50 text-xs">{s.sector}</p>
            </div>
            <div className="text-right">
              <p className="text-gold font-bold">{s.score}/10</p>
              <p className="text-mint text-xs">{formatMoney(MONEY_BY_SCORE[s.score])}</p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

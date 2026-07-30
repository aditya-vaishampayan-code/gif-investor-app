import Shell from '../components/Shell'
import { STARTUPS } from '../data/startups'
import { getAggregates } from '../services/dataService'

export default function Admin() {
  const rows = [...getAggregates()].sort((a, b) => b.avgScore - a.avgScore)
  const max = 10

  return (
    <Shell title="Organizer Dashboard">
      <p className="text-sand text-sm mb-5">Where the room's conviction is gathering — live average interest per venture.</p>
      <div className="space-y-3 md:max-w-2xl">
        {rows.map((r, i) => {
          const s = STARTUPS.find((x) => x.id === r.id)
          return (
            <div key={r.id} className="bg-surface rounded-xl p-3">
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-semibold text-fog text-sm">
                  <span className="text-fog/40 mr-2">#{i + 1}</span>{s.logoEmoji} {r.name}
                </p>
                <p className="text-gold font-bold">{r.avgScore.toFixed(1)} <span className="text-fog/40 text-xs font-normal">· {r.raterCount} raters</span></p>
              </div>
              <div className="h-2.5 rounded-full bg-ink">
                <div className="h-2.5 rounded-full bg-gradient-to-r from-gold to-bronze"
                     style={{ width: `${(r.avgScore / max) * 100}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </Shell>
  )
}

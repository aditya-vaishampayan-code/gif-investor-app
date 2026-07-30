import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import { STARTUPS } from '../data/startups'
import { getRatings, getUser } from '../services/dataService'

export default function Grid() {
  const ratings = getRatings()
  const rated = Object.keys(ratings).length
  const user = getUser()

  return (
    <Shell title="GIF Investor">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-fog/60 text-sm">Welcome, {user?.name?.split(' ')[0]}</p>
          <p className="text-gold font-bold">{rated}/{STARTUPS.length} startups rated</p>
        </div>
        <Link to="/portfolio" className="rounded-full border border-gold/40 text-gold text-sm px-4 py-2">
          My Portfolio
        </Link>
      </div>
      <div className="h-1.5 rounded-full bg-surface mb-6">
        <div className="h-1.5 rounded-full bg-gradient-to-r from-gold to-mint transition-all"
             style={{ width: `${(rated / STARTUPS.length) * 100}%` }} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {STARTUPS.map((s) => {
          const r = ratings[s.id]
          return (
            <Link key={s.id} to={`/startup/${s.id}`}
                  className={`rounded-2xl bg-surface p-4 border ${r ? 'border-mint/40' : 'border-white/5'} active:scale-95 transition`}>
              <div className={`h-16 rounded-xl bg-gradient-to-br ${s.bannerGradient} flex items-center justify-center text-3xl mb-3`}>
                {s.logoEmoji}
              </div>
              <p className="font-bold text-fog leading-tight">{s.name}</p>
              <p className="text-fog/50 text-xs mt-0.5">{s.sector}</p>
              {r && (
                <span className="inline-block mt-2 text-xs font-bold text-mint bg-mint/10 rounded-full px-2 py-0.5">
                  🔒 Locked · {r.score}/10
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </Shell>
  )
}

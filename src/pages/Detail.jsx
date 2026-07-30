import { Link, useParams, Navigate } from 'react-router-dom'
import Shell from '../components/Shell'
import { STARTUPS } from '../data/startups'
import { getRating } from '../services/dataService'

export default function Detail() {
  const { id } = useParams()
  const s = STARTUPS.find((x) => x.id === id)
  if (!s) return <Navigate to="/" replace />
  const r = getRating(id)

  return (
    <Shell title={s.name} back="/">
      <div className={`rounded-2xl bg-gradient-to-br ${s.bannerGradient} h-36 flex items-center justify-center text-6xl mb-4`}>
        {s.logoEmoji}
      </div>
      <div className="flex gap-2 mb-3">
        <span className="text-xs bg-surface rounded-full px-3 py-1 text-fog/70">{s.sector}</span>
        <span className="text-xs bg-surface rounded-full px-3 py-1 text-gold">{s.metrics.stage}</span>
      </div>
      <p className="text-lg font-bold text-fog mb-2">{s.tagline}</p>
      <p className="text-fog/70 text-sm leading-relaxed mb-6">{s.description}</p>

      <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2">Founders</h2>
      <div className="space-y-2 mb-6">
        {s.founders.map((f) => (
          <div key={f.name} className="flex items-center gap-3 bg-surface rounded-xl p-3">
            <span className="text-3xl">{f.avatarEmoji}</span>
            <div>
              <p className="font-semibold text-fog text-sm">{f.name}</p>
              <p className="text-fog/50 text-xs">{f.role}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2">Traction</h2>
      <div className="grid grid-cols-2 gap-2 mb-8">
        <div className="bg-surface rounded-xl p-3">
          <p className="text-fog/50 text-xs">Ask</p>
          <p className="font-bold text-fog">{s.metrics.ask}</p>
        </div>
        <div className="bg-surface rounded-xl p-3">
          <p className="text-fog/50 text-xs">Traction</p>
          <p className="font-bold text-fog text-sm">{s.metrics.traction}</p>
        </div>
      </div>

      {r ? (
        <div className="rounded-xl border border-mint/40 bg-mint/10 p-4 text-center">
          <p className="text-mint font-bold">🔒 Interest locked: {r.score}/10</p>
          <p className="text-fog/50 text-xs mt-1">Ratings are final.</p>
        </div>
      ) : (
        <Link to={`/rate/${s.id}`}
              className="block w-full text-center rounded-xl bg-gold text-ink font-bold py-4 active:scale-95 transition">
          💰 Invest Interest
        </Link>
      )}
    </Shell>
  )
}

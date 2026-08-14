import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'
import Logo from '../components/Logo'
import { STARTUPS, MONEY_BY_SCORE, formatMoney } from '../data/startups'
import { getRatings } from '../services/dataService'

export default function Gala() {
  const nav = useNavigate()
  const ratings = getRatings()
  const ratedCount = Object.keys(ratings).length

  const portfolio = Object.entries(ratings)
    .map(([id, r]) => ({ id, score: r.score, startup: STARTUPS.find((s) => s.id === id) }))
    .filter((r) => r.startup)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  const totalMoney = Object.values(ratings).reduce((sum, r) => sum + (MONEY_BY_SCORE[r.score] || 0), 0)

  return (
    <Frame>
      <div className="flex-1 flex flex-col pb-[72px]">
        {/* Hero */}
        <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 180, background: 'linear-gradient(135deg,#EF4E3D 0%,#C33017 60%,#8A210C 100%)' }}>
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'var(--stripe-gradient)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top,rgba(27,23,20,0.6) 0%,transparent 50%)' }} />
          <button onClick={() => nav('/')} className="absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1.5 border border-white/25 cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)', borderRadius: 20, lineHeight: 1 }}>
            ← Back
          </button>
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
            <div className="text-[10px] font-semibold text-white/60 uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Live Now</div>
            <div className="font-display text-[26px] font-extrabold text-white" style={{ lineHeight: 1, letterSpacing: '-0.02em' }}>Pitch Night Gala</div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 border-b border-ink/8" style={{ background: 'rgba(255,255,255,0.9)' }}>
          <div className="text-center py-3.5 border-r border-ink/8">
            <div className="text-[10px] font-semibold text-ink/40 uppercase mb-1" style={{ letterSpacing: '0.1em' }}>Investors</div>
            <div className="font-display text-[18px] font-bold text-ink" style={{ letterSpacing: '-0.02em' }}>1</div>
          </div>
          <div className="text-center py-3.5">
            <div className="text-[10px] font-semibold text-ink/40 uppercase mb-1" style={{ letterSpacing: '0.1em' }}>Your Picks</div>
            <div className="font-display text-[18px] font-bold text-ink" style={{ letterSpacing: '-0.02em' }}>{ratedCount}/10</div>
          </div>
        </div>

        {/* Portfolio summary */}
        {portfolio.length > 0 && (
          <div className="mx-3.5 mt-3.5 p-4 border border-orange/18 rounded-xl" style={{ background: 'rgba(240,100,40,0.06)' }}>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[11px] font-semibold text-orange uppercase" style={{ letterSpacing: '0.08em' }}>Your Portfolio</span>
              <span className="font-display text-[13px] font-bold text-orange">{formatMoney(totalMoney)}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {portfolio.map(({ id, score, startup }) => (
                <button key={id} onClick={() => nav(`/startup/${id}`)}
                        className="flex items-center gap-2.5 w-full text-left bg-transparent border-none cursor-pointer p-0">
                  <div className="w-7 h-7 rounded-[6px] flex items-center justify-center shrink-0" style={{ background: startup.monoBg }}>
                    <span className="font-display text-[9px] font-bold" style={{ color: startup.monoFg }}>{startup.monogram}</span>
                  </div>
                  <span className="flex-1 text-[13px] font-semibold text-ink">{startup.name}</span>
                  <span className="font-display text-[13px] font-bold text-orange">{score}/10</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Startup grid */}
        <div className="px-3.5 pt-4 pb-4">
          <div className="text-[10px] font-semibold text-ink/40 uppercase mb-3" style={{ letterSpacing: '0.14em' }}>Tonight's Startups</div>
          <div className="grid grid-cols-2 gap-2.5">
            {STARTUPS.map((s) => {
              const r = ratings[s.id]
              return (
                <button key={s.id} onClick={() => nav(`/startup/${s.id}`)}
                        className="text-left border border-ink/9 rounded-[10px] overflow-hidden relative active:scale-[0.98] transition-transform p-0 cursor-pointer"
                        style={{ background: 'rgba(255,255,255,0.8)' }}>
                  <div className="h-16 flex items-center justify-center relative overflow-hidden" style={{ background: s.monoBg }}>
                    <div className="absolute inset-0 opacity-10" style={{ background: 'var(--stripe-gradient)' }} />
                    <span className="relative" style={{ color: s.monoFg }}><Logo id={s.id} size={28} /></span>
                  </div>
                  <div className="px-2.5 pt-2 pb-3">
                    <p className="text-[12px] font-semibold text-ink mb-0.5" style={{ lineHeight: 1.2 }}>{s.name}</p>
                    <p className="text-[10px] text-orange font-medium">{s.sector}</p>
                  </div>
                  {r && (
                    <span className="absolute top-1.5 right-1.5 bg-ink/80 text-white text-[9px] font-semibold px-1.5 py-[2px]"
                          style={{ borderRadius: 10, letterSpacing: '0.06em' }}>
                      {r.score}/10
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <BottomNav active="tonight" />
    </Frame>
  )
}

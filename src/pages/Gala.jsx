import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'
import Logo from '../components/Logo'
import { INNOVATOR_STARTUPS } from '../data/startups'
import { getRatings } from '../services/dataService'

// Brand-palette plates behind the logos, cycled by grid position so no two
// neighbours match. Every logo still sits on a white card on top of these:
// Flawsome and Nautical Wings ship with an opaque white background baked into
// the file, so a colour applied directly behind them would show as a seam.
const TILE_GRADIENTS = [
  'linear-gradient(135deg,#EF4E3D 0%,#F06E54 100%)', // orange
  'linear-gradient(135deg,#6591B0 0%,#B5DEF6 100%)', // steel → sky
  'linear-gradient(135deg,#4B546B 0%,#6591B0 100%)', // slate → steel
]

export default function Gala() {
  const [thumbFailed, setThumbFailed] = useState(false)
  const nav = useNavigate()

  const ratings = getRatings()
  const ratedCount = INNOVATOR_STARTUPS.filter((s) => ratings[s.id]).length

  return (
    <Frame>
      <div className="flex-1 flex flex-col pb-[88px]">
        {/* Hero */}
        <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 180, background: 'linear-gradient(135deg,#EF4E3D 0%,#6591B0 60%,#4B546B 100%)' }}>
          {!thumbFailed && (
            <img
              src="/pitch-night-thumb.jpg"
              alt="Innovators Gala"
              className="absolute inset-0 w-full h-full object-cover z-0"
              onError={() => setThumbFailed(true)}
            />
          )}
          <div className="absolute inset-0 opacity-20 pointer-events-none z-10" style={{ background: 'var(--stripe-gradient)' }} />
          <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'linear-gradient(to top,rgba(27,23,20,0.7) 0%,transparent 70%)' }} />
          <button onClick={() => nav('/')} className="absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1.5 border border-white/25 cursor-pointer z-20"
                  style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)', borderRadius: 20, lineHeight: 1 }}>
            ← Back
          </button>
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 z-20">
            <div className="text-[10px] font-semibold text-white/60 uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Live Now</div>
            <div className="font-display text-[26px] font-bold text-white" style={{ lineHeight: 1, letterSpacing: '-0.02em' }}>Innovators Gala</div>
          </div>
        </div>

        {/* Count bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-ink/8" style={{ background: 'rgba(255,255,255,0.9)' }}>
          <div>
            <div className="text-[10px] font-semibold text-ink/40 uppercase mb-0.5" style={{ letterSpacing: '0.1em' }}>Showcasing Tonight</div>
            <div className="font-display text-[18px] font-bold text-ink" style={{ letterSpacing: '-0.02em' }}>{INNOVATOR_STARTUPS.length} Startups</div>
          </div>
          <button onClick={() => nav('/portfolio')}
                  className="text-right bg-transparent border-none cursor-pointer p-0">
            <div className="text-[10px] font-semibold text-ink/40 uppercase mb-0.5" style={{ letterSpacing: '0.1em' }}>Your Ratings</div>
            <div className="font-display text-[15px] font-bold text-orange">{ratedCount}/{INNOVATOR_STARTUPS.length} rated →</div>
          </button>
        </div>

        {/* Startup grid */}
        <div className="px-3.5 pt-4 pb-4">
          <div className="text-[10px] font-semibold text-ink/40 uppercase mb-3" style={{ letterSpacing: '0.14em' }}>Tonight's Innovators · tap to rate</div>
          <div className="grid grid-cols-2 gap-2.5">
            {INNOVATOR_STARTUPS.map((s, i) => {
              const r = ratings[s.id]
              // The card's own background IS the tile colour, and it has no border.
              // Both matter: a translucent border paints over the element's own
              // background, so `border-ink/10` above a white card rendered as a near
              // white hairline against the coloured tile. With the colour on the card
              // itself there is no white near the top edge and nothing to clip, so the
              // seam cannot come back. The name panel supplies the white instead.
              return (
                <button key={s.id} onClick={() => nav(`/startup/${s.id}`)}
                        className="text-left rounded-[10px] relative active:scale-[0.98] transition-transform p-0 cursor-pointer shadow-md border-none flex flex-col"
                        style={{ background: TILE_GRADIENTS[i % TILE_GRADIENTS.length] }}>
                  <div className="h-[76px] shrink-0 flex items-center justify-center relative">
                    <div className="absolute inset-0 opacity-[0.18] pointer-events-none"
                         style={{ background: 'var(--stripe-gradient)', borderRadius: '10px 10px 0 0' }} />
                    {s.logo ? (
                      <div className="relative rounded-lg bg-white flex items-center justify-center overflow-hidden"
                           style={{ width: '82%', height: 54, boxShadow: '0 2px 6px rgba(27,23,20,0.22)' }}>
                        <img src={s.logo} alt={s.name} className="w-full h-full object-contain" style={{ padding: s.logoInset ?? 6 }} />
                      </div>
                    ) : (
                      <span className="relative text-white"><Logo id={s.id} size={30} /></span>
                    )}
                  </div>
                  {/* flex-1: grid rows stretch every card to the tallest in the row, and
                      the card's own background is the tile gradient — so the white panel
                      has to absorb that extra height or the colour shows below it. */}
                  <div className="px-2.5 pt-2 pb-3 relative flex-1"
                       style={{ background: '#FFFFFF', borderRadius: '0 0 10px 10px' }}>
                    <p className="text-[12px] font-semibold text-ink mb-0.5" style={{ lineHeight: 1.2 }}>{s.name}</p>
                    <p className="text-[10px] text-orange font-medium">{s.sector}</p>
                  </div>
                  {r && (
                    <span className="absolute top-1.5 right-1.5 bg-ink/80 text-white text-[9px] font-semibold px-1.5 py-[2px]"
                          style={{ borderRadius: 10, letterSpacing: '0.06em' }}>
                      🔒 {r.score}/10
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <BottomNav active="innovators" />
    </Frame>
  )
}

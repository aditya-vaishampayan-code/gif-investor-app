import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'
import Logo from '../components/Logo'
import { INNOVATOR_STARTUPS } from '../data/startups'

export default function Gala() {
  const [thumbFailed, setThumbFailed] = useState(false)
  const nav = useNavigate()

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
        <div className="text-center py-3.5 border-b border-ink/8" style={{ background: 'rgba(255,255,255,0.9)' }}>
          <div className="text-[10px] font-semibold text-ink/40 uppercase mb-1" style={{ letterSpacing: '0.1em' }}>Showcasing Tonight</div>
          <div className="font-display text-[18px] font-bold text-ink" style={{ letterSpacing: '-0.02em' }}>{INNOVATOR_STARTUPS.length} Startups</div>
        </div>

        {/* Startup grid */}
        <div className="px-3.5 pt-4 pb-4">
          <div className="text-[10px] font-semibold text-ink/40 uppercase mb-3" style={{ letterSpacing: '0.14em' }}>Tonight's Innovators</div>
          <div className="grid grid-cols-2 gap-2.5">
            {INNOVATOR_STARTUPS.map((s) => (
              <button key={s.id} onClick={() => nav(`/startup/${s.id}`)}
                      className="text-left border border-ink/9 rounded-[10px] overflow-hidden relative active:scale-[0.98] transition-transform p-0 cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.8)' }}>
                <div className="h-16 flex items-center justify-center relative overflow-hidden" style={{ background: s.monoBg }}>
                  <div className="absolute inset-0 opacity-10" style={{ background: 'var(--stripe-gradient)' }} />
                  {s.logo ? (
                    <img src={s.logo} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <span className="relative" style={{ color: s.monoFg }}><Logo id={s.id} size={28} /></span>
                  )}
                </div>
                <div className="px-2.5 pt-2 pb-3">
                  <p className="text-[12px] font-semibold text-ink mb-0.5" style={{ lineHeight: 1.2 }}>{s.name}</p>
                  <p className="text-[10px] text-orange font-medium">{s.sector}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active="innovators" />
    </Frame>
  )
}

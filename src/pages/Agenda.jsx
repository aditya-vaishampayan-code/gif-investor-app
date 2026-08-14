import { useEffect, useState } from 'react'
import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'
import { AGENDA } from '../data/agenda'
import { STARTUPS } from '../data/startups'

const NODE = {
  startup: { size: 24 },
  keynote: { size: 20, color: '#EF4E3D' },
  break: { size: 14, color: '#B0A89E' },
  event: { size: 14, color: '#1B1714' },
}

export default function Agenda() {
  const [linePct, setLinePct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setLinePct(maxScroll > 0 ? Math.min(100, (scrollY / maxScroll) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Frame>
      <div className="px-5 pt-6 pb-4 border-b border-ink/7">
        <p className="text-[10px] font-semibold text-orange uppercase mb-2" style={{ letterSpacing: '0.16em' }}>
          Global Impact Forum II
        </p>
        <h1 className="font-display text-[28px] font-bold text-ink mb-1" style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          Forum Day Agenda
        </h1>
        <p className="text-[13px] text-ink/45">Full schedule · Startup pitches & events</p>
      </div>
      <div className="px-5 pb-[86px] relative">
        <div className="absolute top-0 bottom-0 w-0.5 bg-ink/10" style={{ left: 44 }} />
        <div className="absolute top-0 w-0.5" style={{
          left: 44,
          height: `${linePct}%`,
          background: 'linear-gradient(to bottom, #EF4E3D, rgba(239,78,61,0.6))',
          transition: 'height 0.15s ease',
        }} />
        {AGENDA.map((item, idx) => {
          const s = item.type === 'startup' ? STARTUPS.find((x) => x.id === item.startupId) : null
          const size = NODE[item.type].size
          const color = s ? s.monoBg : NODE[item.type].color
          return (
            <div key={idx} className="flex gap-4 pt-7 relative">
              <div className="shrink-0 w-12 flex justify-center relative z-[1] mt-0.5">
                <div className="rounded-full border-2 border-white flex items-center justify-center shrink-0"
                     style={{ width: size, height: size, background: color }}>
                  {s && (
                    <span className="font-display font-bold leading-none" style={{ fontSize: 8, color: s.monoFg }}>
                      {s.monogram}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-1 pb-1">
                <p className="text-[11px] font-semibold text-orange mb-1" style={{ letterSpacing: '0.08em' }}>{item.time}</p>
                <p className="font-display text-[15px] font-bold text-ink mb-[3px]" style={{ lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                  {item.title}
                </p>
                <p className="text-xs text-ink/50" style={{ lineHeight: 1.5 }}>{item.subtitle}</p>
                {s && (
                  <span className="inline-block mt-2 px-2 py-[3px]"
                        style={{ background: 'rgba(240,100,40,0.08)', border: '1px solid rgba(240,100,40,0.2)' }}>
                    <span className="text-[10px] font-semibold text-orange" style={{ letterSpacing: '0.06em' }}>
                      {s.sector} · {s.metrics.stage}
                    </span>
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <BottomNav active="agenda" />
    </Frame>
  )
}

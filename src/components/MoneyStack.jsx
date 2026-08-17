import { AnimatePresence, motion } from 'framer-motion'
import { MONEY_BY_SCORE } from '../data/startups'

const serialFor = (i) =>
  'GF' + String(Math.abs((Math.sin(i * 7.3) * 99999999) | 0)).slice(0, 8).toUpperCase()

export default function MoneyStack({ score }) {
  return (
    <div className="relative w-full" style={{ height: Math.max(120, 106 + score * 9) }} aria-hidden>
      <AnimatePresence>
        {Array.from({ length: score }, (_, i) => {
          const rot = (i % 2 === 0 ? 1 : -1) * (1.2 + i * 0.35)
          const denom = MONEY_BY_SCORE[i + 1]
          const denomCorner = denom >= 1000 ? '1000' : String(denom)
          return (
            <motion.div
              key={i}
              initial={{ y: -60, opacity: 0, rotate: rot }}
              animate={{ y: 0, opacity: 1, rotate: rot }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              className="absolute overflow-hidden"
              style={{
                bottom: i * 9,
                left: 'calc(50% - 125px)',
                width: 250,
                height: 106,
                background: 'linear-gradient(145deg, #C8DDB4 0%, #A8C890 40%, #B8D4A0 100%)',
                border: '1px solid rgba(40,70,20,0.35)',
                borderRadius: 3,
                boxShadow: '0 4px 16px rgba(27,23,20,0.2)',
                zIndex: i,
              }}
            >
              {/* paper grain */}
              <div className="absolute inset-0 pointer-events-none"
                   style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)' }} />
              {/* inner border frame */}
              <div className="absolute pointer-events-none" style={{ inset: 5, border: '1px solid rgba(40,70,20,0.3)', borderRadius: 1 }} />
              {/* portrait oval */}
              <div className="absolute flex items-center justify-center"
                   style={{ left: 14, top: '50%', transform: 'translateY(-50%)', width: 46, height: 60, border: '1px solid rgba(40,70,20,0.35)', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'rgba(40,70,20,0.4)', lineHeight: 1 }}>$</span>
              </div>
              {/* corner denominations */}
              <div className="absolute" style={{ left: 9, top: 8, fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700, color: 'rgba(20,50,10,0.55)', letterSpacing: '0.05em' }}>
                {denomCorner}
              </div>
              {/* center denomination */}
              <div className="absolute text-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', lineHeight: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'rgba(20,55,10,0.65)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {denom >= 1000 ? '$1,000K' : `$${denom}K`}
                </div>
              </div>
              {/* top center text */}
              <div className="absolute uppercase whitespace-nowrap"
                   style={{ top: 9, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-body)', fontSize: 6, color: 'rgba(20,50,10,0.45)', letterSpacing: '0.15em' }}>
                Forum Note · Series II
              </div>
              {/* serial row */}
              <div className="absolute flex justify-between items-center" style={{ bottom: 9, left: 68, right: 10 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 7, color: 'rgba(20,50,10,0.4)', letterSpacing: '0.1em' }}>{serialFor(i)}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 7, color: 'rgba(20,50,10,0.4)', letterSpacing: '0.06em' }}>GIF · {i + 1}</span>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

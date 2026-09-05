import { AnimatePresence, motion } from 'framer-motion'

const serialFor = (i) =>
  'GF' + String(Math.abs((Math.sin(i * 7.3) * 99999999) | 0)).slice(0, 8).toUpperCase()

// One note per point, so the stack's height is the score. The notes carry no
// denomination — the rating is expressed in points alone — so the engraving is
// decorative: a portrait oval, a guilloche rosette and the serial row.
export default function MoneyStack({ score }) {
  return (
    <div className="relative w-full" style={{ height: Math.max(120, 106 + score * 9) }} aria-hidden>
      <AnimatePresence>
        {Array.from({ length: score }, (_, i) => {
          const rot = (i % 2 === 0 ? 1 : -1) * (1.2 + i * 0.35)
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
              <div className="absolute"
                   style={{ left: 14, top: '50%', transform: 'translateY(-50%)', width: 46, height: 60, border: '1px solid rgba(40,70,20,0.35)', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
              {/* guilloche rosette, where the denomination used to sit */}
              <svg className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                   width="70" height="70" viewBox="0 0 70 70" fill="none">
                {[26, 20, 14, 8].map((r) => (
                  <circle key={r} cx="35" cy="35" r={r} stroke="rgba(20,55,10,0.28)" strokeWidth="0.7" />
                ))}
                {Array.from({ length: 24 }, (_, k) => {
                  const rad = (k * 15 * Math.PI) / 180
                  return (
                    <line
                      key={k}
                      x1={35 + 8 * Math.cos(rad)}
                      y1={35 + 8 * Math.sin(rad)}
                      x2={35 + 26 * Math.cos(rad)}
                      y2={35 + 26 * Math.sin(rad)}
                      stroke="rgba(20,55,10,0.2)"
                      strokeWidth="0.6"
                    />
                  )
                })}
              </svg>
              {/* top center text */}
              <div className="absolute uppercase whitespace-nowrap"
                   style={{ top: 9, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-body)', fontSize: 6, color: 'rgba(20,50,10,0.45)', letterSpacing: '0.15em' }}>
                Forum Note · Series II
              </div>
              {/* serial row */}
              <div className="absolute flex justify-between items-center" style={{ bottom: 9, left: 68, right: 10 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 7, color: 'rgba(20,50,10,0.4)', letterSpacing: '0.1em' }}>{serialFor(i)}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 7, color: 'rgba(20,50,10,0.4)', letterSpacing: '0.06em' }}>GIF</span>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

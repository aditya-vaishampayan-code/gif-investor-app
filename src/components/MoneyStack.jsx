import { AnimatePresence, motion } from 'framer-motion'
import { MONEY_BY_SCORE } from '../data/startups'

export default function MoneyStack({ score }) {
  return (
    <div className="relative w-full" style={{ height: Math.max(108, 92 + score * 8) }} aria-hidden>
      <AnimatePresence>
        {Array.from({ length: score }, (_, i) => {
          const rot = (i % 2 === 0 ? 1 : -1) * (1.2 + i * 0.35)
          return (
            <motion.div
              key={i}
              initial={{ y: -50, opacity: 0, rotate: rot }}
              animate={{ y: 0, opacity: 1, rotate: rot }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              className="absolute flex items-center gap-2.5 bg-[#F5EDD0] border border-ink/13 rounded-[2px] pl-[22px] pr-4"
              style={{
                bottom: i * 8,
                left: 'calc(50% - 115px)',
                width: 230,
                height: 92,
                boxShadow: '0 3px 10px rgba(27,23,20,0.14)',
                zIndex: i,
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-orange rounded-l-[2px]" />
              <div className="flex-1">
                <div className="font-display text-[9px] font-extrabold text-ink uppercase mb-1" style={{ letterSpacing: '0.16em' }}>
                  Global Impact Forum
                </div>
                <div className="text-sm font-semibold text-ink">${MONEY_BY_SCORE[i + 1]}K</div>
              </div>
              <div className="font-display text-3xl font-extrabold leading-none" style={{ color: 'rgba(240,100,40,0.1)', letterSpacing: '-0.03em' }}>
                {i + 1}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

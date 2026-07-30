import { AnimatePresence, motion } from 'framer-motion'

export default function MoneyStack({ score }) {
  return (
    <div className="relative h-44 flex items-end justify-center" aria-hidden>
      <AnimatePresence>
        {Array.from({ length: score }, (_, i) => (
          <motion.div
            key={i}
            initial={{ y: -80, opacity: 0, rotate: -8 + Math.random() * 16 }}
            animate={{ y: 0, opacity: 1, rotate: (i % 2 ? 1 : -1) * (2 + (i % 3)) }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 24 }}
            className="absolute text-4xl"
            style={{ bottom: i * 14 }}
          >
            💵
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

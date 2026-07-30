import { useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Shell from '../components/Shell'
import MoneyStack from '../components/MoneyStack'
import { MONEY_BY_SCORE, STARTUPS, formatMoney } from '../data/startups'
import { getRating, saveRating } from '../services/dataService'

export default function Rate() {
  const { id } = useParams()
  const nav = useNavigate()
  const s = STARTUPS.find((x) => x.id === id)
  const [score, setScore] = useState(5)
  const [confirming, setConfirming] = useState(false)
  const [locked, setLocked] = useState(false)

  if (!s) return <Navigate to="/" replace />
  if (getRating(id) && !locked) return <Navigate to={`/startup/${id}`} replace />

  const onSlide = (e) => {
    const v = Number(e.target.value)
    if (v !== score) navigator.vibrate?.(8)
    setScore(v)
    setConfirming(false)
  }

  const lockIn = () => {
    saveRating(id, score)
    navigator.vibrate?.([30, 40, 60])
    setLocked(true)
    setTimeout(() => nav(`/startup/${id}`), 1400)
  }

  if (locked) {
    return (
      <Shell title={s.name} back={`/startup/${id}`}>
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="text-center py-20">
          <div className="text-7xl mb-4">✅</div>
          <p className="text-2xl font-extrabold text-bronze">INVESTED</p>
          <p className="text-fog/60 mt-2">{formatMoney(MONEY_BY_SCORE[score])} of interest locked in</p>
        </motion.div>
      </Shell>
    )
  }

  return (
    <Shell title={`Rate ${s.name}`} back={`/startup/${id}`}>
      <p className="text-center font-display text-xl text-fog/80 mb-2">How far does your conviction go?</p>
      <p className="text-center text-5xl font-extrabold text-gold mb-1">{score}<span className="text-xl text-fog/40">/10</span></p>
      <p className="text-center text-bronze font-bold text-lg mb-4">{formatMoney(MONEY_BY_SCORE[score])}</p>

      <MoneyStack score={score} />

      <input type="range" min="1" max="10" step="1" value={score} onChange={onSlide}
             aria-label="Investment interest from 1 to 10"
             className="w-full mt-6 accent-gold h-2" />
      <div className="flex justify-between text-xs text-fog/40 mt-1 mb-8">
        <span>Pass</span><span>All in</span>
      </div>

      {confirming ? (
        <div className="space-y-2">
          <p className="text-center text-fog/70 text-sm">Lock in <b className="text-gold">{score}/10</b>? This is final.</p>
          <button onClick={lockIn} className="w-full rounded-xl bg-bronze text-ink font-bold py-4 active:scale-95 transition">
            🔒 Yes, Lock It In
          </button>
          <button onClick={() => setConfirming(false)} className="w-full rounded-xl bg-surface text-fog/70 py-3">
            Keep adjusting
          </button>
        </div>
      ) : (
        <button onClick={() => setConfirming(true)} className="w-full rounded-xl bg-gold text-ink font-bold py-4 active:scale-95 transition">
          Lock It In
        </button>
      )}
    </Shell>
  )
}

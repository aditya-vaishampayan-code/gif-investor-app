import { useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Frame from '../components/Frame'
import MoneyStack from '../components/MoneyStack'
import { MONEY_BY_SCORE, STARTUPS, formatMoneyFull } from '../data/startups'
import { getRating, saveRating } from '../services/dataService'

const cta = 'w-full bg-orange text-white py-[18px] font-display font-bold text-base border-none cursor-pointer'
const ctaStyle = { borderRadius: 10, letterSpacing: '0.02em' }

export default function Rate() {
  const { id } = useParams()
  const nav = useNavigate()
  const s = STARTUPS.find((x) => x.id === id)
  const [score, setScore] = useState(5)
  const [phase, setPhase] = useState('sliding') // sliding | confirm | locked

  if (!s) return <Navigate to="/" replace />
  if (getRating(id) && phase !== 'locked') return <Navigate to={`/startup/${id}`} replace />

  const money = formatMoneyFull(MONEY_BY_SCORE[score])

  const onSlide = (e) => {
    const v = Number(e.target.value)
    if (v !== score) navigator.vibrate?.(8)
    setScore(v)
  }

  const lockIn = () => {
    saveRating(id, score)
    navigator.vibrate?.([30, 40, 60])
    setPhase('locked')
    setTimeout(() => nav(`/startup/${id}`), 1500)
  }

  return (
    <Frame className="flex flex-col">
      {phase === 'sliding' && (
        <>
          <div className="px-5 pt-4 border-b border-ink/7" style={{ background: 'rgba(255,255,255,0.6)' }}>
            <button onClick={() => nav(-1)} className="inline-block text-ink/40 text-xs font-semibold pb-4 border-none bg-transparent cursor-pointer p-0" style={{ letterSpacing: '0.08em' }}>
              ← BACK
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center px-7 pt-2 pb-10">
            <p className="text-[11px] font-semibold text-ink/40 uppercase mb-5 mt-4 text-center" style={{ letterSpacing: '0.12em' }}>
              {s.name}
            </p>
            <div className="flex items-end justify-center gap-1.5 mb-1 leading-none">
              <span className="font-display text-[100px] font-bold text-orange" style={{ letterSpacing: '-0.04em', lineHeight: 0.9 }}>{score}</span>
              <span className="font-display text-[32px] font-bold text-ink/20 pb-3" style={{ letterSpacing: '-0.02em' }}>/10</span>
            </div>
            <p className="text-[17px] font-semibold text-ink/55 mb-7 text-center">{money}</p>
            <div className="w-full mb-9"><MoneyStack score={score} /></div>
            <input type="range" min="1" max="10" step="1" value={score} onChange={onSlide}
                   aria-label="Investment interest from 1 to 10" className="mb-1.5" />
            <div className="w-full flex justify-between mb-9">
              <span className="text-xs text-ink/35" style={{ letterSpacing: '0.04em' }}>Pass</span>
              <span className="text-xs text-ink/35" style={{ letterSpacing: '0.04em' }}>All in</span>
            </div>
            <button onClick={() => setPhase('confirm')} className={cta} style={ctaStyle}>
              Lock it in
            </button>
          </div>
        </>
      )}

      {phase === 'confirm' && (
        <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25 }}
                    className="flex-1 flex flex-col items-center justify-center px-7 py-10 text-center">
          <p className="text-[11px] font-semibold text-ink/40 uppercase mb-6" style={{ letterSpacing: '0.14em' }}>{s.name}</p>
          <p className="font-display text-[80px] font-bold text-orange mb-5" style={{ lineHeight: 0.9, letterSpacing: '-0.04em' }}>{score}</p>
          <p className="text-base text-ink/75 font-medium mb-1.5">Lock in {score}/10?</p>
          <p className="text-[13px] text-ink/40 mb-11" style={{ lineHeight: 1.6 }}>This is final. Ratings cannot be changed.</p>
          <button onClick={lockIn} className={`${cta} mb-3`} style={ctaStyle}>
            Confirm — {money}
          </button>
          <button onClick={() => setPhase('sliding')}
                  className="w-full border border-ink/20 text-ink/55 py-4 text-sm font-medium cursor-pointer"
                  style={{ borderRadius: 10, background: 'transparent' }}>
            Keep adjusting
          </button>
        </motion.div>
      )}

      {phase === 'locked' && (
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                    className="flex-1 flex flex-col items-center justify-center px-7 py-10 text-center">
          <div className="w-1 h-1 bg-orange rounded-full mb-7" />
          <p className="text-[11px] font-semibold text-ink/40 uppercase mb-4" style={{ letterSpacing: '0.2em' }}>Invested</p>
          <p className="font-display text-[88px] font-bold text-orange mb-3" style={{ lineHeight: 0.9, letterSpacing: '-0.04em' }}>{score}</p>
          <p className="font-display text-[22px] font-bold text-ink/20 mb-4" style={{ letterSpacing: '-0.02em' }}>/10</p>
          <p className="text-xl font-semibold text-ink/60">{money}</p>
        </motion.div>
      )}
    </Frame>
  )
}

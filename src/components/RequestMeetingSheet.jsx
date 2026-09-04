import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { STARTUPS } from '../data/startups'
import { BOOKABLE_DAYS, buildDaySlots } from '../data/availability'
import { createMeetingRequest, isSlotFree } from '../services/dataService'

const fieldLabel = 'text-[10px] font-semibold text-muted uppercase mb-1.5'
const labelStyle = { letterSpacing: '0.12em' }
const selectCls =
  'w-full px-3 py-[11px] border border-ink/18 text-sm text-ink focus:outline-none focus:border-orange appearance-none disabled:opacity-50'
const selectStyle = { borderRadius: 8, background: 'rgba(255,255,255,0.85)' }

export default function RequestMeetingSheet({ onClose, onSubmitted }) {
  const [startupId, setStartupId] = useState('')
  const [founderName, setFounderName] = useState('')
  const [dayId, setDayId] = useState(BOOKABLE_DAYS[0].id)
  const [slot, setSlot] = useState(null)
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const startup = STARTUPS.find((s) => s.id === startupId) || null
  const founder = startup?.founders.find((f) => f.name === founderName) || null

  const slots = useMemo(() => {
    if (!founderName) return []
    return buildDaySlots(dayId).map((s) => ({
      ...s,
      free: !s.lunch && isSlotFree(founderName, s.startsAt, s.endsAt),
    }))
  }, [founderName, dayId])

  const pickStartup = (id) => {
    setStartupId(id)
    setFounderName('')
    setSlot(null)
    setError('')
  }

  const pickFounder = (name) => {
    setFounderName(name)
    setSlot(null)
    setError('')
  }

  const pickDay = (id) => {
    setDayId(id)
    setSlot(null)
    setError('')
  }

  const canSubmit = startup && founder && slot && !submitting

  const submit = async () => {
    if (!canSubmit) return
    setSubmitting(true)
    setError('')
    try {
      const day = BOOKABLE_DAYS.find((d) => d.id === dayId)
      await createMeetingRequest({
        startupId: startup.id,
        startupName: startup.name,
        founderName: founder.name,
        founderRole: founder.role,
        dayId,
        dayLabel: day.label,
        startsAt: slot.startsAt,
        endsAt: slot.endsAt,
        timeLabel: slot.timeLabel,
        note,
      })
      onSubmitted?.()
    } catch (err) {
      setError(err.message || 'Could not send the request.')
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 flex flex-col">
      <div className="flex-1" style={{ background: 'rgba(27,23,20,0.4)' }} onClick={onClose} />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white relative overflow-hidden"
        style={{ maxHeight: '88vh' }}
      >
        <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ background: 'var(--stripe-gradient)' }} />
        <div className="relative flex flex-col" style={{ maxHeight: '88vh' }}>
          <div className="px-6 pt-5 pb-4 border-b border-ink/8 flex justify-between items-center shrink-0">
            <div>
              <p className="font-display text-base font-bold text-ink" style={{ letterSpacing: '-0.01em' }}>Request a meeting</p>
              <p className="text-[11px] text-muted mt-0.5">30-min slot · needs VC team approval</p>
            </div>
            <button onClick={onClose} className="w-11 h-11 -mr-2.5 flex items-center justify-center text-xl text-ink/40 leading-none" aria-label="Close">×</button>
          </div>

          <div className="px-6 pt-5 pb-6 overflow-y-auto">
            {/* Startup */}
            <div className="mb-4">
              <p className={fieldLabel} style={labelStyle}>Startup</p>
              <select className={selectCls} style={selectStyle} value={startupId} onChange={(e) => pickStartup(e.target.value)} disabled={submitting}>
                <option value="">Select a startup…</option>
                {STARTUPS.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Founder */}
            <div className="mb-4">
              <p className={fieldLabel} style={labelStyle}>Founder</p>
              <select className={selectCls} style={selectStyle} value={founderName} onChange={(e) => pickFounder(e.target.value)} disabled={submitting || !startup}>
                <option value="">{startup ? 'Select a founder…' : 'Pick a startup first'}</option>
                {startup?.founders.map((f) => (
                  <option key={f.name} value={f.name}>{f.name} — {f.role}</option>
                ))}
              </select>
            </div>

            {/* Day */}
            <div className="mb-4">
              <p className={fieldLabel} style={labelStyle}>Day</p>
              <div className="flex gap-2">
                {BOOKABLE_DAYS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => pickDay(d.id)}
                    disabled={submitting}
                    className={`flex-1 py-2.5 text-[12px] font-semibold border ${
                      dayId === d.id ? 'bg-orange text-white border-orange' : 'bg-white text-ink/60 border-ink/18'
                    }`}
                    style={{ borderRadius: 8 }}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slots */}
            <div className="mb-4">
              <p className={fieldLabel} style={labelStyle}>Time slot</p>
              {!founderName ? (
                <p className="text-[12px] text-ink/40 py-3">Pick a founder to see open slots.</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((s) => {
                    const selected = slot?.startsAt === s.startsAt
                    const disabled = submitting || s.lunch || !s.free
                    return (
                      <button
                        key={s.startsAt}
                        onClick={() => { setSlot(s); setError('') }}
                        disabled={disabled}
                        className={`py-2 px-1 text-[11px] font-semibold border text-center ${
                          selected
                            ? 'bg-orange text-white border-orange'
                            : s.lunch
                              ? 'bg-ink/5 text-ink/30 border-ink/10'
                              : s.free
                                ? 'bg-white text-ink/70 border-ink/18'
                                : 'bg-ink/5 text-ink/25 border-ink/10 line-through'
                        }`}
                        style={{ borderRadius: 8 }}
                      >
                        {s.lunch ? 'Lunch' : s.timeLabel.replace(/ – .*/, '')}
                        {!s.lunch && !s.free && <span className="block text-[9px] no-underline">booked</span>}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Note */}
            <div className="mb-5">
              <p className={fieldLabel} style={labelStyle}>Note for the VC team <span className="text-ink/30 normal-case">(optional)</span></p>
              <textarea
                className={`${selectCls} resize-none`}
                style={selectStyle}
                rows={2}
                maxLength={280}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={submitting}
                placeholder="What do you want to discuss?"
              />
            </div>

            {error && (
              <p className="text-[12px] text-red-600 mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              onClick={submit}
              disabled={!canSubmit}
              className="w-full bg-orange text-white py-3.5 font-display font-bold text-sm disabled:opacity-50"
              style={{ borderRadius: 8, letterSpacing: '0.02em' }}
            >
              {submitting ? 'Sending…' : 'Send request to VC team'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

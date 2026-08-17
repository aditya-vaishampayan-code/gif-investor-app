import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { logout } from '../services/dataService'
import { UPCOMING, TicketSVG } from '../pages/Tickets'

export default function ProfileSheet({ user, onClose }) {
  const nav = useNavigate()
  const initial = user?.name ? user.name[0].toUpperCase() : '?'

  const signOut = () => {
    logout()
    nav('/login')
  }

  return (
    <div className="absolute left-0 right-0 top-0 z-40 flex flex-col" style={{ bottom: 88 }}>
      <div className="flex-1" style={{ background: 'rgba(27,23,20,0.45)' }} onClick={onClose} />

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 left-5 w-9 h-9 rounded-full bg-white/90 border-none flex items-center justify-center shadow-md cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M11 1 3 7l8 6" stroke="#1B1714" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-t-[28px] px-5 pt-6 pb-8 overflow-y-auto"
        style={{ background: '#FBEAE3', maxHeight: '82%' }}
      >
        <p className="text-[12px] font-bold text-ink uppercase mb-4" style={{ letterSpacing: '0.1em' }}>Profile</p>

        <div className="flex items-center gap-3.5 mb-7">
          <div className="w-14 h-14 rounded-full bg-orange text-white flex items-center justify-center shrink-0 border-2 border-white shadow">
            <span className="font-display text-xl font-bold">{initial}</span>
          </div>
          <div>
            <p className="font-display text-[16px] font-bold text-ink" style={{ letterSpacing: '-0.01em' }}>{user?.name}</p>
            <p className="text-[13px] text-ink/55">{user?.email}</p>
            <p className="text-[11px] font-bold text-orange uppercase mt-0.5" style={{ letterSpacing: '0.08em' }}>Investor</p>
          </div>
        </div>

        <p className="text-[12px] font-bold text-ink uppercase mb-3" style={{ letterSpacing: '0.1em' }}>Upcoming</p>
        <div className="flex flex-col gap-2.5 mb-6">
          {UPCOMING.map(({ label, date, ready }) => (
            <div key={label} className="bg-white rounded-2xl px-3.5 py-3 flex items-center gap-3 shadow-sm">
              <div className="w-11 h-11 rounded-lg shrink-0" style={{ background: 'linear-gradient(135deg,#1B1714 0%,#3A2E28 100%)' }} />
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-semibold text-ink/40 uppercase mb-0.5" style={{ letterSpacing: '0.08em' }}>Upcoming</div>
                <div className="text-[14px] font-semibold text-ink">{label}</div>
                <div className="text-[11px] text-ink/40">{date}</div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: 'rgba(27,23,20,0.08)' }}>
                  <TicketSVG color="rgba(27,23,20,0.35)" />
                </div>
                <div className="text-[9px] text-ink/35" style={{ letterSpacing: '0.03em' }}>{ready}</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={signOut} className="w-full text-center text-[13px] font-semibold text-ink/50 border-none bg-transparent cursor-pointer py-2">
          Sign out
        </button>
      </motion.div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { logout, updateUser } from '../services/dataService'

const inputCls =
  'w-full px-3 py-[11px] border border-ink/18 text-sm text-ink focus:outline-none focus:border-orange'

export default function ProfileSheet({ user, onClose, onSaved }) {
  const nav = useNavigate()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const initial = user?.name ? user.name[0].toUpperCase() : '?'

  const save = () => {
    updateUser({ name, email })
    onSaved?.()
    onClose()
  }

  const signOut = () => {
    logout()
    nav('/login')
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col min-h-screen">
      <div className="flex-1" style={{ background: 'rgba(27,23,20,0.4)' }} onClick={onClose} />
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white pb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ background: 'var(--stripe-gradient)' }} />
        <div className="relative">
          <div className="px-6 pt-5 pb-4 border-b border-ink/8 flex justify-between items-center">
            <p className="font-display text-base font-bold text-ink" style={{ letterSpacing: '-0.01em' }}>Profile</p>
            <button onClick={onClose} className="text-xl text-ink/40 leading-none" aria-label="Close">×</button>
          </div>
          <div className="px-6 pt-5">
            <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-ink/7">
              <div className="w-12 h-12 bg-orange flex items-center justify-center shrink-0">
                <span className="font-display text-lg font-bold text-white">{initial}</span>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-ink">{user?.name}</p>
                <p className="text-[13px] text-muted mt-0.5">{user?.email}</p>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-[10px] font-semibold text-muted uppercase mb-1.5" style={{ letterSpacing: '0.12em' }}>Full name</p>
              <input className={inputCls} style={{ background: 'rgba(255,255,255,0.8)' }} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-5">
              <p className="text-[10px] font-semibold text-muted uppercase mb-1.5" style={{ letterSpacing: '0.12em' }}>Email</p>
              <input className={inputCls} style={{ background: 'rgba(255,255,255,0.8)' }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button onClick={save}
                    className="w-full bg-orange text-white py-3.5 font-display font-bold text-sm mb-2.5"
                    style={{ letterSpacing: '0.02em' }}>
              Save changes
            </button>
            <button onClick={signOut} className="w-full border border-ink/18 text-ink/60 py-3.5 text-sm font-medium">
              Sign out
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

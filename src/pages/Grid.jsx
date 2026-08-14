import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'
import ProfileSheet from '../components/ProfileSheet'
import { getUser } from '../services/dataService'

export default function Grid() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [, setTick] = useState(0)
  const nav = useNavigate()
  const user = getUser()
  const initial = user?.name ? user.name[0].toUpperCase() : '?'

  return (
    <Frame>
      <div className="flex-1 flex flex-col pb-[72px]">
        {/* Top bar */}
        <div className="px-5 pt-5 flex justify-between items-start">
          <div>
            <div className="font-display text-[22px] font-extrabold text-ink" style={{ letterSpacing: '-0.02em', lineHeight: 1 }}>GIF II</div>
            <div className="flex items-center gap-[5px] mt-1">
              <div className="w-[6px] h-[6px] bg-orange rounded-full" />
              <span className="text-[12px] font-semibold text-ink/50 uppercase" style={{ letterSpacing: '0.06em' }}>Global Impact Forum II</span>
            </div>
          </div>
          <button onClick={() => setProfileOpen(true)} aria-label="Profile"
                  className="w-9 h-9 bg-orange text-white font-display text-sm font-bold flex items-center justify-center rounded-full shrink-0">
            {initial}
          </button>
        </div>

        {/* HAPPENING NOW */}
        <div className="px-5 pt-6 pb-3">
          <div className="flex items-center justify-between mb-3.5">
            <span className="font-display text-[13px] font-bold text-ink uppercase" style={{ letterSpacing: '0.08em' }}>Happening Now</span>
            <div className="flex items-center gap-[5px]">
              <div className="w-[6px] h-[6px] bg-orange rounded-full" />
              <span className="text-[11px] font-semibold text-orange" style={{ letterSpacing: '0.08em' }}>LIVE</span>
            </div>
          </div>
          <button onClick={() => nav('/gala')}
                  className="w-full text-left rounded-2xl overflow-hidden relative active:scale-[0.98] transition-transform border-none p-0 block"
                  style={{ height: 220, background: 'linear-gradient(135deg,#EF4E3D 0%,#DA4028 35%,#C33017 70%,#8A210C 100%)' }}>
            <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ background: 'var(--stripe-gradient)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top,rgba(27,23,20,0.75) 0%,transparent 55%)' }} />
            <div className="absolute top-3.5 left-3.5">
              <div className="px-2.5 py-1 rounded-full border border-white/25" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)' }}>
                <span className="text-[10px] font-semibold text-white uppercase" style={{ letterSpacing: '0.08em' }}>Pitch Night · Live</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="font-display text-[32px] font-extrabold text-white mb-1.5" style={{ lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Pitch Night<br />Gala
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect width="12" height="12" rx="2" fill="rgba(255,255,255,0.4)" /></svg>
                <span className="text-[12px] text-white/75">All 10 Startups</span>
              </div>
            </div>
          </button>
        </div>

        {/* LATER TONIGHT */}
        <div className="px-5 pt-1 pb-6">
          <div className="font-display text-[13px] font-bold text-ink uppercase mb-3.5" style={{ letterSpacing: '0.08em' }}>Later Tonight</div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => nav('/event/ancient-medicine')}
                    className="rounded-xl overflow-hidden relative border-none p-0 cursor-pointer active:scale-[0.98] transition-transform"
                    style={{ height: 160, background: 'linear-gradient(135deg,#1B1714 0%,#3A2E28 100%)' }}>
              <div className="absolute inset-0 opacity-20" style={{ background: 'var(--stripe-gradient)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 60%)' }} />
              <div className="absolute top-2.5 right-2.5 px-[7px] py-[3px] rounded-[10px]" style={{ background: 'rgba(240,100,40,0.9)' }}>
                <span className="text-[9px] font-semibold text-white" style={{ letterSpacing: '0.06em' }}>11:00 PM</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <div className="font-display text-[26px] font-extrabold text-white mb-1" style={{ lineHeight: 0.9, letterSpacing: '-0.03em' }}>Ancient<br />Medicine</div>
                <div className="text-[10px] text-white/55">Coming Soon</div>
              </div>
            </button>
            <button onClick={() => nav('/event/xyz')}
                    className="rounded-xl overflow-hidden relative border-none p-0 cursor-pointer active:scale-[0.98] transition-transform"
                    style={{ height: 160, background: 'linear-gradient(135deg,#EF4E3D 0%,#D33E2E 100%)' }}>
              <div className="absolute inset-0 opacity-20" style={{ background: 'var(--stripe-gradient)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 60%)' }} />
              <div className="absolute top-2.5 right-2.5 px-[7px] py-[3px] rounded-[10px]" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <span className="text-[9px] font-semibold text-white" style={{ letterSpacing: '0.06em' }}>12:30 AM</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <div className="font-display text-[26px] font-extrabold text-white mb-1" style={{ lineHeight: 0.9, letterSpacing: '-0.03em' }}>XYZ</div>
                <div className="text-[10px] text-white/65">Coming Soon</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <BottomNav active="tonight" />

      {profileOpen && (
        <ProfileSheet user={user} onClose={() => setProfileOpen(false)} onSaved={() => setTick((t) => t + 1)} />
      )}
    </Frame>
  )
}

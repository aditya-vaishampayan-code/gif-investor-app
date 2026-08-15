import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'
import ProfileSheet from '../components/ProfileSheet'
import { getUser } from '../services/dataService'

const EVENTS = [
  {
    id: 'ancient-medicine',
    path: '/event/ancient-medicine',
    title: 'Ancient Medicine',
    desc: 'Tech Talent and Transformation',
    time: '9:00 pm to 11:00 pm',
    blurb: 'Lorem Ipsum has been the industry\u2019s standard dummy text ever since 1966, when designers…',
  },
  {
    id: 'xyz',
    path: '/event/xyz',
    title: 'XYZ',
    desc: 'Tech Talent and Transformation',
    time: '9:00 pm to 11:00 pm',
    blurb: 'Lorem Ipsum has been the industry\u2019s standard dummy text ever since 1966, when designers…',
  },
  {
    id: 'connecting-power',
    path: '/event/connecting-power',
    title: 'Connecting Power',
    desc: 'Tech Talent and Transformation',
    time: '9:00 pm to 11:00 pm',
    blurb: 'Lorem Ipsum has been the industry\u2019s standard dummy text ever since 1966, when designers…',
  },
]

export default function Grid() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [, setTick] = useState(0)
  const nav = useNavigate()
  const user = getUser()
  const initial = user?.name ? user.name[0].toUpperCase() : '?'

  return (
    <Frame className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, #EF4E3D 0%, #E85A45 20%, #B97270 40%, #7C87A0 60%, #6591B0 78%, #4B546B 100%)',
        }}
      />

      <div className="flex-1 flex flex-col pb-[88px]">
        {/* Top bar */}
        <div className="px-5 pt-5 flex justify-between items-start">
          <img src="/logo-lockup-white.png" alt="Global Impact Forum" className="w-[187px] h-[57px]" />
          <button
            onClick={() => setProfileOpen(true)}
            aria-label="Profile"
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/70 shrink-0 bg-orange text-white font-display text-sm font-bold flex items-center justify-center"
          >
            {initial}
          </button>
        </div>
        <div className="px-5 pt-2">
          <span className="text-[11px] font-semibold text-white/80 uppercase" style={{ letterSpacing: '0.14em' }}>
            Global Impact Forum – Edition II
          </span>
        </div>

        {/* Search */}
        <div className="px-5 pt-4">
          <div className="flex items-center gap-2.5 bg-white rounded-full px-4 py-3 shadow-md">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#7A726A" strokeWidth="1.6">
              <circle cx="7" cy="7" r="5.5" />
              <path d="M11 11 14.5 14.5" strokeLinecap="round" />
            </svg>
            <span className="text-[14px] text-ink/40">Discover</span>
          </div>
        </div>

        {/* HAPPENING NOW */}
        <div className="px-5 pt-6 pb-3">
          <div className="flex items-center justify-between mb-3.5">
            <span className="font-display text-[13px] font-bold text-white uppercase" style={{ letterSpacing: '0.08em' }}>
              Happening Now
            </span>
            <div className="flex items-center gap-[5px]">
              <div className="w-[6px] h-[6px] bg-orange rounded-full" />
              <span className="text-[11px] font-semibold text-white" style={{ letterSpacing: '0.08em' }}>LIVE</span>
            </div>
          </div>
          <button
            onClick={() => nav('/gala')}
            className="w-full text-left rounded-2xl overflow-hidden border-none p-0 block bg-white active:scale-[0.98] transition-transform shadow-lg"
          >
            <div className="relative" style={{ height: 160, background: 'linear-gradient(135deg,#EF4E3D 0%,#DA4028 35%,#C33017 70%,#8A210C 100%)' }}>
              <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ background: 'var(--stripe-gradient)' }} />
            </div>
            <div className="p-4">
              <div className="font-display text-[22px] font-extrabold text-orange mb-0.5" style={{ letterSpacing: '-0.02em' }}>
                Pitch Night Gala
              </div>
              <div className="text-[13px] text-ink/55 font-semibold">All 10 Startups</div>
            </div>
          </button>
        </div>

        {/* LATER TONIGHT */}
        <div className="px-5 pt-1 pb-6">
          <div className="font-display text-[13px] font-bold text-white/90 uppercase mb-3.5" style={{ letterSpacing: '0.08em' }}>
            Later Tonight
          </div>
          <div className="flex flex-col gap-3">
            {EVENTS.map((ev) => (
              <button
                key={ev.id}
                onClick={() => nav(ev.path)}
                className="flex gap-3 items-start text-left rounded-2xl p-3 border-none cursor-pointer active:scale-[0.98] transition-transform"
                style={{ background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(6px)' }}
              >
                <div className="w-20 h-20 rounded-xl shrink-0" style={{ background: 'linear-gradient(135deg,#1B1714 0%,#3A2E28 100%)' }} />
                <div className="flex-1 min-w-0">
                  <div className="font-display text-[16px] font-extrabold text-white mb-0.5">{ev.title}</div>
                  <div className="text-[11px] text-white/70 mb-1.5">{ev.desc}</div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-orange text-white text-[10px] font-semibold mb-1.5">
                    {ev.time}
                  </span>
                  <div className="text-[11px] text-white/60 line-clamp-2">{ev.blurb}</div>
                </div>
              </button>
            ))}
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
import { useNavigate } from 'react-router-dom'

const TABS = [
  { id: 'tonight', label: 'Tonight', icon: '/icons/nav-tonight.svg', path: '/' },
  { id: 'agenda',  label: 'Agenda',  icon: '/icons/nav-agenda.svg', path: '/agenda' },
  { id: 'pitchNight', label: 'Pitch Night', icon: '/icons/nav-pitchnight.svg', path: '/gala' },
  { id: 'meetings', label: 'Meetings', icon: '/icons/nav-meetings.svg', path: '/meetings' },
]

export default function BottomNav({ active }) {
  const nav = useNavigate()
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-20 flex border-t border-ink/10"
         style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {TABS.map(({ id, label, icon, path }) => {
        const active_ = id === active
        const color = active_ ? '#EF4E3D' : 'rgba(27,23,20,0.35)'
        return (
          <button key={id} onClick={() => nav(path)}
                  className="flex-1 flex flex-col items-center gap-[3px] py-3 pb-3.5 border-none bg-transparent cursor-pointer">
            <div
              className="w-[22px] h-[18px] flex items-center justify-center"
              style={{ filter: active_ ? 'none' : 'grayscale(1) opacity(0.5)' }}
            >
              <img src={icon} alt="" className="w-full h-full object-contain" />
            </div>
            <span className="text-[10px] font-semibold uppercase" style={{ color, letterSpacing: '0.06em' }}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}

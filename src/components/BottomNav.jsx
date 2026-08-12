import { useNavigate } from 'react-router-dom'

const HouseIcon = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 8L9 2L16 8V16H11V11H7V16H2V8Z" fill={color} stroke={color} strokeWidth="1.2" />
  </svg>
)

const AgendaIcon = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="2" width="14" height="14" rx="1.5" stroke={color} strokeWidth="1.5" />
    <line x1="5" y1="7" x2="13" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="5" y1="10" x2="11" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const TicketIcon = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1.5" y="4.5" width="15" height="9" rx="1" stroke={color} strokeWidth="1.5" />
    <line x1="6" y1="4.5" x2="6" y2="13.5" stroke={color} strokeWidth="1.5" strokeDasharray="1.5 1.5" />
  </svg>
)

const TABS = [
  { id: 'tonight', label: 'Tonight', Icon: HouseIcon, path: '/' },
  { id: 'agenda',  label: 'Agenda',  Icon: AgendaIcon, path: '/agenda' },
  { id: 'tickets', label: 'Tickets', Icon: TicketIcon,  path: '/tickets' },
]

export default function BottomNav({ active }) {
  const nav = useNavigate()
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-20 flex border-t border-ink/10"
         style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {TABS.map(({ id, label, Icon, path }) => {
        const color = id === active ? '#F06428' : 'rgba(27,23,20,0.35)'
        return (
          <button key={id} onClick={() => nav(path)}
                  className="flex-1 flex flex-col items-center gap-[3px] py-3 pb-3.5 border-none bg-transparent cursor-pointer">
            <div className="w-[22px] h-[22px] flex items-center justify-center">
              <Icon color={color} />
            </div>
            <span className="text-[10px] font-semibold uppercase" style={{ color, letterSpacing: '0.06em' }}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}

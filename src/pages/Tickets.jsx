import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'

function QRCode() {
  const size = 106, cells = 7, cell = Math.floor(size / cells), seed = 42
  const rects = []
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const v = (Math.sin(seed + r * 13 + c * 7) * 10000) % 1
      if (v > 0.35) rects.push(<rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell - 1} height={cell - 1} fill="white" />)
    }
  }
  ;[[0, 0], [0, 4], [4, 0]].forEach(([r, c], i) => {
    rects.push(<rect key={`co${i}`} x={c * cell} y={r * cell} width={cell * 3} height={cell * 3} fill="white" />)
    rects.push(<rect key={`ci${i}`} x={c * cell + cell * 0.7} y={r * cell + cell * 0.7} width={cell * 1.6} height={cell * 1.6} fill="#1B1714" />)
  })
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>{rects}</svg>
}

const TicketSVG = ({ color = 'white' }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1.5" y="4.5" width="15" height="9" rx="1" stroke={color} strokeWidth="1.5" />
    <line x1="6" y1="4.5" x2="6" y2="13.5" stroke={color} strokeWidth="1.5" strokeDasharray="1.5 1.5" />
  </svg>
)

const UPCOMING = [
  { label: 'Ancient Medicine', date: 'Sat, Aug 2 · 11:00 PM', ready: 'Ready in 2 days' },
  { label: 'XYZ Pitch Night',  date: 'Fri, Aug 8 · 11:00 PM', ready: 'Ready in 8 days' },
]

export default function Tickets() {
  return (
    <Frame>
      <div className="flex-1 flex flex-col pb-[88px]">
        <div className="px-5 pt-6 pb-4">
          <div className="font-display text-[26px] font-bold text-ink mb-1" style={{ letterSpacing: '-0.02em' }}>My Tickets</div>
          <div className="text-[12px] font-semibold text-ink/40 uppercase" style={{ letterSpacing: '0.08em' }}>3 Upcoming Events</div>
        </div>

        {/* Live Tonight card */}
        <div className="mx-5 mb-4 border border-ink/10 rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.88)' }}>
          <div className="px-4 py-3 flex justify-between items-center border-b border-ink/7">
            <div>
              <div className="text-[10px] font-semibold text-orange uppercase mb-0.5" style={{ letterSpacing: '0.1em' }}>● Live Tonight</div>
              <div className="font-display text-[15px] font-bold text-ink" style={{ letterSpacing: '-0.01em' }}>Pitch Night Gala</div>
              <div className="text-[11px] text-ink/45 mt-0.5">Thu, Jul 31 · 10:00 PM</div>
            </div>
            <div className="w-9 h-9 bg-orange rounded-lg flex items-center justify-center shrink-0">
              <TicketSVG />
            </div>
          </div>
          <div className="px-4 pt-7 pb-5 flex flex-col items-center border-b border-ink/7">
            <div className="bg-ink rounded-xl p-3.5 flex items-center justify-center mb-4" style={{ width: 140, height: 140 }}>
              <QRCode />
            </div>
            <div className="text-[10px] font-semibold text-ink/40 uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Gate Entry Code</div>
            <div className="font-mono text-[17px] font-bold text-ink" style={{ letterSpacing: '0.18em' }}>PLSE-882-991</div>
          </div>
        </div>

        {/* Upcoming tickets */}
        <div className="px-5 flex flex-col gap-2">
          {UPCOMING.map(({ label, date, ready }) => (
            <div key={label} className="border border-ink/8 rounded-xl px-4 py-3.5 flex justify-between items-center"
                 style={{ background: 'rgba(255,255,255,0.7)' }}>
              <div>
                <div className="text-[10px] font-semibold text-ink/40 uppercase mb-0.5" style={{ letterSpacing: '0.08em' }}>Upcoming</div>
                <div className="text-[14px] font-semibold text-ink">{label}</div>
                <div className="text-[11px] text-ink/40 mt-0.5">{date}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: 'rgba(27,23,20,0.08)' }}>
                  <TicketSVG color="rgba(27,23,20,0.35)" />
                </div>
                <div className="text-[10px] text-ink/55" style={{ letterSpacing: '0.04em' }}>{ready}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="tickets" />
    </Frame>
  )
}

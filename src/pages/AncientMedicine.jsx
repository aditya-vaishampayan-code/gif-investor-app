import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'

export default function AncientMedicine() {
  const nav = useNavigate()

  return (
    <Frame>
      <div className="flex-1 flex flex-col pb-[72px]">
        {/* Hero */}
        <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 260, background: 'linear-gradient(135deg,#1B1714 0%,#2E2520 60%,#3A2E28 100%)' }}>
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: 'var(--stripe-gradient)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top,rgba(27,23,20,0.85) 0%,transparent 50%)' }} />
          <button onClick={() => nav('/')}
                  className="absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1.5 border border-white/20 cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', borderRadius: 20 }}>
            ← Back
          </button>
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
            <div className="flex gap-1.5 mb-2.5">
              <span className="text-[10px] font-semibold text-orange uppercase px-2.5 py-[3px]"
                    style={{ background: 'rgba(240,100,40,0.25)', border: '1px solid rgba(240,100,40,0.4)', borderRadius: 12, letterSpacing: '0.08em' }}>
                Coming Soon
              </span>
              <span className="text-[10px] font-semibold text-white/70 px-2.5 py-[3px]"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, letterSpacing: '0.06em' }}>
                Sat, Aug 2 · 11:00 PM
              </span>
            </div>
            <h1 className="font-display text-[36px] font-extrabold text-white" style={{ lineHeight: 0.95, letterSpacing: '-0.03em' }}>
              Ancient<br />Medicine
            </h1>
          </div>
        </div>

        {/* Description + info */}
        <div className="px-5 py-5 border-b border-ink/7">
          <p className="text-[14px] text-ink/55 mb-5" style={{ lineHeight: 1.7 }}>
            A curated late-night summit for founders, investors, and cultural figures. The evening blends high-stakes startup pitches with live performances — designed to dissolve the boundary between commerce and culture.
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="px-3.5 py-3.5 border border-ink/8" style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 10 }}>
              <p className="text-[10px] font-semibold text-ink/40 uppercase mb-1.5" style={{ letterSpacing: '0.1em' }}>Venue</p>
              <p className="font-display text-[14px] font-bold text-ink">The Meridian</p>
              <p className="text-[12px] text-muted mt-0.5">East Wing · Floor 3</p>
            </div>
            <div className="px-3.5 py-3.5 border border-ink/8" style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 10 }}>
              <p className="text-[10px] font-semibold text-ink/40 uppercase mb-1.5" style={{ letterSpacing: '0.1em' }}>Format</p>
              <p className="font-display text-[14px] font-bold text-ink">Invite Only</p>
              <p className="text-[12px] text-muted mt-0.5">120 attendees</p>
            </div>
          </div>
        </div>

        {/* Lineup */}
        <div className="px-5 py-5">
          <p className="text-[10px] font-semibold text-ink/40 uppercase mb-3.5" style={{ letterSpacing: '0.14em' }}>Confirmed Lineup</p>
          <div className="flex flex-col gap-2.5 mb-5">
            {[
              { initials: 'NK', name: 'Nina Kraviz', role: 'Main Stage · 01:00 AM', bg: '#EF4E3D' },
              { initials: 'BK', name: 'Ben Klock', role: 'The Terrace · 11:30 PM', bg: '#1B1714' },
              { initials: 'LA', name: 'Lena Abrahamsson', role: 'Rooftop · 02:30 AM', bg: '#EF4E3D' },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-3 px-3 py-2.5 border border-ink/7"
                   style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 8 }}>
                <div className="w-9 h-9 flex items-center justify-center shrink-0 rounded-full" style={{ background: p.bg }}>
                  <span className="font-display text-[11px] font-bold text-white">{p.initials}</span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink" style={{ lineHeight: 1.3 }}>{p.name}</p>
                  <p className="text-[11px] text-orange font-medium uppercase" style={{ letterSpacing: '0.04em' }}>{p.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Ticket */}
          <div className="p-4 text-center border border-orange/15" style={{ background: 'rgba(240,100,40,0.06)', borderRadius: 10 }}>
            <p className="text-[12px] text-ink/50 mb-2">Your ticket is ready. Opens in 2 days.</p>
            <p className="font-mono text-[15px] font-bold text-orange" style={{ letterSpacing: '0.15em' }}>PLSE-882-991</p>
          </div>
        </div>
      </div>
      <BottomNav active="tonight" />
    </Frame>
  )
}

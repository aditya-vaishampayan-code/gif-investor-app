import { initials } from '../data/startups'

function SpeakerRow({ speaker }) {
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <div className="w-8 h-8 rounded-full bg-ink/10 text-ink/60 shrink-0 flex items-center justify-center font-display text-[10px] font-bold">
        {initials(speaker.name)}
      </div>
      <div className="min-w-0">
        <div className="text-[13px] font-semibold text-ink leading-tight">{speaker.name}</div>
        <div className="text-[11px] text-ink/50 leading-tight">{speaker.role}</div>
      </div>
    </div>
  )
}

// `collapsible` gates everything below: pass it (with `expanded`/`onToggle`) to
// let the card hide its description/speakers until tapped. Agenda's timeline
// omits it and always renders fully expanded, non-interactive.
export default function SessionCard({ session, collapsible = false, expanded = true, onToggle }) {
  const open = !collapsible || expanded

  return (
    <div
      className="bg-white rounded-2xl shadow-md p-4"
      style={collapsible ? { cursor: 'pointer' } : undefined}
      onClick={collapsible ? onToggle : undefined}
      role={collapsible ? 'button' : undefined}
      tabIndex={collapsible ? 0 : undefined}
      aria-expanded={collapsible ? open : undefined}
      onKeyDown={
        collapsible
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onToggle?.()
              }
            }
          : undefined
      }
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[12px] font-bold text-orange mb-1">{session.time}</p>
          <p className="font-display text-[15px] font-bold text-ink mb-0.5" style={{ lineHeight: 1.25 }}>
            {session.title}
          </p>
          {session.location && <p className="text-[12px] text-ink/45 mb-0.5">{session.location}</p>}
        </div>
        {collapsible && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink/40 shrink-0 mt-1 transition-transform"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        )}
      </div>

      {open && (
        <>
          {session.description && <p className="text-[12px] text-ink/40 mt-0.5">{session.description}</p>}

          {session.tracks?.map((track, i) => (
            <div key={i} className="mt-3 pt-3 border-t border-ink/8">
              {track.name && (
                <p className="text-[12px] font-bold text-ink mb-2">{track.name}</p>
              )}
              <span className="inline-block px-2.5 py-1 rounded-full bg-orange text-white text-[9px] font-bold uppercase mb-1.5" style={{ letterSpacing: '0.06em' }}>
                Speakers
              </span>
              <div>
                {track.speakers.map((sp) => (
                  <SpeakerRow key={sp.name} speaker={sp} />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

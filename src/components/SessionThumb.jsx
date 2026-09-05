import { useState } from 'react'
import { initials } from '../data/startups'
import { speakerPhotoSrc, sessionSpeakers } from '../data/speakers'

// Two overlapping discs — a rayed sun on the left, concentric ripples on the
// right — reading as the two traditions this session puts in conversation.
// Drawn rather than photographed so it stays crisp at any size and needs no
// image rights.
const SUN_RAYS = Array.from({ length: 18 }, (_, i) => {
  const rad = ((360 / 18) * i * Math.PI) / 180
  return {
    x1: 138 + 32 * Math.cos(rad),
    y1: 62 + 32 * Math.sin(rad),
    x2: 138 + 72 * Math.cos(rad),
    y2: 62 + 72 * Math.sin(rad),
  }
})

const RIPPLE_RADII = [26, 42, 58, 74]

function IndiaChinaMotif() {
  return (
    <svg
      viewBox="0 0 390 160"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ic-ground" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1B1714" />
          <stop offset="55%" stopColor="#3A3530" />
          <stop offset="100%" stopColor="#4B546B" />
        </linearGradient>
        <radialGradient id="ic-warm" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4E3D" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#EF4E3D" stopOpacity="0.04" />
        </radialGradient>
        <radialGradient id="ic-cool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B5DEF6" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#6591B0" stopOpacity="0.04" />
        </radialGradient>
      </defs>

      <rect width="390" height="160" fill="url(#ic-ground)" />

      {/* India — sun disc with rays */}
      <circle cx="138" cy="62" r="78" fill="url(#ic-warm)" />
      <circle cx="138" cy="62" r="78" fill="none" stroke="#EF4E3D" strokeOpacity="0.45" />
      {SUN_RAYS.map((r, i) => (
        <line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="#F7C2B8"
          strokeOpacity="0.32"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      ))}

      {/* China — ripple disc */}
      <circle cx="252" cy="62" r="78" fill="url(#ic-cool)" />
      <circle cx="252" cy="62" r="78" fill="none" stroke="#B5DEF6" strokeOpacity="0.4" />
      {RIPPLE_RADII.map((r) => (
        <circle
          key={r}
          cx="252"
          cy="62"
          r={r}
          fill="none"
          stroke="#B5DEF6"
          strokeOpacity="0.2"
          strokeWidth="0.9"
        />
      ))}

      {/* The meeting point */}
      <line x1="195" y1="8" x2="195" y2="116" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="0.75" />
      <g stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="1.6" strokeLinecap="round">
        <line x1="189" y1="56" x2="201" y2="68" />
        <line x1="201" y1="56" x2="189" y2="68" />
      </g>
    </svg>
  )
}

const MOTIFS = {
  'india-china': IndiaChinaMotif,
}

function FaceChip({ speaker, size }) {
  const [photoFailed, setPhotoFailed] = useState(false)
  return (
    <div
      className="rounded-full overflow-hidden shrink-0 bg-ink/70 text-white/80 flex items-center justify-center font-display font-bold"
      style={{
        width: size,
        height: size,
        marginLeft: -8,
        fontSize: 9,
        boxShadow: '0 0 0 1.5px rgba(255,255,255,0.85), 0 1px 3px rgba(0,0,0,0.35)',
      }}
      title={speaker.name}
    >
      {photoFailed ? (
        initials(speaker.name)
      ) : (
        <img
          src={speakerPhotoSrc(speaker.name)}
          alt={speaker.name}
          className="w-full h-full object-cover"
          onError={() => setPhotoFailed(true)}
        />
      )}
    </div>
  )
}

// The hero image for a session. Uses `session.thumb.image` when there's a real
// photograph, otherwise the drawn motif named by `session.thumb.motif`, and
// falls back to the brand gradient when a session has neither. Any session with
// billed speakers gets their faces along the bottom edge.
export default function SessionThumb({ session, height = 160 }) {
  const [imageFailed, setImageFailed] = useState(false)
  const thumb = session.thumb ?? {}
  const Motif = MOTIFS[thumb.motif]
  const speakers = sessionSpeakers(session)
  const trackCount = session.tracks?.length ?? 0

  return (
    <div
      className="relative overflow-hidden"
      style={{ height, background: 'linear-gradient(135deg,#EF4E3D 0%,#6591B0 60%,#4B546B 100%)' }}
    >
      {thumb.image && !imageFailed ? (
        <img
          src={thumb.image}
          alt={session.title}
          className="absolute inset-0 w-full h-full object-cover z-0"
          onError={() => setImageFailed(true)}
        />
      ) : Motif ? (
        <Motif />
      ) : null}

      {/* Brand stripe wash — lighter over a drawn motif so the artwork reads. */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'var(--stripe-gradient)', opacity: Motif && !thumb.image ? 0.07 : 0.25 }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, rgba(27,23,20,0.82) 0%, rgba(27,23,20,0.15) 48%, transparent 72%)' }}
      />

      {speakers.length > 0 && (
        <div className="absolute left-4 right-4 bottom-3 z-20 flex items-center gap-2.5">
          <div className="flex items-center pl-2">
            {speakers.slice(0, 7).map((sp) => (
              <FaceChip key={sp.name} speaker={sp} size={30} />
            ))}
          </div>
          <div
            className="text-[10px] font-semibold text-white/85 uppercase leading-tight"
            style={{ letterSpacing: '0.08em' }}
          >
            {speakers.length} Speakers
            {trackCount > 1 && (
              <>
                <br />
                <span className="text-white/55">{trackCount} conversations</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

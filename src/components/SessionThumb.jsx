import { useState } from 'react'
import { initials } from '../data/startups'
import { speakerPhotoSrc, sessionSpeakers } from '../data/speakers'

// Session thumbnails are drawn, not photographed: they stay crisp at any size,
// need no image rights, and give every session on the agenda its own card
// without sourcing artwork per talk. Each one composes the same skeleton — two
// overlapping discs on a brand gradient — from a pattern per disc and a palette,
// so the set reads as one family rather than a pile of separate illustrations.

const PALETTES = {
  warm: { ground: ['#1B1714', '#3A3530', '#6B2A24'], left: '#F7C2B8', right: '#EF4E3D', disc: ['#EF4E3D', '#F49C82'] },
  cool: { ground: ['#1B1714', '#3A3530', '#4B546B'], left: '#B5DEF6', right: '#6591B0', disc: ['#6591B0', '#B5DEF6'] },
  deep: { ground: ['#1B1714', '#2C2A33', '#4B546B'], left: '#6591B0', right: '#B5DEF6', disc: ['#4B546B', '#6591B0'] },
  earth: { ground: ['#1B1714', '#3A3530', '#5A4038'], left: '#F49C82', right: '#F7C2B8', disc: ['#EF4E3D', '#6591B0'] },
}

// Each field fills a disc of radius r centred at (cx, cy). The caller clips them
// to that disc, so a pattern is free to run past the edge.
const FIELDS = {
  rays: (cx, cy, r) =>
    Array.from({ length: 18 }, (_, i) => {
      const a = (i * 20 * Math.PI) / 180
      return (
        <line
          key={i}
          x1={cx + r * 0.4 * Math.cos(a)}
          y1={cy + r * 0.4 * Math.sin(a)}
          x2={cx + r * 0.95 * Math.cos(a)}
          y2={cy + r * 0.95 * Math.sin(a)}
        />
      )
    }),

  ripples: (cx, cy, r) =>
    [0.3, 0.5, 0.7, 0.9].map((f) => <circle key={f} cx={cx} cy={cy} r={r * f} />),

  script: (cx, cy, r) =>
    Array.from({ length: 7 }, (_, i) => {
      const y = cy - r * 0.62 + i * ((r * 1.24) / 6)
      const w = r * (i % 3 === 2 ? 0.85 : i % 3 === 1 ? 1.55 : 1.28)
      return <line key={i} x1={cx - r * 0.8} y1={y} x2={cx - r * 0.8 + w} y2={y} />
    }),

  waves: (cx, cy, r) =>
    Array.from({ length: 4 }, (_, i) => {
      const amp = r * 0.18 * (1 + i * 0.25)
      const y = cy - r * 0.45 + i * (r * 0.3)
      const step = r / 4
      let d = `M ${cx - r} ${y}`
      for (let k = 0; k < 8; k++) d += ` q ${step / 2} ${k % 2 ? amp : -amp} ${step} 0`
      return <path key={i} d={d} />
    }),

  frames: (cx, cy, r) => (
    <>
      {Array.from({ length: 3 }, (_, i) => (
        <rect key={i} x={cx - r * 0.62 + i * (r * 0.46)} y={cy - r * 0.34} width={r * 0.36} height={r * 0.68} rx="1.5" />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={'p' + i} x={cx - r + i * (r * 0.22)} y={cy - r * 0.72} width={r * 0.1} height={r * 0.1} />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={'q' + i} x={cx - r + i * (r * 0.22)} y={cy + r * 0.62} width={r * 0.1} height={r * 0.1} />
      ))}
    </>
  ),

  peaks: (cx, cy, r) => (
    <>
      <path d={`M ${cx - r} ${cy + r * 0.55} L ${cx - r * 0.3} ${cy - r * 0.5} L ${cx + r * 0.25} ${cy + r * 0.55} Z`} />
      <path d={`M ${cx - r * 0.15} ${cy + r * 0.55} L ${cx + r * 0.45} ${cy - r * 0.22} L ${cx + r} ${cy + r * 0.55} Z`} />
      <line x1={cx - r} y1={cy + r * 0.55} x2={cx + r} y2={cy + r * 0.55} />
    </>
  ),

  arcs: (cx, cy, r) =>
    [0.35, 0.55, 0.75, 0.95].map((f) => (
      <path
        key={f}
        d={`M ${cx - r * f * 0.7} ${cy - r * f * 0.7} A ${r * f} ${r * f} 0 0 1 ${cx - r * f * 0.7} ${cy + r * f * 0.7}`}
      />
    )),

  trail: (cx, cy, r) => (
    <>
      <path
        d={`M ${cx - r * 0.9} ${cy + r * 0.6} C ${cx - r * 0.2} ${cy + r * 0.3}, ${cx - r * 0.6} ${cy - r * 0.3}, ${cx + r * 0.1} ${cy - r * 0.45} S ${cx + r * 0.9} ${cy - r * 0.55}, ${cx + r * 0.95} ${cy - r * 0.72}`}
        strokeDasharray="4 5"
      />
      {[[-0.9, 0.6], [0.1, -0.45], [0.95, -0.72]].map(([fx, fy], i) => (
        <circle key={i} cx={cx + r * fx} cy={cy + r * fy} r="2.4" />
      ))}
    </>
  ),

  star: (cx, cy, r) => (
    <>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180
        return <line key={i} x1={cx} y1={cy} x2={cx + r * 0.9 * Math.cos(a)} y2={cy + r * 0.9 * Math.sin(a)} />
      })}
      <circle cx={cx} cy={cy} r={r * 0.28} />
    </>
  ),

  columns: (cx, cy, r) =>
    [0.5, 0.78, 1, 0.66, 0.4].map((f, i) => (
      <line
        key={i}
        x1={cx - r * 0.68 + i * (r * 0.34)}
        y1={cy + r * 0.62}
        x2={cx - r * 0.68 + i * (r * 0.34)}
        y2={cy + r * 0.62 - r * 1.05 * f}
      />
    )),

  laurel: (cx, cy, r) => (
    <>
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={`M ${cx + s * r * 0.15} ${cy + r * 0.8} A ${r * 0.8} ${r * 0.8} 0 0 ${s > 0 ? 0 : 1} ${cx + s * r * 0.15} ${cy - r * 0.8}`}
        />
      ))}
      {[-1, 1].map((s) =>
        Array.from({ length: 5 }, (_, i) => {
          const t = -0.6 + i * 0.3
          return <line key={s + '-' + i} x1={cx + s * r * 0.62} y1={cy + r * t} x2={cx + s * r * 0.9} y2={cy + r * (t - 0.14)} />
        })
      )}
    </>
  ),

  chevrons: (cx, cy, r) =>
    [0.3, 0.55, 0.8, 1.05].map((f, i) => (
      <path key={i} d={`M ${cx - r * 0.7} ${cy - r * f * 0.5} L ${cx} ${cy + r * f * 0.35} L ${cx + r * 0.7} ${cy - r * f * 0.5}`} />
    )),
}

// Which patterns and palette each session draws. `join` marks the meeting point
// between the two discs: an × for the bilateral "India x …" conversations, a
// diamond for everything else.
const MOTIFS = {
  'india-china': { left: 'rays', right: 'ripples', palette: 'warm', join: 'x' },
  'vip-deal-making': { left: 'chevrons', right: 'columns', palette: 'deep', join: 'dot' },
  'words-that-outlive-empires': { left: 'script', right: 'rays', palette: 'cool', join: 'x' },
  'the-sound-of-the-soul': { left: 'waves', right: 'ripples', palette: 'cool', join: 'x' },
  'frames-of-a-civilisation': { left: 'frames', right: 'rays', palette: 'cool', join: 'x' },
  'guardians-of-the-wild': { left: 'peaks', right: 'ripples', palette: 'earth', join: 'x' },
  'voices-carried-forward': { left: 'arcs', right: 'rays', palette: 'earth', join: 'x' },
  'the-long-walk-to-selfhood': { left: 'trail', right: 'ripples', palette: 'earth', join: 'x' },
  'special-guest-media-bite': { left: 'waves', right: 'columns', palette: 'deep', join: 'dot' },
  'gala-night-awards-opening': { left: 'star', right: 'rays', palette: 'warm', join: 'dot' },
  'cultural-icon-of-the-year-award': { left: 'star', right: 'laurel', palette: 'warm', join: 'dot' },
  'ministerial-keynote': { left: 'columns', right: 'rays', palette: 'deep', join: 'dot' },
  'the-legacy-hour': { left: 'laurel', right: 'ripples', palette: 'deep', join: 'dot' },
  'capital-council-pitches': { left: 'chevrons', right: 'ripples', palette: 'warm', join: 'dot' },
}

function Motif({ name, uid, compact }) {
  const spec = MOTIFS[name]
  if (!spec) return null
  const p = PALETTES[spec.palette]
  const g = compact
    ? { w: 390, h: 96, cy: 48, r: 56, lx: 150, rx: 240 }
    : { w: 390, h: 160, cy: 64, r: 78, lx: 138, rx: 252 }

  const disc = (side, field, colour, i) => {
    const cx = side === 'l' ? g.lx : g.rx
    return (
      <g key={side}>
        <clipPath id={`${uid}-${side}-clip`}>
          <circle cx={cx} cy={g.cy} r={g.r} />
        </clipPath>
        <circle cx={cx} cy={g.cy} r={g.r} fill={`url(#${uid}-${side}-fill)`} />
        <circle cx={cx} cy={g.cy} r={g.r} fill="none" stroke={colour} strokeOpacity="0.42" />
        <g
          clipPath={`url(#${uid}-${side}-clip)`}
          fill="none"
          stroke={colour}
          strokeOpacity="0.3"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {FIELDS[field](cx, g.cy, g.r)}
        </g>
      </g>
    )
  }

  return (
    <svg
      viewBox={`0 0 ${g.w} ${g.h}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-ground`} x1="0" y1="0" x2="1" y2="1">
          {p.ground.map((c, i) => (
            <stop key={i} offset={`${i * 50}%`} stopColor={c} />
          ))}
        </linearGradient>
        {['l', 'r'].map((side, i) => (
          <radialGradient key={side} id={`${uid}-${side}-fill`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={p.disc[i]} stopOpacity="0.5" />
            <stop offset="100%" stopColor={p.disc[i]} stopOpacity="0.04" />
          </radialGradient>
        ))}
      </defs>

      <rect width={g.w} height={g.h} fill={`url(#${uid}-ground)`} />
      {disc('l', spec.left, p.left)}
      {disc('r', spec.right, p.right)}

      <line x1="195" y1={g.cy - g.r * 0.9} x2="195" y2={g.cy + g.r * 0.75} stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="0.75" />
      <g stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="1.6" strokeLinecap="round" fill="none">
        {spec.join === 'x' ? (
          <>
            <line x1="189" y1={g.cy - 6} x2="201" y2={g.cy + 6} />
            <line x1="201" y1={g.cy - 6} x2="189" y2={g.cy + 6} />
          </>
        ) : (
          <path d={`M 195 ${g.cy - 7} L 202 ${g.cy} L 195 ${g.cy + 7} L 188 ${g.cy} Z`} />
        )}
      </g>
    </svg>
  )
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
// falls back to the brand gradient when a session has neither.
//
// `compact` is the agenda-card banner: shorter, and without the face pile, since
// the card already lists every speaker with their photo directly underneath.
export default function SessionThumb({ session, height, compact = false, style }) {
  const [imageFailed, setImageFailed] = useState(false)
  const thumb = session.thumb ?? {}
  const drawn = Boolean(MOTIFS[thumb.motif])
  const speakers = compact ? [] : sessionSpeakers(session)
  const trackCount = session.tracks?.length ?? 0

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: height ?? (compact ? 84 : 160),
        background: 'linear-gradient(135deg,#EF4E3D 0%,#6591B0 60%,#4B546B 100%)',
        ...style,
      }}
    >
      {thumb.image && !imageFailed ? (
        <img
          src={thumb.image}
          alt={session.title}
          className="absolute inset-0 w-full h-full object-cover z-0"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <Motif name={thumb.motif} uid={`t-${session.id}${compact ? '-c' : ''}`} compact={compact} />
      )}

      {/* Brand stripe wash — lighter over a drawn motif so the artwork reads. */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'var(--stripe-gradient)', opacity: drawn && !thumb.image ? 0.07 : 0.25 }}
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

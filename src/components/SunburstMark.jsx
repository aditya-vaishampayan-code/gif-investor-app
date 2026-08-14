const RAY_COUNT = 30
const START_DEG = -95
const END_DEG = 205
const INNER_R = 8
const OUTER_R = 112
const HALF_TIP_DEG = 1.15
const CENTER = 120

function buildRays() {
  const rays = []
  for (let i = 0; i < RAY_COUNT; i++) {
    const t = i / (RAY_COUNT - 1)
    const deg = START_DEG + (END_DEG - START_DEG) * t
    const rad = (deg * Math.PI) / 180
    const halfTip = (HALF_TIP_DEG * Math.PI) / 180
    const ix = CENTER + INNER_R * Math.cos(rad)
    const iy = CENTER + INNER_R * Math.sin(rad)
    const oxL = CENTER + OUTER_R * Math.cos(rad - halfTip)
    const oyL = CENTER + OUTER_R * Math.sin(rad - halfTip)
    const oxR = CENTER + OUTER_R * Math.cos(rad + halfTip)
    const oyR = CENTER + OUTER_R * Math.sin(rad + halfTip)
    const tipR = OUTER_R * halfTip
    rays.push(
      `M ${ix.toFixed(2)} ${iy.toFixed(2)} L ${oxL.toFixed(2)} ${oyL.toFixed(2)} A ${tipR.toFixed(2)} ${tipR.toFixed(2)} 0 0 1 ${oxR.toFixed(2)} ${oyR.toFixed(2)} Z`
    )
  }
  return rays
}

const RAYS = buildRays()

export default function SunburstMark({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" fill={color} className={className} aria-hidden>
      {RAYS.map((d, i) => <path key={i} d={d} />)}
    </svg>
  )
}
/* Fallback SVG glyphs for the Innovators cohort, used when a startup has no logo
   file. All six currently ship real logos, so these rarely render. */
const MARKS = {
  cautio: ( // dashcam lens over a road
    <>
      <rect x="3" y="7" width="18" height="12" rx="2" strokeWidth="1.6" />
      <path d="M8.5 7 10 4.5h4L15.5 7" strokeWidth="1.6" />
      <circle cx="12" cy="13" r="3.2" strokeWidth="1.6" />
    </>
  ),
  flawsome: ( // dissolving water droplet
    <>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" strokeWidth="1.6" />
      <path d="M9.5 14c.6 1.6 2 2.6 3.7 2.6" strokeWidth="1.4" opacity="0.65" />
    </>
  ),
  'just-deliveries': ( // cold-chain crate
    <>
      <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7z" strokeWidth="1.6" />
      <path d="M4 8.5 12 13l8-4.5M12 13v7" strokeWidth="1.6" />
    </>
  ),
  zerocircle: ( // circular economy — wave inside a ring
    <>
      <circle cx="12" cy="12" r="8.5" strokeWidth="1.6" />
      <path d="M5.5 13c2 0 2-2 4-2s2 2 4 2 2-2 4-2" strokeWidth="1.6" />
      <path d="M12 7.5c2.2 0 4 1.8 4 4" strokeWidth="1.3" opacity="0.55" />
    </>
  ),
  'nautical-wings': ( // four-blade propeller
    <>
      <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
      <path d="M11 10c-1-3-3-4.8-6-4.8 0 3 2 4.8 6 4.8zM13 14c1 3 3 4.8 6 4.8 0-3-2-4.8-6-4.8zM10 13c-3 1-4.8 3-4.8 6 3 0 4.8-2 4.8-6zM14 11c3-1 4.8-3 4.8-6-3 0-4.8 2-4.8 6z" strokeWidth="1.4" />
    </>
  ),
  sunfox: ( // ECG pulse across a ring
    <>
      <circle cx="12" cy="12" r="8.5" strokeWidth="1.3" opacity="0.5" />
      <path d="M4 12h3.5l1.5-4 3 8 1.5-4H20" strokeWidth="1.7" />
    </>
  ),
}

export default function Logo({ id, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {MARKS[id]}
    </svg>
  )
}

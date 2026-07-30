/* Dummy SVG logo marks, one distinct glyph per startup, drawn in the tile's foreground color. */
const MARKS = {
  nimbusgrid: ( // energy bolt over grid
    <>
      <path d="M4 9h16M4 15h16M9 4v16M15 4v16" strokeWidth="1.2" opacity="0.45" />
      <path d="M13 3 7 13h4l-1 8 7-11h-4l1-7z" fill="currentColor" stroke="none" />
    </>
  ),
  medloop: ( // pulse loop
    <>
      <circle cx="12" cy="12" r="8.5" strokeWidth="1.6" />
      <path d="M5 12h4l1.5-3.5 3 7L15 12h4" strokeWidth="1.6" />
    </>
  ),
  cratewise: ( // crate
    <>
      <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7z" strokeWidth="1.6" />
      <path d="M4 8.5 12 13l8-4.5M12 13v7" strokeWidth="1.6" />
    </>
  ),
  fluentbee: ( // speech bubble with stripes
    <>
      <path d="M4 5h16v11H10l-4 4v-4H4V5z" strokeWidth="1.6" />
      <path d="M8 9h8M8 12h5" strokeWidth="1.6" />
    </>
  ),
  'terraform-farms': ( // leaf over furrows
    <>
      <path d="M4 19c5 0 8-2 8-7V6c-5 0-8 3-8 7v6z" strokeWidth="1.6" />
      <path d="M12 12c0-3 3-6 8-6v5c0 5-3 7-8 7" strokeWidth="1.6" />
    </>
  ),
  paylattice: ( // lattice of nodes
    <>
      <circle cx="6" cy="6" r="2.2" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="2.2" strokeWidth="1.5" />
      <circle cx="6" cy="18" r="2.2" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="2.2" strokeWidth="1.5" />
      <path d="M8 7.5 16 16.5M16 7.5 8 16.5M8.2 6h7.6M8.2 18h7.6M6 8.2v7.6M18 8.2v7.6" strokeWidth="1.2" opacity="0.7" />
    </>
  ),
  quietdesk: ( // focus dot in brackets
    <>
      <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </>
  ),
  aurorasense: ( // radar waves
    <>
      <circle cx="12" cy="14" r="1.8" fill="currentColor" stroke="none" />
      <path d="M7.5 10.5a6.4 6.4 0 0 1 9 0M4.8 7.6a10.2 10.2 0 0 1 14.4 0" strokeWidth="1.6" />
      <path d="M12 14v6" strokeWidth="1.6" />
    </>
  ),
  snackcircle: ( // bitten cookie circle
    <>
      <path d="M20 12a8 8 0 1 1-4.5-7.2 3.2 3.2 0 0 0 4 4A8 8 0 0 1 20 12z" strokeWidth="1.6" />
      <circle cx="9.5" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="14.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  vaultic: ( // shield with keyhole
    <>
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3z" strokeWidth="1.6" />
      <circle cx="12" cy="10.5" r="1.8" strokeWidth="1.5" />
      <path d="M12 12.3V15" strokeWidth="1.6" />
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

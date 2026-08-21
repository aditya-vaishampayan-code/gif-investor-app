import { useState } from 'react'

export default function VenueMapModal({ isOpen, onClose, location = '', roomKey = '' }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (!isOpen) return null

  // Helper to determine room key from location text if not explicitly provided
  const normLoc = location.toLowerCase()
  const activeRoom =
    roomKey ||
    (normLoc.includes('crystal')
      ? 'crystal'
      : normLoc.includes('gateway')
      ? 'gateway'
      : normLoc.includes('prince')
      ? 'princes'
      : normLoc.includes('ballroom')
      ? 'ballroom'
      : 'crystal')

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[360px] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3.5 bg-ink text-white flex justify-between items-center border-b border-white/10">
          <div>
            <div className="text-[10px] uppercase font-semibold text-white/60 tracking-wider">Venue Layout</div>
            <div className="font-display text-[15px] font-bold text-white">The Taj Mahal Palace, Mumbai</div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white font-bold text-sm border-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Selected location banner */}
        <div className="bg-orange/10 border-b border-orange/20 px-4 py-2.5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse shrink-0" />
          <div className="text-[12px] font-bold text-orange truncate">
            {location || 'Taj Mahal Palace Event Floor'}
          </div>
        </div>

        {/* Map View Content */}
        <div className="p-4 flex-1 overflow-y-auto flex flex-col items-center">
          {!imageFailed ? (
            <div className="relative w-full rounded-xl overflow-hidden border border-ink/10 bg-slate-100 min-h-[200px] flex items-center justify-center">
              <img
                src="/venue-map.jpg"
                alt="Taj Mahal Palace Event Floorplan"
                className="w-full h-auto object-cover"
                onError={() => setImageFailed(true)}
              />
            </div>
          ) : (
            /* Built-in Fallback Interactive SVG Map */
            <div className="w-full bg-slate-50 p-3 rounded-xl border border-ink/10 flex flex-col gap-3">
              <div className="text-[11px] font-bold text-ink/50 uppercase tracking-wider text-center">
                Interactive Event Floorplan
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-[12px] font-bold">
                <div
                  className={`p-3 rounded-lg border transition-all ${
                    activeRoom === 'crystal'
                      ? 'bg-orange text-white border-orange shadow-md scale-[1.02]'
                      : 'bg-white text-ink border-ink/15'
                  }`}
                >
                  <div className="text-[10px] opacity-75 uppercase">Main Hall</div>
                  Crystal Ballroom
                  {activeRoom === 'crystal' && <div className="text-[9px] mt-1 bg-white/20 rounded py-0.5">📍 Current Session</div>}
                </div>

                <div
                  className={`p-3 rounded-lg border transition-all ${
                    activeRoom === 'ballroom'
                      ? 'bg-orange text-white border-orange shadow-md scale-[1.02]'
                      : 'bg-white text-ink border-ink/15'
                  }`}
                >
                  <div className="text-[10px] opacity-75 uppercase">Dining & Networking</div>
                  Ballroom
                  {activeRoom === 'ballroom' && <div className="text-[9px] mt-1 bg-white/20 rounded py-0.5">📍 Current Session</div>}
                </div>

                <div
                  className={`p-3 rounded-lg border transition-all ${
                    activeRoom === 'gateway'
                      ? 'bg-orange text-white border-orange shadow-md scale-[1.02]'
                      : 'bg-white text-ink border-ink/15'
                  }`}
                >
                  <div className="text-[10px] opacity-75 uppercase">1-on-1 Deals</div>
                  Gateway Room
                  {activeRoom === 'gateway' && <div className="text-[9px] mt-1 bg-white/20 rounded py-0.5">📍 Current Session</div>}
                </div>

                <div
                  className={`p-3 rounded-lg border transition-all ${
                    activeRoom === 'princes'
                      ? 'bg-orange text-white border-orange shadow-md scale-[1.02]'
                      : 'bg-white text-ink border-ink/15'
                  }`}
                >
                  <div className="text-[10px] opacity-75 uppercase">Media Lounge</div>
                  Prince’s Room
                  {activeRoom === 'princes' && <div className="text-[9px] mt-1 bg-white/20 rounded py-0.5">📍 Current Session</div>}
                </div>
              </div>
            </div>
          )}

          {/* Quick Info & Google Maps link */}
          <div className="mt-4 w-full flex items-center justify-between gap-2 pt-3 border-t border-ink/8">
            <a
              href="https://maps.google.com/?q=The+Taj+Mahal+Palace+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-bold text-orange flex items-center gap-1 hover:underline decoration-orange"
            >
              <span>🗺 Open Google Maps</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-ink text-white font-display text-[12px] font-bold border-none cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

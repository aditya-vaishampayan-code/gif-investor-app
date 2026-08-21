import { useState, useRef, useEffect } from 'react'

export default function VenueMapModal({ isOpen, onClose, location = '', roomKey = '' }) {
  const [imageSrc, setImageSrc] = useState('/venue-plan.jpeg')
  const [imageFailed, setImageFailed] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  
  // Pan and Zoom states
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const posStartRef = useRef({ x: 0, y: 0 })

  // Reset zoom & pan when modal opens or active room changes
  useEffect(() => {
    if (isOpen) {
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [isOpen, location, roomKey])

  if (!isOpen) return null

  // Helper to determine room key from location text if not explicitly provided
  const normLoc = location.toLowerCase()
  const derivedRoom =
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

  const activeRoom = selectedRoom || derivedRoom

  // Coordinates on the venue-plan.jpeg floorplan
  const pinCoordinates = {
    crystal: { top: '44%', left: '52%', label: 'Crystal Ballroom', desc: 'Main Summit & Keynote Sessions' },
    ballroom: { top: '20%', left: '30%', label: 'Ballroom', desc: 'Networking Lunch, High Tea & Dinner' },
    gateway: { top: '20%', left: '73%', label: 'Gateway Room', desc: 'VIP Deal Making & 1-on-1 Investor Syncs' },
    princes: { top: '11%', left: '86%', label: 'Prince’s Room', desc: 'Media Bites & Executive Lounge' },
  }

  const currentPin = pinCoordinates[activeRoom] || pinCoordinates.crystal

  const handleImageError = () => {
    if (imageSrc === '/venue-plan.jpeg') {
      setImageSrc('/venue-map.jpg')
    } else {
      setImageFailed(true)
    }
  }

  // Zoom helpers
  const handleZoomIn = () => setScale((s) => Math.min(s + 0.5, 3.5))
  const handleZoomOut = () => {
    setScale((s) => {
      const next = Math.max(s - 0.5, 1)
      if (next === 1) setPosition({ x: 0, y: 0 })
      return next
    })
  }
  const handleResetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Pan Handlers (Mouse & Touch)
  const handleMouseDown = (e) => {
    if (scale <= 1) return
    setIsDragging(true)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    posStartRef.current = { ...position }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || scale <= 1) return
    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y
    setPosition({
      x: posStartRef.current.x + dx,
      y: posStartRef.current.y + dy,
    })
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleTouchStart = (e) => {
    if (scale <= 1 || e.touches.length !== 1) return
    setIsDragging(true)
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    posStartRef.current = { ...position }
  }

  const handleTouchMove = (e) => {
    if (!isDragging || scale <= 1 || e.touches.length !== 1) return
    const dx = e.touches[0].clientX - dragStartRef.current.x
    const dy = e.touches[0].clientY - dragStartRef.current.y
    setPosition({
      x: posStartRef.current.x + dx,
      y: posStartRef.current.y + dy,
    })
  }

  const handleTouchEnd = () => setIsDragging(false)

  const handleWheel = (e) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[390px] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-ink text-white flex justify-between items-center border-b border-white/10">
          <div>
            <div className="text-[10px] uppercase font-semibold text-white/60 tracking-wider">Venue Map & Floorplan</div>
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
        <div className="bg-orange/10 border-b border-orange/20 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse shrink-0" />
            <div className="text-[12px] font-bold text-orange truncate">
              📍 {currentPin.label} ({location || currentPin.desc})
            </div>
          </div>
        </div>

        {/* Room selector pills */}
        <div className="flex gap-1.5 px-3 py-2 bg-slate-100 border-b border-ink/8 overflow-x-auto">
          {[
            { id: 'crystal', label: 'Crystal' },
            { id: 'ballroom', label: 'Ballroom' },
            { id: 'gateway', label: 'Gateway' },
            { id: 'princes', label: 'Prince’s' },
          ].map((r) => {
            const active = r.id === activeRoom
            return (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRoom(r.id)
                  handleResetZoom()
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer shrink-0 ${
                  active
                    ? 'bg-orange text-white border-orange shadow-sm'
                    : 'bg-white text-ink/70 border-ink/15 hover:bg-slate-50'
                }`}
              >
                {r.label}
              </button>
            )
          })}
        </div>

        {/* Map Container Viewport */}
        <div className="relative p-2 flex-1 overflow-hidden bg-slate-900 flex items-center justify-center select-none min-h-[260px]">
          {/* Zoom controls floating toolbar */}
          <div className="absolute top-4 right-4 z-30 flex flex-col bg-white/90 backdrop-blur rounded-xl shadow-lg border border-ink/10 overflow-hidden text-ink">
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="w-8 h-8 flex items-center justify-center font-bold text-base hover:bg-slate-100 border-b border-ink/10 border-none cursor-pointer"
            >
              +
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="w-8 h-8 flex items-center justify-center font-bold text-base hover:bg-slate-100 border-b border-ink/10 border-none cursor-pointer"
            >
              −
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Zoom"
              className="w-8 h-7 flex items-center justify-center text-[10px] font-bold hover:bg-slate-100 border-none cursor-pointer uppercase text-orange"
            >
              Reset
            </button>
          </div>

          {/* Scale indicator badge */}
          <div className="absolute bottom-4 left-4 z-30 bg-black/60 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur">
            {scale > 1 ? `${Math.round(scale * 100)}% (Drag to Pan)` : '100% · Pinch / Drag to Zoom'}
          </div>

          {!imageFailed ? (
            <div
              className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
            >
              <div
                className="relative w-full transition-transform duration-75 ease-out"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: 'center center',
                }}
              >
                <img
                  src={imageSrc}
                  alt="Taj Mahal Palace Event Floorplan"
                  className="w-full h-auto object-contain block rounded-lg shadow"
                  onError={handleImageError}
                />

                {/* Pin Callout Marker */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none z-20"
                  style={{ top: currentPin.top, left: currentPin.left }}
                >
                  {/* Floating Pin Label Box */}
                  <div className="bg-orange text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xl border border-white whitespace-nowrap mb-1 flex items-center gap-1.5 animate-bounce">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>📍 {currentPin.label}</span>
                  </div>
                  {/* Pin Pointer Icon */}
                  <div className="w-4 h-4 bg-orange transform rotate-45 border-r border-b border-white -mt-2 shadow-md" />
                </div>
              </div>
            </div>
          ) : (
            /* Fallback layout if no image */
            <div className="w-full bg-slate-50 p-4 rounded-xl border border-ink/10 text-center text-ink text-sm">
              Map image unavailable
            </div>
          )}
        </div>

        {/* Room Description Footer */}
        <div className="p-3 bg-slate-50 border-t border-ink/10 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-orange">Program Location</div>
            <div className="text-[12px] font-bold text-ink truncate">{currentPin.label}</div>
            <div className="text-[11px] text-ink/60 truncate">{currentPin.desc}</div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-ink text-white font-display text-[12px] font-bold border-none cursor-pointer shrink-0"
          >
            Close Map
          </button>
        </div>
      </div>
    </div>
  )
}

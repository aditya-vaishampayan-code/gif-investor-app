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
  const pinchDistRef = useRef(null)
  const initialScaleRef = useRef(1)

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

  // Exact coordinates relative to venue-plan.jpeg floorplan dimensions:
  // - Crystal Ballroom: Central main hall box (center y: 50%, x: 52%)
  // - Ballroom: Top-left hall box (center y: 27%, x: 33%)
  // - Gateway Room: Top-right hall box (center y: 22%, x: 73%)
  // - Prince’s Room: Top-far-right hall box (center y: 14%, x: 86%)
  const pinCoordinates = {
    crystal: { top: '50%', left: '52%', label: 'Crystal Ballroom', desc: 'Main Summit & Keynote Sessions' },
    ballroom: { top: '27%', left: '33%', label: 'Ballroom', desc: 'Networking Lunch, High Tea & Dinner' },
    gateway: { top: '22%', left: '73%', label: 'Gateway Room', desc: 'VIP Deal Making & 1-on-1 Investor Syncs' },
    princes: { top: '14%', left: '86%', label: 'Prince’s Room', desc: 'Media Bites & Executive Lounge' },
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
  const handleZoomIn = () => setScale((s) => Math.min(s + 0.4, 4))
  const handleZoomOut = () => {
    setScale((s) => {
      const next = Math.max(s - 0.4, 1)
      if (next === 1) setPosition({ x: 0, y: 0 })
      return next
    })
  }
  const handleResetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Mouse Pan Handlers
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

  // Touch Pinch & Pan Handlers
  const getTouchDist = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.hypot(dx, dy)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setIsDragging(false)
      pinchDistRef.current = getTouchDist(e.touches)
      initialScaleRef.current = scale
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true)
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      posStartRef.current = { ...position }
    }
  }

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchDistRef.current) {
      const currentDist = getTouchDist(e.touches)
      const factor = currentDist / pinchDistRef.current
      const newScale = Math.min(Math.max(initialScaleRef.current * factor, 1), 4)
      setScale(newScale)
      if (newScale === 1) setPosition({ x: 0, y: 0 })
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      const dx = e.touches[0].clientX - dragStartRef.current.x
      const dy = e.touches[0].clientY - dragStartRef.current.y
      setPosition({
        x: posStartRef.current.x + dx,
        y: posStartRef.current.y + dy,
      })
    }
  }

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      pinchDistRef.current = null
    }
    if (e.touches.length === 0) {
      setIsDragging(false)
    }
  }

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
              {currentPin.label} ({location || currentPin.desc})
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

        {/* Map Viewport Area */}
        <div className="relative p-3 flex-1 overflow-hidden bg-slate-900 flex items-center justify-center select-none min-h-[260px]">
          {/* Zoom Controls floating toolbar */}
          <div className="absolute top-4 right-4 z-30 flex flex-col bg-white/90 backdrop-blur rounded-lg shadow-md border border-ink/10 overflow-hidden text-ink">
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-slate-100 border-b border-ink/10 border-none cursor-pointer"
            >
              +
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-slate-100 border-b border-ink/10 border-none cursor-pointer"
            >
              −
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Zoom"
              className="w-6 h-5 flex items-center justify-center text-[8px] font-bold hover:bg-slate-100 border-none cursor-pointer uppercase text-orange"
            >
              RST
            </button>
          </div>

          {/* Scale indicator badge */}
          <div className="absolute bottom-4 left-4 z-30 bg-black/60 text-white text-[9px] font-medium px-2 py-0.5 rounded-full backdrop-blur pointer-events-none">
            {scale > 1 ? `${Math.round(scale * 100)}% · Drag to Pan` : 'Pinch or tap + to zoom'}
          </div>

          {!imageFailed ? (
            <div
              className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
            >
              {/* Transform Container - strictly wrapped around img */}
              <div
                className="relative inline-block transition-transform duration-75 ease-out"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: 'center center',
                }}
              >
                <img
                  src={imageSrc}
                  alt="Taj Mahal Palace Event Floorplan"
                  className="w-full h-auto block rounded-lg shadow"
                  onError={handleImageError}
                />

                {/* Arrow Pin Callout - Positioned strictly relative to the image dimensions */}
                <div
                  className="absolute flex flex-col items-center pointer-events-none z-20"
                  style={{
                    top: currentPin.top,
                    left: currentPin.left,
                    transform: 'translate(-50%, -100%) scale(0.8)',
                    transformOrigin: 'bottom center',
                  }}
                >
                  {/* Static Label Box */}
                  <div className="bg-orange text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md border border-white whitespace-nowrap mb-0.5 flex items-center gap-1">
                    <span>{currentPin.label}</span>
                  </div>

                  {/* Location Arrow Marker pointing directly at room location */}
                  <div className="w-5 h-5 text-orange drop-shadow-md">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
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

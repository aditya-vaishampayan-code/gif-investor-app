export default function Frame({ wide = false, className = '', children }) {
  return (
    <div className="flex justify-center bg-white overflow-x-hidden" style={{ minHeight: '100dvh' }}>
      <div className={`w-full ${wide ? 'max-w-[960px]' : 'max-w-[390px]'} relative`} style={{ minHeight: '100dvh' }}>
        <div className="absolute inset-0 opacity-35 pointer-events-none" style={{ background: 'var(--stripe-gradient)' }} />
        <div className={`relative z-[1] ${className}`} style={{ minHeight: '100dvh', background: 'rgba(255,255,255,0.68)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

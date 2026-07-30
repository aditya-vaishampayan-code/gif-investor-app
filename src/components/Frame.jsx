export default function Frame({ wide = false, className = '', children }) {
  return (
    <div className="min-h-screen flex justify-center bg-white">
      <div className="fixed inset-0 opacity-35 pointer-events-none" style={{ background: 'var(--stripe-gradient)' }} />
      <div className={`w-full ${wide ? 'max-w-[960px]' : 'max-w-[390px]'} min-h-screen relative z-[1] overflow-x-hidden ${className}`}
           style={{ background: 'rgba(255,255,255,0.68)' }}>
        {children}
      </div>
    </div>
  )
}

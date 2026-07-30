export default function Frame({ wide = false, className = '', children }) {
  return (
    <div className="min-h-screen flex justify-center bg-ink">
      <div className={`w-full ${wide ? 'max-w-[960px]' : 'max-w-[390px]'} min-h-screen bg-bg relative overflow-x-hidden ${className}`}>
        {children}
      </div>
    </div>
  )
}

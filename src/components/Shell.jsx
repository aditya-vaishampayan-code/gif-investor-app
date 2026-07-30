import { Link } from 'react-router-dom'

export default function Shell({ title, back, children }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-ink/90 backdrop-blur border-b border-surface">
        <div className="max-w-md mx-auto flex items-center h-14 px-4">
          {back && <Link to={back} className="text-gold mr-3 text-lg" aria-label="Back">←</Link>}
          <h1 className="font-bold tracking-wide text-fog">{title}</h1>
        </div>
      </header>
      <main className="max-w-md mx-auto px-4 py-5">{children}</main>
    </div>
  )
}

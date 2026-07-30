import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/dataService'

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    try {
      login({ name: form.name, email: form.email })
      nav('/')
    } catch (err) {
      setError(err.message)
    }
  }

  const field = 'w-full rounded-xl bg-surface border border-white/10 px-4 py-3 text-fog placeholder:text-fog/40 focus:outline-none focus:border-gold'

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-md mx-auto px-6">
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">💼</div>
        <h1 className="text-3xl font-extrabold text-gold tracking-wide">GIF Investor</h1>
        <p className="text-fog/60 mt-2">Sign in with your GIF account to start investing.</p>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <input className={field} placeholder="Full name" value={form.name} onChange={set('name')} />
        <input className={field} type="email" placeholder="Email" value={form.email} onChange={set('email')} />
        <input className={field} type="password" placeholder="Password" value={form.password} onChange={set('password')} />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button type="submit" className="w-full rounded-xl bg-gold text-ink font-bold py-3 active:scale-95 transition">
          Enter the Forum
        </button>
      </form>
      <p className="text-fog/30 text-xs text-center mt-6">Demo build — any credentials work.</p>
    </div>
  )
}

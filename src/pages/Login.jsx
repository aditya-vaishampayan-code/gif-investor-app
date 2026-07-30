import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import { login } from '../services/dataService'

const field =
  'w-full py-3.5 border-0 border-b border-ink/18 bg-transparent text-[15px] text-ink focus:outline-none focus:border-orange mb-4'

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please complete all fields.')
      return
    }
    try {
      login({ name: form.name.trim(), email: form.email.trim() })
      nav('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Frame className="flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-8 pt-12 pb-10">
        <p className="text-[11px] font-semibold text-orange uppercase mb-5" style={{ letterSpacing: '0.16em' }}>
          Global Impact Forum II
        </p>
        <h1 className="font-display text-[34px] font-bold text-ink mb-3.5" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Every great institution begins with a single conversation.
        </h1>
        <p className="text-sm text-ink/50 mb-11" style={{ lineHeight: 1.65 }}>
          Log in to review the shortlist and allocate your investment interest.
        </p>
        <form onSubmit={submit}>
          <input className={field} placeholder="Full name" value={form.name} onChange={set('name')} />
          <input className={field} type="email" placeholder="Email address" value={form.email} onChange={set('email')} />
          <input className={`${field} mb-2`} type="password" placeholder="Password" value={form.password} onChange={set('password')} />
          {error && <p className="text-[13px] text-orange py-2">{error}</p>}
          <button type="submit"
                  className="mt-7 w-full bg-orange text-white py-[17px] font-display font-bold text-[15px]"
                  style={{ letterSpacing: '0.04em' }}>
            Start Investing
          </button>
        </form>
      </div>
      <div className="px-8 py-[18px] border-t border-ink/8">
        <p className="text-[11px] text-ink/30" style={{ lineHeight: 1.6 }}>
          Demo build — any credentials accepted. Data stored locally, not transmitted.
        </p>
      </div>
    </Frame>
  )
}

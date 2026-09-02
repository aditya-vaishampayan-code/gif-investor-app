import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import { login, register } from '../services/dataService'

const field =
  'w-full py-3 px-3.5 rounded-[10px] border border-ink/15 bg-white text-[15px] text-ink placeholder:text-ink/35 focus:outline-none focus:border-orange disabled:opacity-50'

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', company: '', email: '', password: '' })
  const [mode, setMode] = useState('register')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setError('')
  }

  const submit = async (e) => {
    e.preventDefault()
    const missingRegistrationField = mode === 'register' && (!form.name.trim() || !form.company.trim())
    if (missingRegistrationField || !form.email.trim() || !form.password.trim()) {
      setError('Please complete all required fields.')
      return
    }
    setError('')
    setLoading(true)

    try {
      if (mode === 'register') {
        await register(form)
      } else {
        await login({ email: form.email, password: form.password })
      }
      nav('/')
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Frame className="flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(165deg, #EF4E3D 0%, #6591B0 55%, #4B546B 100%)',
        }}
      />
      <img
        src="/logo-lockup-white.png"
        alt="Global Impact Forum"
        className="absolute w-[217px] h-[66px]"
        style={{ left: 3, top: 59 }}
      />

      <div className="flex-1 flex flex-col px-6 pt-[135px] pb-8">
        <p className="font-body font-regular text-[12px] text-white/80 uppercase mb-4" style={{ letterSpacing: '0.14em' }}>
          Global Impact Forum – Edition II
        </p>
        <h1 className="font-display text-[34px] font-medium text-white mb-3" style={{ lineHeight: 1.15, letterSpacing: '-0.01em' }}>
          Every great institution begins with a single conversation.
        </h1>
        <p className="font-body font-normal text-[12px] text-white/85 mb-7" style={{ lineHeight: 1.5 }}>
          {mode === 'register'
            ? 'Create your account to review the shortlist and allocate your investment interest.'
            : 'Log in to see your meetings and investment ratings.'}
        </p>

        <form onSubmit={submit} className="bg-white rounded-[16px] p-5 shadow-xl">
          <div className="grid grid-cols-2 gap-1 rounded-[10px] bg-ink/5 p-1 mb-5">
            {['register', 'login'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => switchMode(tab)}
                disabled={loading}
                className={`rounded-[8px] py-2 text-[13px] font-semibold capitalize transition-colors ${mode === tab ? 'bg-white text-ink shadow-sm' : 'text-ink/50'}`}
              >
                {tab === 'login' ? 'Log in' : 'Register'}
              </button>
            ))}
          </div>

          {mode === 'register' && (
            <>
              <label className="block text-[13px] font-semibold text-ink mb-1.5">Full Name*</label>
              <input
                className={`${field} mb-4`}
                placeholder="e.g Raj Devayani"
                value={form.name}
                onChange={set('name')}
                disabled={loading}
              />

              <label className="block text-[13px] font-semibold text-ink mb-1.5">Company / Organization*</label>
              <input
                className={`${field} mb-4`}
                placeholder="e.g. Acme Capital / Angel Network"
                value={form.company}
                onChange={set('company')}
                disabled={loading}
              />
            </>
          )}

          <label className="block text-[13px] font-semibold text-ink mb-1.5">Email id*</label>
          <input
            className={`${field} mb-4`}
            type="email"
            placeholder="rajdev@abc.com"
            value={form.email}
            onChange={set('email')}
            disabled={loading}
          />

          <label className="block text-[13px] font-semibold text-ink mb-1.5">Password*</label>
          <input
            className={`${field} mb-4`}
            type="password"
            placeholder="••••••••••"
            value={form.password}
            onChange={set('password')}
            disabled={loading}
          />

          {error && <p className="text-[13px] font-medium text-orange py-1 mb-1">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full text-white py-[15px] rounded-[14px] font-display font-bold text-[15px] shadow-lg transition-opacity active:opacity-90 disabled:opacity-60"
            style={{
              letterSpacing: '0.02em',
              background: 'linear-gradient(180deg, #F2604F 0%, #EF4E3D 45%, #C33017 100%)',
            }}
          >
            {loading ? 'Please wait...' : mode === 'register' ? 'Create account' : 'Log in'}
          </button>
        </form>
      </div>

      <div className="pb-6 text-center">
        <p className="font-body font-normal text-[9px] text-white/70">Copyright @ 2026</p>
      </div>
    </Frame>
  )
}

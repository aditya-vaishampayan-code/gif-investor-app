import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import { login } from '../services/dataService'

const field =
  'w-full py-3 px-3.5 rounded-[10px] border border-ink/15 bg-white text-[15px] text-ink placeholder:text-ink/35 focus:outline-none focus:border-orange'

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please complete all fields.')
      return
    }
    if (!agreed) {
      setError('Please agree to the Terms and Conditions.')
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
    <Frame className="flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(165deg, #EF4E3D 0%, #E85A45 24%, #B97270 44%, #7C87A0 64%, #6591B0 82%, #4B546B 100%)',
        }}
      />

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(165deg, #EF4E3D 0%, #E85A45 24%, #B97270 44%, #7C87A0 64%, #6591B0 82%, #4B546B 100%)',
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
          Log in to review the shortlist and allocate your investment interest.
        </p>

        <form onSubmit={submit} className="bg-white rounded-[22px] p-5 shadow-xl">
          <label className="block text-[13px] font-semibold text-ink mb-1.5">Full Name*</label>
          <input className={`${field} mb-4`} placeholder="e.g Raj Devayani" value={form.name} onChange={set('name')} />

          <label className="block text-[13px] font-semibold text-ink mb-1.5">Email id</label>
          <input className={`${field} mb-4`} type="email" placeholder="rajdev@abc.com" value={form.email} onChange={set('email')} />

          <label className="block text-[13px] font-semibold text-ink mb-1.5">Password</label>
          <input className={`${field} mb-4`} type="password" placeholder="••••••••••" value={form.password} onChange={set('password')} />

          <label className="flex items-center gap-2 mb-2 text-[13px] text-ink/70">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            Agree all the Terms and Conditions
          </label>

          {error && <p className="text-[13px] text-orange py-1">{error}</p>}

          <button
            type="submit"
            className="mt-3 w-full text-white py-[15px] rounded-[14px] font-display font-bold text-[15px] shadow-lg"
            style={{
              letterSpacing: '0.02em',
              background: 'linear-gradient(180deg, #F2604F 0%, #EF4E3D 45%, #C33017 100%)',
            }}
          >
            Start Investing
          </button>
        </form>
      </div>

      <div className="pb-6 text-center">
        <p className="font-body font-normal text-[9px] text-white/70">Copyright @ 2026</p>
      </div>
    </Frame>
  )
}
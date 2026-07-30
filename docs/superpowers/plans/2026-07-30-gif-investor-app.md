# GIF Investor Interest App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mobile-first React web app where GIF event attendees browse 10 mock startups and lock in a 1–10 investment-interest rating via a money-stacking slider, with a mock organizer dashboard at /admin.

**Architecture:** Vite + React SPA. All persistence in localStorage behind one `dataService` module (swap point for the future real backend). Static mock startup data. React Router for screens; Framer Motion for money-stack/lock-in animations.

**Tech Stack:** Vite, React 18+, react-router-dom, Tailwind CSS v4 (`@tailwindcss/vite`), framer-motion, Vitest for unit tests.

## Global Constraints

- Repo root: `C:\Users\Siddhant\Desktop\gif-investor-app` (already a git repo with spec committed). App lives at repo root.
- Ratings are permanent: once locked, `saveRating` for the same startup must throw; UI must never offer editing.
- Rating scale 1–10; mock money mapping: `MONEY_BY_SCORE = [0, 50, 100, 175, 275, 400, 550, 700, 850, 925, 1000]` (index = score, values in $K; 1 → $50K, 10 → $1M).
- All localStorage access ONLY inside `src/services/dataService.js`. localStorage keys: `gif_user`, `gif_ratings`.
- Dark premium theme: background `#0B0F14`, surface `#141B23`, gold accent `#D4AF37`, green accent `#22C55E`, text `#E8EDF2`. Phone-first (design at 390px width); /admin also comfortable at desktop widths.
- Route map: `/login`, `/` (grid), `/startup/:id` (detail), `/rate/:id` (rating), `/portfolio`, `/admin`. All routes except `/login` and `/admin` redirect to `/login` when no user is stored.
- Run all commands from repo root. Verify with `npm test -- --run` (Vitest) and `npm run build`.

---

### Task 1: Project scaffold + tooling

**Files:**
- Create: Vite React scaffold at repo root (`package.json`, `index.html`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `src/index.css`)
- Create: `.gitignore` (scaffold provides)

**Interfaces:**
- Produces: working `npm run dev`, `npm run build`, `npm test` (Vitest configured), Tailwind v4 active via `@import "tailwindcss"` in `src/index.css`.

- [ ] **Step 1: Scaffold Vite React app into the existing repo root**

```bash
cd /c/Users/Siddhant/Desktop/gif-investor-app
npm create vite@latest . -- --template react
npm install
npm install react-router-dom framer-motion
npm install -D tailwindcss @tailwindcss/vite vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
```

(If `npm create vite` refuses a non-empty dir, scaffold into `tmp-scaffold`, move its contents up, delete `tmp-scaffold`. Do not overwrite `docs/` or `.git/`.)

- [ ] **Step 2: Configure Vite for Tailwind + Vitest**

`vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
```

Replace `src/index.css` entirely with:

```css
@import "tailwindcss";

@theme {
  --color-ink: #0B0F14;
  --color-surface: #141B23;
  --color-gold: #D4AF37;
  --color-mint: #22C55E;
  --color-fog: #E8EDF2;
}

body {
  background-color: var(--color-ink);
  color: var(--color-fog);
  font-family: ui-sans-serif, system-ui, sans-serif;
}
```

Add to `package.json` scripts: `"test": "vitest"`.

- [ ] **Step 3: Minimal App placeholder**

`src/App.jsx`:

```jsx
export default function App() {
  return <div className="p-6 text-gold text-xl font-bold">GIF Investor</div>
}
```

Delete `src/App.css` and its import; delete unused scaffold assets.

- [ ] **Step 4: Verify build and dev**

Run: `npm run build` → succeeds. Run `npm run dev` briefly (or rely on build) — no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite React app with Tailwind v4, Vitest, router, framer-motion"
```

---

### Task 2: Mock startup data

**Files:**
- Create: `src/data/startups.js`

**Interfaces:**
- Produces: `export const STARTUPS` — array of 10 objects `{ id, name, sector, tagline, description, logoEmoji, bannerGradient, founders: [{name, role, avatarEmoji}], metrics: {stage, ask, traction}, seed: {avgScore, raterCount} }`. `id` is a kebab-case string. `bannerGradient` is a Tailwind gradient class string. Also `export const MONEY_BY_SCORE = [0, 50, 100, 175, 275, 400, 550, 700, 850, 925, 1000]` (in $K) and `formatMoney(k)` returning `$###K` below 1000 and `$#M`/`$#.#M` at or above.

- [ ] **Step 1: Write the data file**

`src/data/startups.js` — full content (10 startups, plausible fictional; emojis as logos/avatars so no image assets needed):

```js
export const MONEY_BY_SCORE = [0, 50, 100, 175, 275, 400, 550, 700, 850, 925, 1000]

export const formatMoney = (k) =>
  k >= 1000 ? `$${(k / 1000).toFixed(k % 1000 === 0 ? 0 : 1)}M` : `$${k}K`

export const STARTUPS = [
  { id: 'nimbusgrid', name: 'NimbusGrid', sector: 'CleanTech', logoEmoji: '⚡',
    bannerGradient: 'from-emerald-900 to-teal-700',
    tagline: 'Peer-to-peer solar energy trading for apartment blocks.',
    description: 'NimbusGrid lets residential buildings pool rooftop solar and trade surplus power with neighbors through a blockchain-free, utility-approved marketplace. Pilots in 3 cities show 22% average bill reduction.',
    founders: [
      { name: 'Priya Raman', role: 'CEO', avatarEmoji: '👩🏽‍💼' },
      { name: 'Jonas Weber', role: 'CTO', avatarEmoji: '👨🏼‍💻' },
    ],
    metrics: { stage: 'Series A', ask: '$4M', traction: '11,000 households · $1.2M ARR' },
    seed: { avgScore: 7.2, raterCount: 41 } },
  { id: 'medloop', name: 'MedLoop', sector: 'HealthTech', logoEmoji: '🩺',
    bannerGradient: 'from-sky-900 to-cyan-700',
    tagline: 'AI triage nurse for overloaded clinics.',
    description: 'MedLoop screens incoming patient messages, drafts responses, and routes urgent cases to doctors in seconds. HIPAA-grade, deployed in 40 clinics with 4.8/5 clinician satisfaction.',
    founders: [
      { name: 'Dr. Sofia Alvarez', role: 'CEO', avatarEmoji: '👩🏻‍⚕️' },
      { name: 'Ken Osei', role: 'CTO', avatarEmoji: '👨🏿‍💻' },
    ],
    metrics: { stage: 'Seed', ask: '$2.5M', traction: '40 clinics · 90K triages/mo' },
    seed: { avgScore: 8.1, raterCount: 47 } },
  { id: 'cratewise', name: 'CrateWise', sector: 'Logistics', logoEmoji: '📦',
    bannerGradient: 'from-amber-900 to-orange-700',
    tagline: 'Reusable smart packaging as a service.',
    description: 'CrateWise replaces cardboard with tracked, foldable smart crates for e-commerce returns loops. Retailers cut packaging spend 35% and hit ESG targets without changing their carriers.',
    founders: [ { name: 'Lena Kovač', role: 'CEO', avatarEmoji: '👩🏼‍💼' } ],
    metrics: { stage: 'Series A', ask: '$6M', traction: '2.1M shipments · 18 retail partners' },
    seed: { avgScore: 6.4, raterCount: 39 } },
  { id: 'fluentbee', name: 'FluentBee', sector: 'EdTech', logoEmoji: '🐝',
    bannerGradient: 'from-yellow-900 to-amber-600',
    tagline: 'Language practice with AI voice partners that feel human.',
    description: 'FluentBee pairs learners with lifelike AI conversation partners tuned to their level, accent goals, and interests. 62% of weekly actives converse 5+ days a week.',
    founders: [
      { name: 'Marco Bellini', role: 'CEO', avatarEmoji: '👨🏻‍💼' },
      { name: 'Aiko Tanaka', role: 'Head of AI', avatarEmoji: '👩🏻‍🔬' },
    ],
    metrics: { stage: 'Seed', ask: '$1.8M', traction: '310K MAU · $95K MRR' },
    seed: { avgScore: 6.9, raterCount: 44 } },
  { id: 'terraform-farms', name: 'TerraForm Farms', sector: 'AgTech', logoEmoji: '🌱',
    bannerGradient: 'from-lime-900 to-green-700',
    tagline: 'Container farms that pay for themselves in 30 months.',
    description: 'TerraForm builds automated shipping-container farms for restaurants and grocers, with yield-guaranteed leasing. Software-controlled climate delivers 12 harvests a year.',
    founders: [ { name: 'Ade Balogun', role: 'CEO', avatarEmoji: '👨🏿‍🌾' }, { name: 'Ingrid Holm', role: 'COO', avatarEmoji: '👩🏼‍🔧' } ],
    metrics: { stage: 'Series B', ask: '$12M', traction: '140 farms · $6.8M ARR' },
    seed: { avgScore: 5.8, raterCount: 36 } },
  { id: 'paylattice', name: 'PayLattice', sector: 'FinTech', logoEmoji: '💳',
    bannerGradient: 'from-indigo-900 to-violet-700',
    tagline: 'One API for cross-border payroll in 60 currencies.',
    description: 'PayLattice gives mid-size companies compliant international payroll with same-day FX and local tax filings, replacing four vendors with one integration.',
    founders: [ { name: 'Sarah Kim', role: 'CEO', avatarEmoji: '👩🏻‍💼' }, { name: 'Tomás Silva', role: 'CTO', avatarEmoji: '👨🏽‍💻' } ],
    metrics: { stage: 'Series A', ask: '$8M', traction: '$210M processed · 380 companies' },
    seed: { avgScore: 7.8, raterCount: 45 } },
  { id: 'quietdesk', name: 'QuietDesk', sector: 'FutureOfWork', logoEmoji: '🎧',
    bannerGradient: 'from-slate-800 to-zinc-600',
    tagline: 'Bookable focus pods in transit hubs and malls.',
    description: 'QuietDesk operates soundproof work pods bookable by the minute in airports, stations, and malls. 78% utilization at flagship sites; hardware margin positive since month nine.',
    founders: [ { name: 'Emil Novak', role: 'CEO', avatarEmoji: '👨🏻‍💼' } ],
    metrics: { stage: 'Seed', ask: '$3M', traction: '92 pods · 78% utilization' },
    seed: { avgScore: 5.2, raterCount: 33 } },
  { id: 'aurorasense', name: 'AuroraSense', sector: 'DeepTech', logoEmoji: '🛰️',
    bannerGradient: 'from-purple-950 to-fuchsia-800',
    tagline: 'Satellite methane detection for insurers and regulators.',
    description: 'AuroraSense fuses public satellite feeds with proprietary ML to detect methane leaks within 24 hours, sold as alerts to insurers, lenders, and environmental regulators.',
    founders: [ { name: 'Dr. Hana Yusuf', role: 'CEO', avatarEmoji: '👩🏾‍🔬' }, { name: 'Viktor Lindqvist', role: 'Chief Scientist', avatarEmoji: '👨🏼‍🔬' } ],
    metrics: { stage: 'Series A', ask: '$7M', traction: '14 enterprise contracts · $2.3M ARR' },
    seed: { avgScore: 7.5, raterCount: 40 } },
  { id: 'snackcircle', name: 'SnackCircle', sector: 'ConsumerTech', logoEmoji: '🥡',
    bannerGradient: 'from-rose-900 to-red-700',
    tagline: 'Group ordering that splits the bill before you order.',
    description: 'SnackCircle lets offices and friend groups build one shared cart with per-person payment upfront — no more chasing transfers. Restaurants see 31% larger average orders.',
    founders: [ { name: 'Dana Cohen', role: 'CEO', avatarEmoji: '👩🏻‍🍳' }, { name: 'Ravi Menon', role: 'CTO', avatarEmoji: '👨🏽‍💻' } ],
    metrics: { stage: 'Seed', ask: '$2M', traction: '58K orders/mo · 900 restaurants' },
    seed: { avgScore: 4.9, raterCount: 31 } },
  { id: 'vaultic', name: 'Vaultic', sector: 'CyberSec', logoEmoji: '🔐',
    bannerGradient: 'from-stone-900 to-neutral-700',
    tagline: 'Passwordless access control for factories and warehouses.',
    description: 'Vaultic replaces shared PINs and badge cards on industrial systems with phone-based passkeys and offline-capable verification, cutting incident response time 60%.',
    founders: [ { name: 'Nikolai Petrov', role: 'CEO', avatarEmoji: '👨🏻‍🔧' }, { name: 'Fatima Zahra', role: 'CPO', avatarEmoji: '👩🏽‍💼' } ],
    metrics: { stage: 'Series A', ask: '$5M', traction: '75 industrial sites · $1.7M ARR' },
    seed: { avgScore: 6.1, raterCount: 37 } },
]
```

- [ ] **Step 2: Sanity check via build**

Run: `npm run build` → succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/data/startups.js
git commit -m "feat: add mock startup dataset with money scale and seeded aggregates"
```

---

### Task 3: dataService (TDD)

**Files:**
- Create: `src/services/dataService.js`
- Test: `src/services/dataService.test.js`

**Interfaces:**
- Consumes: `STARTUPS` from `src/data/startups.js` (for `getAggregates`).
- Produces:
  - `login({ name, email })` → stores `{ name, email, loginAt: ISOString }` under key `gif_user`, returns the user object. Any non-empty name/email accepted; throws `Error('name and email required')` otherwise.
  - `getUser()` → user object or `null`.
  - `logout()` → removes `gif_user`.
  - `saveRating(startupId, score)` → stores `{ score, lockedAt: ISOString }` under key `gif_ratings` (object keyed by startupId). Throws `Error('rating already locked')` if the id already has a rating; throws `Error('score must be 1-10')` for out-of-range/non-integer.
  - `getRatings()` → `{ [startupId]: { score, lockedAt } }` (empty object default).
  - `getRating(startupId)` → rating object or `null`.
  - `getAggregates()` → array (same order as STARTUPS) of `{ id, name, avgScore, raterCount }`, blending seed data with the local user's rating: if user rated, `raterCount = seed.raterCount + 1`, `avgScore = (seed.avgScore * seed.raterCount + score) / (seed.raterCount + 1)` rounded to 1 decimal; else seed values.

- [ ] **Step 1: Write the failing tests**

`src/services/dataService.test.js`:

```js
import { beforeEach, describe, expect, it } from 'vitest'
import { login, getUser, logout, saveRating, getRatings, getRating, getAggregates } from './dataService'
import { STARTUPS } from '../data/startups'

beforeEach(() => localStorage.clear())

describe('auth (mock FPD capture)', () => {
  it('stores name, email and loginAt on login', () => {
    const u = login({ name: 'Sid', email: 'sid@example.com' })
    expect(u.name).toBe('Sid')
    expect(getUser().email).toBe('sid@example.com')
    expect(new Date(getUser().loginAt).getTime()).not.toBeNaN()
  })
  it('rejects empty credentials', () => {
    expect(() => login({ name: '', email: 'x@y.z' })).toThrow('name and email required')
  })
  it('logout clears user', () => {
    login({ name: 'Sid', email: 'sid@example.com' })
    logout()
    expect(getUser()).toBeNull()
  })
})

describe('ratings', () => {
  it('saves and reads a rating', () => {
    saveRating('medloop', 8)
    expect(getRating('medloop').score).toBe(8)
    expect(getRatings().medloop.score).toBe(8)
  })
  it('locks ratings permanently', () => {
    saveRating('medloop', 8)
    expect(() => saveRating('medloop', 3)).toThrow('rating already locked')
    expect(getRating('medloop').score).toBe(8)
  })
  it('validates score range', () => {
    expect(() => saveRating('medloop', 0)).toThrow('score must be 1-10')
    expect(() => saveRating('medloop', 11)).toThrow('score must be 1-10')
    expect(() => saveRating('medloop', 5.5)).toThrow('score must be 1-10')
  })
})

describe('aggregates', () => {
  it('returns seed values when user has not rated', () => {
    const med = getAggregates().find((a) => a.id === 'medloop')
    const seed = STARTUPS.find((s) => s.id === 'medloop').seed
    expect(med.avgScore).toBe(seed.avgScore)
    expect(med.raterCount).toBe(seed.raterCount)
  })
  it('blends the local rating into the aggregate', () => {
    const seed = STARTUPS.find((s) => s.id === 'medloop').seed
    saveRating('medloop', 10)
    const med = getAggregates().find((a) => a.id === 'medloop')
    expect(med.raterCount).toBe(seed.raterCount + 1)
    const expected = Math.round(((seed.avgScore * seed.raterCount + 10) / (seed.raterCount + 1)) * 10) / 10
    expect(med.avgScore).toBe(expected)
  })
})
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `npm test -- --run src/services/dataService.test.js`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement dataService**

`src/services/dataService.js`:

```js
import { STARTUPS } from '../data/startups'

const USER_KEY = 'gif_user'
const RATINGS_KEY = 'gif_ratings'

const read = (key, fallback) => {
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : fallback
}

export function login({ name, email }) {
  if (!name?.trim() || !email?.trim()) throw new Error('name and email required')
  const user = { name: name.trim(), email: email.trim(), loginAt: new Date().toISOString() }
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return user
}

export const getUser = () => read(USER_KEY, null)
export const logout = () => localStorage.removeItem(USER_KEY)

export function saveRating(startupId, score) {
  if (!Number.isInteger(score) || score < 1 || score > 10) throw new Error('score must be 1-10')
  const ratings = read(RATINGS_KEY, {})
  if (ratings[startupId]) throw new Error('rating already locked')
  ratings[startupId] = { score, lockedAt: new Date().toISOString() }
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings))
  return ratings[startupId]
}

export const getRatings = () => read(RATINGS_KEY, {})
export const getRating = (startupId) => getRatings()[startupId] ?? null

export function getAggregates() {
  const ratings = getRatings()
  return STARTUPS.map(({ id, name, seed }) => {
    const mine = ratings[id]
    if (!mine) return { id, name, avgScore: seed.avgScore, raterCount: seed.raterCount }
    const raterCount = seed.raterCount + 1
    const avgScore = Math.round(((seed.avgScore * seed.raterCount + mine.score) / raterCount) * 10) / 10
    return { id, name, avgScore, raterCount }
  })
}
```

- [ ] **Step 4: Run tests, verify pass**

Run: `npm test -- --run src/services/dataService.test.js`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add src/services
git commit -m "feat: dataService with mock auth, locked ratings, blended aggregates (TDD)"
```

---

### Task 4: Router shell, auth guard, Login screen

**Files:**
- Modify: `src/App.jsx` (replace placeholder)
- Modify: `src/main.jsx` (wrap in BrowserRouter)
- Create: `src/pages/Login.jsx`
- Create: `src/components/Shell.jsx`
- Create: stub pages `src/pages/Grid.jsx`, `src/pages/Detail.jsx`, `src/pages/Rate.jsx`, `src/pages/Portfolio.jsx`, `src/pages/Admin.jsx`

**Interfaces:**
- Consumes: `login`, `getUser` from dataService.
- Produces: `<App/>` with routes `/login`, `/`, `/startup/:id`, `/rate/:id`, `/portfolio`, `/admin`; `<RequireUser>` wrapper redirecting to `/login` when `getUser()` is null; `Shell` layout component `({ title, back, children })` rendering a sticky header (back link to `back` when given) over a `max-w-md mx-auto` column.

- [ ] **Step 1: main.jsx with router**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 2: Shell component**

`src/components/Shell.jsx`:

```jsx
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
```

- [ ] **Step 3: Login page**

`src/pages/Login.jsx`:

```jsx
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
```

- [ ] **Step 4: App.jsx with routes + guard**

```jsx
import { Navigate, Route, Routes } from 'react-router-dom'
import { getUser } from './services/dataService'
import Login from './pages/Login'
import Grid from './pages/Grid'
import Detail from './pages/Detail'
import Rate from './pages/Rate'
import Portfolio from './pages/Portfolio'
import Admin from './pages/Admin'

function RequireUser({ children }) {
  return getUser() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireUser><Grid /></RequireUser>} />
      <Route path="/startup/:id" element={<RequireUser><Detail /></RequireUser>} />
      <Route path="/rate/:id" element={<RequireUser><Rate /></RequireUser>} />
      <Route path="/portfolio" element={<RequireUser><Portfolio /></RequireUser>} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
```

Create temporary stub pages so the app compiles — each of `Grid.jsx`, `Detail.jsx`, `Rate.jsx`, `Portfolio.jsx`, `Admin.jsx` in `src/pages/` as:

```jsx
export default function Grid() { return <div className="p-6">Grid</div> }
```

(function name matching the file; these are replaced in Tasks 5–8).

- [ ] **Step 5: Verify + commit**

Run: `npm run build` → succeeds. Manually: dev server → `/` redirects to `/login`; logging in navigates to `/` stub.

```bash
git add -A
git commit -m "feat: router shell, auth guard, mock login with FPD capture"
```

---

### Task 5: Startup grid (home)

**Files:**
- Modify: `src/pages/Grid.jsx` (replace stub)

**Interfaces:**
- Consumes: `STARTUPS`, `getRatings`, `getUser` from data/dataService; `Shell`.
- Produces: grid page linking each card to `/startup/:id`; header link to `/portfolio`.

- [ ] **Step 1: Implement Grid**

```jsx
import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import { STARTUPS } from '../data/startups'
import { getRatings, getUser } from '../services/dataService'

export default function Grid() {
  const ratings = getRatings()
  const rated = Object.keys(ratings).length
  const user = getUser()

  return (
    <Shell title="GIF Investor">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-fog/60 text-sm">Welcome, {user?.name?.split(' ')[0]}</p>
          <p className="text-gold font-bold">{rated}/{STARTUPS.length} startups rated</p>
        </div>
        <Link to="/portfolio" className="rounded-full border border-gold/40 text-gold text-sm px-4 py-2">
          My Portfolio
        </Link>
      </div>
      <div className="h-1.5 rounded-full bg-surface mb-6">
        <div className="h-1.5 rounded-full bg-gradient-to-r from-gold to-mint transition-all"
             style={{ width: `${(rated / STARTUPS.length) * 100}%` }} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {STARTUPS.map((s) => {
          const r = ratings[s.id]
          return (
            <Link key={s.id} to={`/startup/${s.id}`}
                  className={`rounded-2xl bg-surface p-4 border ${r ? 'border-mint/40' : 'border-white/5'} active:scale-95 transition`}>
              <div className={`h-16 rounded-xl bg-gradient-to-br ${s.bannerGradient} flex items-center justify-center text-3xl mb-3`}>
                {s.logoEmoji}
              </div>
              <p className="font-bold text-fog leading-tight">{s.name}</p>
              <p className="text-fog/50 text-xs mt-0.5">{s.sector}</p>
              {r && (
                <span className="inline-block mt-2 text-xs font-bold text-mint bg-mint/10 rounded-full px-2 py-0.5">
                  🔒 Locked · {r.score}/10
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </Shell>
  )
}
```

- [ ] **Step 2: Verify + commit**

`npm run build` → succeeds; dev check: grid renders 10 cards, progress bar at 0.

```bash
git add src/pages/Grid.jsx
git commit -m "feat: startup grid with progress and locked badges"
```

---

### Task 6: Startup detail page

**Files:**
- Modify: `src/pages/Detail.jsx` (replace stub)

**Interfaces:**
- Consumes: `STARTUPS`, `getRating`; `Shell`.
- Produces: detail page; CTA links to `/rate/:id` when unrated, shows locked score panel when rated.

- [ ] **Step 1: Implement Detail**

```jsx
import { Link, useParams, Navigate } from 'react-router-dom'
import Shell from '../components/Shell'
import { STARTUPS } from '../data/startups'
import { getRating } from '../services/dataService'

export default function Detail() {
  const { id } = useParams()
  const s = STARTUPS.find((x) => x.id === id)
  if (!s) return <Navigate to="/" replace />
  const r = getRating(id)

  return (
    <Shell title={s.name} back="/">
      <div className={`rounded-2xl bg-gradient-to-br ${s.bannerGradient} h-36 flex items-center justify-center text-6xl mb-4`}>
        {s.logoEmoji}
      </div>
      <div className="flex gap-2 mb-3">
        <span className="text-xs bg-surface rounded-full px-3 py-1 text-fog/70">{s.sector}</span>
        <span className="text-xs bg-surface rounded-full px-3 py-1 text-gold">{s.metrics.stage}</span>
      </div>
      <p className="text-lg font-bold text-fog mb-2">{s.tagline}</p>
      <p className="text-fog/70 text-sm leading-relaxed mb-6">{s.description}</p>

      <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2">Founders</h2>
      <div className="space-y-2 mb-6">
        {s.founders.map((f) => (
          <div key={f.name} className="flex items-center gap-3 bg-surface rounded-xl p-3">
            <span className="text-3xl">{f.avatarEmoji}</span>
            <div>
              <p className="font-semibold text-fog text-sm">{f.name}</p>
              <p className="text-fog/50 text-xs">{f.role}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2">Traction</h2>
      <div className="grid grid-cols-2 gap-2 mb-8">
        <div className="bg-surface rounded-xl p-3">
          <p className="text-fog/50 text-xs">Ask</p>
          <p className="font-bold text-fog">{s.metrics.ask}</p>
        </div>
        <div className="bg-surface rounded-xl p-3">
          <p className="text-fog/50 text-xs">Traction</p>
          <p className="font-bold text-fog text-sm">{s.metrics.traction}</p>
        </div>
      </div>

      {r ? (
        <div className="rounded-xl border border-mint/40 bg-mint/10 p-4 text-center">
          <p className="text-mint font-bold">🔒 Interest locked: {r.score}/10</p>
          <p className="text-fog/50 text-xs mt-1">Ratings are final.</p>
        </div>
      ) : (
        <Link to={`/rate/${s.id}`}
              className="block w-full text-center rounded-xl bg-gold text-ink font-bold py-4 active:scale-95 transition">
          💰 Invest Interest
        </Link>
      )}
    </Shell>
  )
}
```

- [ ] **Step 2: Verify + commit**

`npm run build`; dev check on one startup.

```bash
git add src/pages/Detail.jsx
git commit -m "feat: startup detail page with founders, traction, and rate CTA"
```

---

### Task 7: Rating screen with money-stack animation

**Files:**
- Create: `src/components/MoneyStack.jsx`
- Modify: `src/pages/Rate.jsx` (replace stub)

**Interfaces:**
- Consumes: `MONEY_BY_SCORE`, `formatMoney`, `saveRating`, `getRating`; `Shell`; framer-motion.
- Produces: `MoneyStack({ score })` — renders `score` animated 💵 bill layers stacking bottom-up; `Rate` page with slider (1–10), live counter, confirm-then-lock flow navigating back to `/startup/:id` on success.

- [ ] **Step 1: MoneyStack component**

`src/components/MoneyStack.jsx`:

```jsx
import { AnimatePresence, motion } from 'framer-motion'

export default function MoneyStack({ score }) {
  return (
    <div className="relative h-44 flex items-end justify-center" aria-hidden>
      <AnimatePresence>
        {Array.from({ length: score }, (_, i) => (
          <motion.div
            key={i}
            initial={{ y: -80, opacity: 0, rotate: -8 + Math.random() * 16 }}
            animate={{ y: 0, opacity: 1, rotate: (i % 2 ? 1 : -1) * (2 + (i % 3)) }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 24 }}
            className="absolute text-4xl"
            style={{ bottom: i * 14 }}
          >
            💵
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Rate page**

`src/pages/Rate.jsx`:

```jsx
import { useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Shell from '../components/Shell'
import MoneyStack from '../components/MoneyStack'
import { MONEY_BY_SCORE, STARTUPS, formatMoney } from '../data/startups'
import { getRating, saveRating } from '../services/dataService'

export default function Rate() {
  const { id } = useParams()
  const nav = useNavigate()
  const s = STARTUPS.find((x) => x.id === id)
  const [score, setScore] = useState(5)
  const [confirming, setConfirming] = useState(false)
  const [locked, setLocked] = useState(false)

  if (!s) return <Navigate to="/" replace />
  if (getRating(id) && !locked) return <Navigate to={`/startup/${id}`} replace />

  const onSlide = (e) => {
    const v = Number(e.target.value)
    if (v !== score) navigator.vibrate?.(8)
    setScore(v)
    setConfirming(false)
  }

  const lockIn = () => {
    saveRating(id, score)
    navigator.vibrate?.([30, 40, 60])
    setLocked(true)
    setTimeout(() => nav(`/startup/${id}`), 1400)
  }

  if (locked) {
    return (
      <Shell title={s.name} back={`/startup/${id}`}>
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="text-center py-20">
          <div className="text-7xl mb-4">✅</div>
          <p className="text-2xl font-extrabold text-mint">INVESTED</p>
          <p className="text-fog/60 mt-2">{formatMoney(MONEY_BY_SCORE[score])} of interest locked in</p>
        </motion.div>
      </Shell>
    )
  }

  return (
    <Shell title={`Rate ${s.name}`} back={`/startup/${id}`}>
      <p className="text-center text-fog/60 text-sm mb-2">How likely are you to invest?</p>
      <p className="text-center text-5xl font-extrabold text-gold mb-1">{score}<span className="text-xl text-fog/40">/10</span></p>
      <p className="text-center text-mint font-bold text-lg mb-4">{formatMoney(MONEY_BY_SCORE[score])}</p>

      <MoneyStack score={score} />

      <input type="range" min="1" max="10" step="1" value={score} onChange={onSlide}
             aria-label="Investment interest from 1 to 10"
             className="w-full mt-6 accent-gold h-2" />
      <div className="flex justify-between text-xs text-fog/40 mt-1 mb-8">
        <span>Pass</span><span>All in</span>
      </div>

      {confirming ? (
        <div className="space-y-2">
          <p className="text-center text-fog/70 text-sm">Lock in <b className="text-gold">{score}/10</b>? This is final.</p>
          <button onClick={lockIn} className="w-full rounded-xl bg-mint text-ink font-bold py-4 active:scale-95 transition">
            🔒 Yes, Lock It In
          </button>
          <button onClick={() => setConfirming(false)} className="w-full rounded-xl bg-surface text-fog/70 py-3">
            Keep adjusting
          </button>
        </div>
      ) : (
        <button onClick={() => setConfirming(true)} className="w-full rounded-xl bg-gold text-ink font-bold py-4 active:scale-95 transition">
          Lock It In
        </button>
      )}
    </Shell>
  )
}
```

- [ ] **Step 3: Verify + commit**

`npm run build`; dev check: slider grows/shrinks the bill stack, counter updates, confirm → INVESTED animation → redirected detail shows locked panel; revisiting `/rate/:id` redirects away.

```bash
git add src/components/MoneyStack.jsx src/pages/Rate.jsx
git commit -m "feat: rating screen with money-stack slider and permanent lock-in"
```

---

### Task 8: Portfolio + Admin dashboard

**Files:**
- Modify: `src/pages/Portfolio.jsx`, `src/pages/Admin.jsx` (replace stubs)

**Interfaces:**
- Consumes: `getRatings`, `getAggregates`, `MONEY_BY_SCORE`, `formatMoney`, `STARTUPS`; `Shell`.

- [ ] **Step 1: Portfolio page**

`src/pages/Portfolio.jsx`:

```jsx
import Shell from '../components/Shell'
import { MONEY_BY_SCORE, STARTUPS, formatMoney } from '../data/startups'
import { getRatings } from '../services/dataService'

export default function Portfolio() {
  const ratings = getRatings()
  const rated = STARTUPS.filter((s) => ratings[s.id])
    .map((s) => ({ ...s, score: ratings[s.id].score }))
    .sort((a, b) => b.score - a.score)
  const totalK = rated.reduce((sum, s) => sum + MONEY_BY_SCORE[s.score], 0)
  const done = rated.length === STARTUPS.length

  return (
    <Shell title="My Portfolio" back="/">
      <div className="rounded-2xl bg-gradient-to-br from-surface to-ink border border-gold/30 p-5 text-center mb-6">
        <p className="text-fog/60 text-sm">{done ? '🎉 All 10 rated — total interest allocated' : `Interest allocated (${rated.length}/10 rated)`}</p>
        <p className="text-4xl font-extrabold text-gold mt-1">{formatMoney(totalK)}</p>
      </div>
      {rated.length === 0 && <p className="text-center text-fog/50">No investments yet — go rate some startups!</p>}
      <div className="space-y-2">
        {rated.map((s, i) => (
          <div key={s.id} className="flex items-center gap-3 bg-surface rounded-xl p-3">
            <span className="text-fog/40 font-bold w-5">{i + 1}</span>
            <span className="text-2xl">{s.logoEmoji}</span>
            <div className="flex-1">
              <p className="font-semibold text-fog text-sm">{s.name}</p>
              <p className="text-fog/50 text-xs">{s.sector}</p>
            </div>
            <div className="text-right">
              <p className="text-gold font-bold">{s.score}/10</p>
              <p className="text-mint text-xs">{formatMoney(MONEY_BY_SCORE[s.score])}</p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}
```

- [ ] **Step 2: Admin page**

`src/pages/Admin.jsx`:

```jsx
import Shell from '../components/Shell'
import { STARTUPS } from '../data/startups'
import { getAggregates } from '../services/dataService'

export default function Admin() {
  const rows = [...getAggregates()].sort((a, b) => b.avgScore - a.avgScore)
  const max = 10

  return (
    <Shell title="Organizer Dashboard">
      <p className="text-fog/50 text-sm mb-5">Live average investor interest per startup (demo data).</p>
      <div className="space-y-3 md:max-w-2xl">
        {rows.map((r, i) => {
          const s = STARTUPS.find((x) => x.id === r.id)
          return (
            <div key={r.id} className="bg-surface rounded-xl p-3">
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-semibold text-fog text-sm">
                  <span className="text-fog/40 mr-2">#{i + 1}</span>{s.logoEmoji} {r.name}
                </p>
                <p className="text-gold font-bold">{r.avgScore.toFixed(1)} <span className="text-fog/40 text-xs font-normal">· {r.raterCount} raters</span></p>
              </div>
              <div className="h-2.5 rounded-full bg-ink">
                <div className="h-2.5 rounded-full bg-gradient-to-r from-gold to-mint"
                     style={{ width: `${(r.avgScore / max) * 100}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </Shell>
  )
}
```

- [ ] **Step 3: Verify + commit**

`npm run build`; dev check both pages.

```bash
git add src/pages/Portfolio.jsx src/pages/Admin.jsx
git commit -m "feat: portfolio recap and organizer dashboard with blended aggregates"
```

---

### Task 9: End-to-end verification pass

**Files:** none new.

- [ ] **Step 1: Run full test suite** — `npm test -- --run` → all pass.
- [ ] **Step 2: Run `npm run build`** → succeeds.
- [ ] **Step 3: Browser verification at mobile viewport (390px)** — full journey: login → grid → detail → rate (slider animation) → confirm lock → locked badge on grid → portfolio totals → /admin aggregates reflect the rating. Check console for errors. Screenshot key screens for the user.
- [ ] **Step 4: Fix anything found, commit fixes.**
- [ ] **Step 5: Final commit** if any changes: `git add -A && git commit -m "chore: verification fixes"`.

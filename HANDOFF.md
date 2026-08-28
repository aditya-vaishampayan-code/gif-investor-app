# GIF Investor App — Handoff

## What this is
A mobile-first investor app for the Global Impact Forum II event. Attendees log in, browse the 6 Innovators startups (Innovators Gala), rate their investment interest in the 5 Meetings startups (1–10, converted to a mock dollar amount), and track their picks. Includes a live event hub (Gala, tickets w/ QR code, agenda timeline) and an admin leaderboard.

## Live links
- **Public app (attendees):** https://gif-investor-kyighyhoy-siddhantdey17-4431s-projects.vercel.app
- **Admin leaderboard:** same URL + `/admin` (e.g. `.../admin`) — shows live ratings ranked by average score
- **Production alias (may include admin route):** https://gif-investor-app.vercel.app

> Note: every `vercel --prod` deploy mints a new immutable URL. Re-deploying will produce a different link than the one above — see "Redeploying" below.

## Tech stack
- Vite + React 18 (SPA), React Router v7
- Tailwind CSS v4 (`@theme` tokens in `src/index.css` — brand colors, fonts)
- Framer Motion for transitions
- No backend — all data lives in the browser's `localStorage` via `src/services/dataService.js`
- Deployed on Vercel (`npx vercel --yes --prod`)

## Data model (localStorage only)
- `gif_user` — `{ name, email }`, set at login
- `gif_ratings` — `{ [startupId]: { score: 1-10, timestamp } }`
- Startup data is static, defined in `src/data/startups.js` (not user-editable)
- **Nothing is sent to a server.** Clearing browser storage / using a different device resets state. This is fine for a single-event demo but not for multi-device sync.

## Structure
```
src/
  pages/          One file per screen (Login, Grid/Tonight, Gala, Detail, Rate,
                   Tickets, Agenda, Portfolio, AncientMedicine, XYZ, Admin)
  components/     Frame (page shell), BottomNav, ProfileSheet, Logo, MoneyStack
  data/           startups.js, agenda.js — static content
  services/       dataService.js — localStorage read/write helpers
```
Routing is in `src/App.jsx`. All routes except `/login` and `/admin` require a logged-in user (`RequireUser` wrapper).

## Known quirks / recent fixes
- Bottom nav is `position: fixed` — Frame.jsx uses `100dvh` (not `100vh`) and the nav has `env(safe-area-inset-bottom)` padding to stay visible and clear of the iOS home indicator.
- Viewport meta has `maximum-scale=1` to stop iOS auto-zooming into input fields on the login screen.
- The "Later Tonight" cards on the home screen (Ancient Medicine, XYZ) are mock/placeholder events — content is hardcoded, not real.

## How to run locally
```bash
npm install
npm run dev
```

## Redeploying
```bash
npx vercel --yes --prod
```
This deploys to the same Vercel project and prints a new production URL. To keep the **same shareable link over time**, either:
1. Use the aliased production URL (`gif-investor-app.vercel.app`), which Vercel keeps pointed at the latest prod deploy, or
2. Set up a custom domain in the Vercel dashboard (Project → Settings → Domains).

**Deployment Protection:** if a new deploy asks visitors to log in with Vercel, go to Project → Settings → Deployment Protection → Disabled, so the public link works for anyone.

## Handing off the repo
See instructions below for pushing this to GitHub so your boss has full access to the code and history.

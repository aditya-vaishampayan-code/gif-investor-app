# GIF Investor App — Design Handoff

Handoff for a full visual redesign of every screen. The current implementation is functional but its styling is placeholder — treat layout and visuals as open, treat flows, content, and constraints as fixed.

**Live build (current state, for reference only):** https://gif-investor-app.vercel.app
**Stack:** Vite + React 18, Tailwind CSS v4 (`@theme` tokens in `src/index.css`), Framer Motion, react-router-dom. Mobile-first (375px design width, `max-w-md` centered column); `/admin` must also work on desktop.

---

## 1. Brand context (from "GIF 2 Tone of Voice & Visual Identity Routes", Kern Culture © 2026)

**The brand:** Global Impact Forum II — an institution, not an event. Themes: civilisational understanding, meaningful dialogue, collaboration & partnerships, soft power & global impact.

**Tone of voice:** Intelligent (informed, not academic) · Human (professional, not corporate) · Confident (institutional, not authoritative) · Visionary (future-focused, not idealistic). Start with an idea, not an announcement. Write for intelligent readers. "We don't speak to our audience. We speak with them." Editorial English — no corporate jargon, no transactional language, no over-complex frameworks.

**The three visual identity routes (client has NOT picked one — designer should confirm or design within the chosen route):**

1. **Spatial Convergence** — modular geometric system, intersecting shapes forming connections; contemporary architecture + Swiss design; structure, clarity, movement; **blue and white** palette (trust, global collaboration); dynamic compositions.
2. **Constellation** — star patterns and networks, luminous gradients, spatial designs; interconnected civilisations; **deep purples, electric violets, black**; Swiss-style typography, modular layouts; collective intelligence.
3. **Points of Convergence** — architecture and craftsmanship, cultural knowledge across generations; **black, gold, warm neutrals**; permanence and heritage; elegant/refined typography.

---

## 2. Product in one paragraph

Event attendees open the app via QR code on their phones. They log in (mock auth — name, email, password; any credentials accepted; this captures first-party data). They browse 10 startups in any order, open each one's profile, and rate their investment interest 1–10 with an interactive slider where **cash bills stack up as the score rises**. A rating is **permanent once locked** (confirm step required). A "My Portfolio" screen summarises their choices. Organizers watch a live leaderboard at `/admin`.

---

## 3. Screen inventory (design every one)

### 3.1 Login — `/login`
- Brand moment: wordmark / identity treatment, one editorial headline, short supporting line.
- Fields: Full name, Email, Password. Primary CTA: "Enter the Forum".
- Footer note: demo build disclaimer.
- No signup/forgot-password flows. Any credentials work.

### 3.2 Startup Grid (Home) — `/`
- Header with app title; greeting with the attendee's first name.
- Progress indicator: N of 10 rated (bar or equivalent).
- Link/button to My Portfolio.
- 2-column card grid, 10 cards: logo/banner treatment (currently emoji + gradient — designer may propose real art direction), name, sector tag.
- Rated cards show a locked state badge: "🔒 Locked · N/10".

### 3.3 Startup Detail — `/startup/:id`
- Back to grid. Banner/hero, sector + funding-stage chips, tagline (display type), description paragraph.
- Founders section: 1–3 founders, avatar + name + role.
- Traction section: two stat tiles — "Ask" (e.g. "$2.5M Seed") and "Traction" (e.g. "120K MAU, 22% MoM").
- If not yet rated: large primary CTA → rating screen.
- If rated: locked panel "Interest locked: N/10 — Ratings are final" (no CTA).

### 3.4 Rating screen — `/rate/:id` (3 states)
**State A — sliding:** prompt line; big score readout "N/10"; money value (see scale below); the **money-stack visual** — bills drop in with spring physics as score increases, fly out as it decreases (Framer Motion; currently 💵 emoji, designer may propose illustrated bills); slider 1–10 with end labels ("Pass" ↔ "All in"); primary CTA "Lock It In".
**State B — confirm:** "Lock in N/10? This is final." + confirm button + "Keep adjusting" secondary.
**State C — locked celebration:** springy success moment ("INVESTED", amount locked), auto-navigates to detail after ~1.4s.
- Money scale (index = score, in $K): 1→50, 2→100, 3→175, 4→275, 5→400, 6→550, 7→700, 8→850, 9→925, 10→1000 ($1M).
- Haptics on slide and on lock (already wired).
- If already rated, this route redirects to detail — no UI needed.

### 3.5 My Portfolio — `/portfolio`
- Hero card: total mock money allocated; "All 10 rated" celebratory variant when complete.
- Ranked list (highest score first): rank #, logo, name, sector, score N/10, money value.
- Empty state: "No investments yet" prompt back to grid.

### 3.6 Organizer Dashboard — `/admin` (desktop + mobile)
- Not linked from attendee UI; no auth.
- Leaderboard of all 10 startups sorted by average score: rank, logo, name, avg score (1 decimal), rater count, horizontal bar proportional to avg/10.
- Should feel like a live "state of the room" display (could be projected at the event).

### Shared shell
- Sticky top header: optional back arrow + screen title. Content in centered `max-w-md` column (except /admin which may go wider).

---

## 4. Content (10 fictional startups — final copy lives in `src/data/startups.js`)

| Name | Sector | Stage | Ask |
|---|---|---|---|
| NimbusGrid | CleanTech | Series A | $6M |
| MedLoop | HealthTech | Seed | $2.5M |
| CrateWise | Logistics | Series A | $8M |
| FluentBee | EdTech | Seed | $1.8M |
| TerraForm Farms | AgTech | Series B | $12M |
| PayLattice | FinTech | Series A | $7M |
| QuietDesk | FutureOfWork | Seed | $2M |
| AuroraSense | DeepTech | Series A | $9M |
| SnackCircle | ConsumerTech | Seed | $1.5M |
| Vaultic | CyberSec | Series B | $15M |

Each has: tagline, ~60-word description, 1–3 founders (name/role/avatar), traction line. Currently emoji-only art (logos, avatars) — no image assets exist; the redesign may specify an illustration/monogram system instead.

---

## 5. Hard constraints (do not change)

- Flows and routes exactly as listed; ratings permanent once locked; confirm step required.
- All data is localStorage via `src/services/dataService.js` (single swap point for future backend) — no new data requirements.
- Self-contained web app; works in any mobile browser; dark-appropriate `theme-color` meta.
- Tailwind v4 tokens: the entire palette/typography must be expressible as `@theme` variables in `src/index.css` so implementation is a token swap plus per-screen class changes.
- Keep Framer Motion for the money stack and lock-in animations.

## 6. Open design questions for the designer

1. Which identity route (Spatial Convergence / Constellation / Points of Convergence)? Confirm with client first.
2. Logo/monogram system for the 10 startups (replacing emoji)?
3. Money-stack art direction: keep emoji bills, or illustrated bills/coins matching the route?
4. /admin: same brand language as attendee app, or a distinct "control room" treatment for projection?

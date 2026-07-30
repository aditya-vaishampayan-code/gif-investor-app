# GIF Investor Interest App — MVP Design

**Date:** 2026-07-30
**Status:** Approved by user

## Overview

A mobile-first web app for the GIF corporate event. Attendees "play investor": they browse 10 startups, view details, and commit a 1–10 investment-interest rating through a money-stacking slider interaction. Everything (auth, storage, aggregates) is mocked for the MVP; a real backend comes later.

Delivery: web app opened via URL/QR code at the event (no app stores). Works on Android and iOS browsers; installable as a PWA-style experience later.

## Tech stack

- Vite + React SPA
- Tailwind CSS for styling
- Framer Motion for the money-stack and lock-in animations
- No backend. All persistence via `localStorage` behind a single `dataService` module (the only file to replace when the real backend arrives).
- Mock startup content in a static JSON/TS data file (10 fictional startups with placeholder images/avatars).

## Screens

### 1. Login
- Mock auth: collects name, email, password; accepts anything.
- Captured as first-party data in localStorage (name, email, login timestamp).
- Later this will validate against the GIF website's user accounts.

### 2. Startup grid (home)
- 10 startup thumbnail cards: logo, name, sector tag.
- Rated startups show a "locked-in" badge with the chosen score; unrated are open.
- Progress indicator ("4/10 rated"). Link to My Portfolio and (unlinked route) admin dashboard.

### 3. Startup detail
- Banner/logo, one-line pitch, longer description.
- Founders: names, roles, placeholder headshots.
- Traction metrics: funding stage, ask amount, revenue/users.
- Industry tags.
- "Invest Interest" CTA → rating screen (hidden/disabled if already rated; shows their locked score instead).

### 4. Rating screen
- 1–10 slider. As the value rises, animated cash bills stack into a growing pile with a rising mock dollar counter (scale: $50K at 1 → $1M at 10, non-linear steps are fine). Haptics via `navigator.vibrate` where supported.
- **Lock It In** button with a confirm step (ratings are permanent).
- On confirm: "invested/stamped" success animation, then return to grid.

### 5. My Portfolio
- Reachable anytime; highlighted when all 10 are rated.
- Ranked recap of the attendee's ratings with total mock money allocated.

### 6. Admin dashboard (`/admin`)
- Organizer view: bar chart / leaderboard of average interest per startup + rater counts.
- Fed by mock data: seeded fake crowd ratings blended with the user's real local ratings so it looks live.

## Data model (localStorage via dataService)

- `user`: { name, email, loginAt }
- `ratings`: { [startupId]: { score, lockedAt } }
- Seeded crowd aggregates: static per-startup { avgScore, raterCount } baseline; user rating folded in at display time.

## Rules

- One rating per startup, locked once confirmed (no editing).
- Free browsing order.
- Placeholder startups; real content and GIF branding swap in later.

## Design direction

Premium corporate-investment look: dark theme, gold/green money accents, phone-first layouts (dashboard also comfortable on laptop).

## Out of scope (MVP)

Real authentication, real backend/live sync, app-store distribution, rating edits, stage-synced unlocking.

## Testing

- Unit tests for dataService (rating lock semantics, aggregate blending, FPD capture).
- Component smoke tests for the main screens.
- Manual verification in browser preview at mobile viewport.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {
  applyTestClockFromUrl,
  clearTestClock,
  getTestClock,
  now,
  setNotifState,
  setTestClock,
} from './services/notifications'

// ?now=<iso> / ?nowOffset=<ms> / ?now=clear — drive reminders from any device,
// including a phone with no dev console. Kept in production builds on purpose.
applyTestClockFromUrl()

// Dev-only console helper for exercising meeting reminders against a fake clock.
// Stripped from production builds by the import.meta.env.DEV guard.
if (import.meta.env.DEV) {
  window.notifClock = {
    jumpTo: (when) => setTestClock(when),
    advance: (ms) => {
      const clock = getTestClock()
      const base =
        clock?.offsetMs ?? (clock?.fixedAt != null ? clock.fixedAt - Date.now() : 0)
      return setTestClock({ offsetMs: base + ms })
    },
    reset: () => clearTestClock(),
    clearHistory: () => setNotifState({ seenAt: 0, dismissed: [], delivered: [] }),
    status: () => ({ clock: getTestClock(), now: new Date(now()).toString() }),
  }
  console.info(
    '[notifClock] test clock ready — notifClock.jumpTo("2026-09-04T10:55"), .advance(ms), .clearHistory(), .reset(), .status()'
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

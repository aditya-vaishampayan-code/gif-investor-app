// Synthesized meeting availability. There is no real calendar integration —
// 30-min slots are generated from a fixed daily window and then filtered against
// bookings (existing MEETINGS_DATA + approved meeting requests) in dataService.

export const SLOT_MINUTES = 30

// The two forum days attendees can book into.
export const BOOKABLE_DAYS = [
  { id: 'day1', label: 'Day 1 (Sep 4)', date: '2026-09-04' },
  { id: 'day2', label: 'Day 2 (Sep 5)', date: '2026-09-05' },
]

// Local wall-clock window applied to every founder, every day.
const DAY_START_MIN = 10 * 60 // 10:00 AM
const DAY_END_MIN = 17 * 60 //   5:00 PM
const LUNCH_START_MIN = 13 * 60 // 1:00 PM
const LUNCH_END_MIN = 14 * 60 //   2:00 PM

const pad = (n) => String(n).padStart(2, '0')

// ISO-like local timestamp matching the format used in MEETINGS_DATA
// (`2026-09-04T11:00:00`, no timezone suffix). Lexical compare is safe here.
const localStamp = (date, minutes) =>
  `${date}T${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}:00`

const to12h = (minutes) => {
  const h24 = Math.floor(minutes / 60)
  const m = minutes % 60
  const period = h24 < 12 ? 'AM' : 'PM'
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h12}:${pad(m)} ${period}`
}

// A [start, end] interval overlaps the lunch window.
const hitsLunch = (startMin) =>
  startMin < LUNCH_END_MIN && startMin + SLOT_MINUTES > LUNCH_START_MIN

// Two intervals overlap. Timestamps are the localStamp format, so string
// comparison is equivalent to chronological comparison.
export const overlaps = (aStart, aEnd, bStart, bEnd) => aStart < bEnd && bStart < aEnd

// Every 30-min slot for a day. Lunch slots are flagged rather than dropped so
// the picker can render them as a blocked "Lunch" row.
export function buildDaySlots(dayId) {
  const day = BOOKABLE_DAYS.find((d) => d.id === dayId)
  if (!day) return []
  const slots = []
  for (let m = DAY_START_MIN; m + SLOT_MINUTES <= DAY_END_MIN; m += SLOT_MINUTES) {
    slots.push({
      startsAt: localStamp(day.date, m),
      endsAt: localStamp(day.date, m + SLOT_MINUTES),
      timeLabel: `${to12h(m)} – ${to12h(m + SLOT_MINUTES)}`,
      lunch: hitsLunch(m),
    })
  }
  return slots
}

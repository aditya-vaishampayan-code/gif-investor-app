// Each day is a list of sessions. A session can have `tracks` (each track is an
// optional `name` plus a `speakers` list) when multiple parallel talks share one
// time slot — e.g. "India x Brazil" running Music & Movement / Beauty / Sports at once.
// Sessions with no `tracks` (or `type: 'break'`) render as simple time/title/location cards.
// `showDot` controls whether this session gets its own marker on the timeline —
// set to false for items that run concurrently with the session above them.

export const AGENDA_DAYS = [
  {
    id: 'day1',
    label: 'Day 1',
    date: '2026-09-04',
    sessions: [
      {
        id: 'opening-ceremony',
        time: '10:00 AM – 10:45 AM',
        title: 'Opening Ceremony',
        location: 'Crystal Ballroom – The Taj Mahal Palace, Mumbai',
        description: 'National and state leadership open the summit',
        showDot: true,
        tracks: [
          {
            speakers: [
              { name: 'Janhavi Pawar', role: 'Director, Sakal Media Group' },
              { name: 'Gajendra Singh Shekhawat', role: 'Minister of Tourism of India' },
              { name: 'Shri Devendra Fadnavis', role: 'Chief Minister of Maharashtra' },
            ],
          },
        ],
      },
      {
        id: 'india-brazil',
        time: '10:45 AM – 01:00 PM',
        title: 'India x Brazil',
        location: 'Crystal Ballroom – The Taj Mahal Palace, Mumbai',
        showDot: true,
        tracks: [
          {
            name: 'Music & Movement',
            speakers: [
              { name: 'Ananda Shankar Jayant', role: 'Director, Sakal Media Group' },
              { name: 'Professor Reza Baba', role: 'Minister of Tourism of India' },
            ],
          },
          {
            name: 'Beauty',
            speakers: [
              { name: 'Sadhvi Sail', role: 'Miss India World 2026' },
              { name: 'Luana Cavalcante', role: 'Model, Founder, Miss Universe Brazil 2024' },
            ],
          },
          {
            name: 'Sports & National Identity',
            speakers: [
              { name: 'Cafu', role: 'Brazilian former footballer' },
              { name: 'Bhaichung Bhutia', role: 'Indian former footballer' },
            ],
          },
        ],
      },
      {
        id: 'networking-lunch-day1',
        time: '1:00 PM – 2:00 PM',
        title: 'Networking Lunch',
        location: 'Ballroom – The Taj Mahal Palace, Mumbai',
        type: 'break',
      },
      {
        id: 'india-china',
        time: '2:00 PM – 4:15 PM',
        title: 'India x China',
        location: 'Crystal Ballroom – The Taj Mahal Palace, Mumbai',
        showDot: true,
        tracks: [
          {
            name: 'Martial Arts',
            speakers: [
              { name: 'Tuhon Shifu Kanishka Sharma', role: 'Director, Sakal Media Group' },
              { name: 'Shinto Mathew', role: 'Indian martial arts expert' },
            ],
          },
          {
            name: 'Calligraphy',
            speakers: [
              { name: 'Abhishek Vardhan Singh', role: 'Calligrapher, Researcher, and Academician' },
              { name: 'Achyut Palav', role: 'Indian calligrapher and educator' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'day2',
    label: 'Day 2',
    date: '2026-09-05',
    sessions: [
      {
        id: 'welcome-note',
        time: '10:00am – 10:25am',
        title: 'Welcome Note (by Minister)',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        showDot: true,
      },
      {
        id: 'vip-deal-making',
        time: '10:30am onwards (OPEN FULL DAY)',
        title: 'VIP DEAL MAKING',
        location: 'Gateway – The Taj Mahal Palace, Mumbai',
        showDot: false,
      },
      {
        id: 'panel-1-tagore-tolstoy',
        time: '10:30am – 11:10am',
        title: 'Panel 1 (Russia) Tagore Tolstoy',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        showDot: true,
        tracks: [
          {
            speakers: [
              { name: 'Umadas Gupta', role: 'Indian actress and historian' },
              { name: 'Matvei', role: 'Russian ice hockey player' },
            ],
          },
        ],
      },
      {
        id: 'panel-2-cinema',
        time: '11:15am – 12:05pm',
        title: 'Panel 2 (Russia) Cinema',
        showDot: false,
        tracks: [
          {
            speakers: [
              { name: 'Sanjay R', role: 'Founder and CEO of Phenomenal AI' },
              { name: 'Aleksandr Fursov', role: 'Deputy Consul General of the Russian Federation in Mumbai' },
            ],
          },
        ],
      },
    ],
  },
]

// Parses the leading "H:MM AM/PM" out of a session's `time` string (handles
// ranges like "10:00 AM – 10:45 AM" and open-ended ones like "10:30am onwards").
function parseSessionStart(day, session) {
  const match = session.time.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])/)
  if (!match || !day.date) return null
  let hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  const isPM = match[3].toLowerCase() === 'pm'
  if (isPM && hours !== 12) hours += 12
  if (!isPM && hours === 12) hours = 0
  const start = new Date(`${day.date}T00:00:00`)
  start.setHours(hours, minutes, 0, 0)
  return start
}

// Standalone (non-break, showDot:true) sessions across both days, each with
// a resolved `start` Date — used to drive the Tonight page's "Next Up" feed.
export function getStandaloneSessions() {
  return AGENDA_DAYS.flatMap((day) =>
    day.sessions
      .filter((session) => session.type !== 'break' && session.showDot === true)
      .map((session) => ({ ...session, dayId: day.id, start: parseSessionStart(day, session) }))
  ).filter((session) => session.start)
}

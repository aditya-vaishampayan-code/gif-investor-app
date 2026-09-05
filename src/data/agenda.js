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
    date: '2026-08-20', // TEMP: for local testing — revert to 2026-09-04
    sessions: [
      {
        id: 'opening-ceremony',
        time: '10:00 AM – 10:45 AM',
        title: 'Welcome & Inaugural Ceremony',
        location: 'Crystal Ballroom – The Taj Mahal Palace, Mumbai',
        showDot: true,
        tracks: [
          {
            name: 'Welcome Note · 10:00 AM',
            speakers: [{ name: 'Janhavi Pawar', role: 'Director, Sakal Media Group' }],
          },
          {
            name: 'Address · 10:30 AM',
            speakers: [{ name: 'Piyush Goyal', role: 'Union Minister of Commerce and Industry, MP' }],
          },
          {
            name: 'Inauguration',
            speakers: [{ name: 'Shri Devendra Fadnavis', role: 'Chief Minister of Maharashtra' }],
          },
          {
            name: 'Vote of Thanks',
            speakers: [{ name: 'Dr Vinod Bidwaik', role: 'Group Director – HR, Sakal Media Group' }],
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
            name: 'The Face of a Nation',
            description: 'Beauty — Miss India and Miss Brazil.',
            speakers: [
              { name: 'Sadhvi Sail', role: 'Miss India World 2026' },
              { name: 'Luana Cavalcante', role: 'Model, Founder, Miss Universe Brazil 2024' },
            ],
          },
          {
            name: 'Movement as Memory',
            description: 'Classical dance, Capoeira and Samba.',
            speakers: [
              { name: 'Ananda Shankar Jayant', role: 'Director, Sakal Media Group' },
              { name: 'Professor Reza Baba', role: 'Minister of Tourism of India' },
            ],
          },
          {
            name: 'The Nation on the Field',
            description: 'Sport as national identity.',
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
            name: 'Ancient Systems of Healing',
            description: 'Ayurveda and Traditional Chinese Medicine in dialogue.',
            speakers: [],
          },
          {
            name: 'The Disciplined Body',
            description: 'Martial arts — Kalaripayattu, Kung Fu and Tai Chi.',
            speakers: [
              { name: 'Tuhon Shifu Kanishka Sharma', role: 'Director, Sakal Media Group' },
              { name: 'Shinto Mathew', role: 'Indian martial arts expert' },
            ],
          },
          {
            name: 'Ink, Line and Meaning',
            description: 'Calligraphy and script traditions.',
            speakers: [
              { name: 'Abhishek Vardhan Singh', role: 'Calligrapher, Researcher, and Academician' },
              { name: 'Achyut Palav', role: 'Indian calligrapher and educator' },
            ],
          },
        ],
      },
      {
        id: 'pitch-night-gala-day1',
        time: '04:30 PM – 07:00 PM',
        title: 'Innovators Gala',
        location: 'Crystal Ballroom – The Taj Mahal Palace, Mumbai',
        description: 'Startup showcases from this edition’s Innovators cohort',
        showDot: true,
      },
    ],
  },
  {
    id: 'day2',
    label: 'Day 2',
    date: '2026-09-05',
    sessions: [
      {
        id: 'vip-deal-making',
        time: '10:30am onwards (OPEN FULL DAY)',
        title: 'VIP DEAL MAKING',
        location: 'Gateway – The Taj Mahal Palace, Mumbai',
        showDot: false,
      },
      {
        id: 'words-that-outlive-empires',
        time: '10:30am – 11:10am',
        title: 'Words That Outlive Empires',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        description: 'India x Russia · Literature — Tagore and Tolstoy',
        showDot: true,
        tracks: [
          {
            speakers: [
              { name: 'Smt Umadas Gupta', role: 'Indian actress and historian' },
              { name: 'Matvei', role: 'Russian ice hockey player' },
            ],
          },
        ],
      },
      {
        id: 'the-sound-of-the-soul',
        time: '11:15am – 12:05pm',
        title: 'The Sound of the Soul',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        description: 'India x Russia · Classical music traditions',
        showDot: true,
        tracks: [
          {
            speakers: [
              { name: 'Konstantin Zenkin', role: 'Musicologist' },
              { name: 'Shri Purbayan Chatterjee', role: 'Indian sitar maestro' },
            ],
          },
        ],
      },
      {
        id: 'frames-of-a-civilisation',
        time: '12:10pm – 01:00pm',
        title: 'Frames of a Civilisation',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        description: 'India x Russia · Cinema as a civilisational mirror',
        showDot: true,
        tracks: [
          {
            speakers: [
              { name: 'Sanjay R', role: 'Founder and CEO of Phenomenal AI' },
              { name: 'Aleksandr Fursov', role: 'Deputy Consul General of the Russian Federation in Mumbai' },
            ],
          },
        ],
      },
      {
        id: 'networking-lunch-day2',
        time: '1:00 PM – 2:00 PM',
        title: 'Networking Lunch',
        location: 'Ballroom – The Taj Mahal Palace, Mumbai',
        type: 'break',
      },
      {
        id: 'guardians-of-the-wild',
        time: '02:00pm – 02:40pm',
        title: 'Guardians of the Wild',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        description: 'India x South Africa · Wildlife and conservation',
        showDot: true,
        tracks: [
          {
            speakers: [
              { name: 'Anand Shinde', role: 'Founder of Trunk Call The Wildlife Foundation' },
            ],
          },
        ],
      },
      {
        id: 'voices-carried-forward',
        time: '02:45pm – 03:25pm',
        title: 'Voices Carried Forward',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        description: 'India x South Africa · Indigenous oral traditions (Adivasi, Zulu, Xhosa)',
        showDot: true,
      },
      {
        id: 'the-long-walk-to-selfhood',
        time: '03:30pm – 04:15pm',
        title: 'The Long Walk to Selfhood',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        description: 'India x South Africa · Resistance, identity and freedom',
        showDot: true,
        tracks: [
          {
            speakers: [
              { name: 'Dr John Chelladurai', role: 'South African Consul General' },
            ],
          },
        ],
      },
      {
        id: 'high-tea',
        time: '4:15 PM – 4:45 PM',
        title: 'High Tea',
        location: 'Ballroom – The Taj Mahal Palace, Mumbai',
        type: 'break',
      },
      {
        id: 'special-guest-media-bite',
        time: '04:15pm – 04:45pm',
        title: 'Special Guest (MCEE) – Media Bite',
        location: 'Prince’s – The Taj Mahal Palace, Mumbai',
        showDot: false,
      },
      {
        id: 'gala-night-awards-opening',
        time: '04:45pm – 05:00pm',
        title: 'Gala Night & Awards Ceremony Opening',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        showDot: true,
      },
      {
        id: 'cultural-icon-of-the-year-award',
        time: '05:00pm – 05:15pm',
        title: 'Cultural Icon of the Year Award',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        showDot: true,
        tracks: [
          {
            speakers: [
              { name: 'Ashish Shelar', role: 'Indian politician' },
              { name: 'Suniel Shetty', role: 'Actor' },
            ],
          },
        ],
      },
      {
        // Moved earlier per the updated running order — now overlaps the Cultural
        // Icon of the Year Award above (5:00–5:15pm) and the start of The Legacy
        // Hour below (5:20pm onward), both in Crystal. Flagging for the organizers
        // to confirm the real running order.
        id: 'ministerial-keynote',
        time: '05:00pm – 05:25pm',
        title: 'Ministerial Keynote',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        showDot: true,
        tracks: [
          {
            speakers: [
              { name: 'Gajendra Singh Shekhawat', role: 'Minister of Tourism of India' },
            ],
          },
        ],
      },
      {
        id: 'the-legacy-hour',
        time: '05:20pm – 06:50pm',
        title: 'The Legacy Hour',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        showDot: true,
      },
      {
        id: 'capital-council-pitches',
        time: '07:30pm onwards',
        title: 'The Capital Council (6) Innovators',
        location: 'Crystal – The Taj Mahal Palace, Mumbai',
        showDot: true,
      },
      {
        id: 'networking-reception-closing-dinner',
        time: '8:00 PM onwards',
        title: 'Networking Reception & Closing Dinner',
        location: 'Ballroom – The Taj Mahal Palace, Mumbai',
        type: 'break',
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

// Parses the trailing "H:MM AM/PM" out of a session's `time` range (e.g. the
// "10:45 AM" in "10:00 AM – 10:45 AM"). Open-ended sessions like "10:30am
// onwards" have no second time and resolve to null (treated as still running).
function parseSessionEnd(day, session) {
  const match = session.time.match(/[–-]\s*(\d{1,2}):(\d{2})\s*([AaPp][Mm])/)
  if (!match || !day.date) return null
  let hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  const isPM = match[3].toLowerCase() === 'pm'
  if (isPM && hours !== 12) hours += 12
  if (!isPM && hours === 12) hours = 0
  const end = new Date(`${day.date}T00:00:00`)
  end.setHours(hours, minutes, 0, 0)
  return end
}

// Standalone (non-break, showDot:true) sessions across both days, each with
// resolved `start`/`end` Dates — used to drive the Tonight page's "Happening
// Now" card and "Next Up" feed.
export function getStandaloneSessions() {
  return AGENDA_DAYS.flatMap((day) =>
    day.sessions
      .filter((session) => session.type !== 'break' && session.showDot === true)
      .map((session) => ({
        ...session,
        dayId: day.id,
        start: parseSessionStart(day, session),
        end: parseSessionEnd(day, session),
      }))
  ).filter((session) => session.start)
}

// The standalone session currently in progress (start <= now < end), or the
// most recently started one if its end is open-ended ("...onwards"). Returns
// null when nothing is live.
export function getCurrentSession(now = Date.now()) {
  const live = getStandaloneSessions()
    .filter((session) => session.start.getTime() <= now && (!session.end || now < session.end.getTime()))
    .sort((a, b) => b.start - a.start)
  return live[0] ?? null
}

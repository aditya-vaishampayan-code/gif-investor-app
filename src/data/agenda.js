// Each day is a list of sessions. A session can have `tracks` (each track is an
// optional `name` plus a `speakers` list) when several talks share one time slot
// — e.g. "India x Brazil" running Music & Movement / Beauty / Sports at once.
// Sessions with no `tracks` (or `type: 'break'`) render as simple time/title/location cards.
// `showDot` controls whether this session gets its own marker on the timeline —
// set to false for items that run concurrently with the session above them.
// `link` ({ to, label }) adds a call-to-action on the card for sessions that
// have a dedicated page elsewhere in the app (e.g. the Innovators Gala).
// `thumb` sets the hero image on the Today tab: `{ image }` for a photograph,
// or `{ motif }` naming one of the drawn backdrops in SessionThumb.

export const AGENDA_DAYS = [
  {
    id: 'day1',
    label: 'Day 1',
    date: '2026-09-05',
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
            speakers: [{ name: 'Shri Piyush Goyal', role: 'Union Minister of Commerce and Industry, MP' }],
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
        thumb: { motif: 'india-china' },
        tracks: [
          {
            name: 'Ancient Systems of Healing',
            description: 'Ayurveda and Traditional Chinese Medicine in dialogue.',
            speakers: [
              { name: 'Priya Samwani', role: 'Founder of Balance Point Chinese Med Clinic' },
              { name: 'Prateek Samwani', role: 'Chinese Medicine Practitioner and India’s youngest licensed acupuncturist' },
              { name: 'Prof. Dr. Brijesh Mishra', role: 'Dean, Shri Ayurved Mahavidyalaya, Nagpur' },
            ],
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
        thumb: { image: '/pitch-night-thumb.jpg' },
        // The showcase itself lives on the Innovators tab — this card links
        // straight through to the cohort instead of dead-ending on the agenda.
        link: { to: '/gala', label: 'View the Innovators' },
      },
    ],
  },
  {
    id: 'day2',
    label: 'Day 2',
    date: '2026-09-06',
    sessions: [
      {
        id: 'vip-deal-making',
        thumb: { motif: 'vip-deal-making' },
        time: '10:30am onwards (OPEN FULL DAY)',
        title: 'VIP DEAL MAKING',
        location: 'Gateway – The Taj Mahal Palace, Mumbai',
        showDot: false,
      },
      {
        // Was three separate 40-50 minute sessions; they are one block running
        // 10:30–13:00 in Crystal, structured like Day 1's India x Brazil and
        // India x China. Track order follows the running order, which is not
        // the order the talks were previously listed in.
        id: 'india-russia',
        thumb: { motif: 'india-russia' },
        time: '10:30 AM – 1:00 PM',
        title: 'India x Russia',
        location: 'Crystal Ballroom – The Taj Mahal Palace, Mumbai',
        showDot: true,
        tracks: [
          {
            name: 'Words That Outlive Empires',
            description: 'Exploring the friendship between Tagore and Tolstoy.',
            speakers: [
              { name: 'Uma Dasgupta', role: 'Indian actress and historian' },
              { name: 'Matvei Fetisov', role: 'Vice Consul at the Consulate General of Russia in Mumbai' },
            ],
          },
          {
            name: 'Frames of a Civilisation',
            description: 'Indian filmmaking’s growing impact on cinema’s future.',
            speakers: [
              { name: 'Sanjay Rodrigues', role: 'Founder and CEO of Phenomenal AI' },
              { name: 'Ivan Fetisov', role: 'Consul General of the Russian Federation' },
            ],
          },
          {
            name: 'The Sound of the Soul',
            description: 'Sitar traditions’ global reach, from Herbie Hancock to Amazon Prime.',
            speakers: [
              { name: 'Purbayan Chatterjee', role: 'Indian Sitar Maestro' },
              { name: 'Aleksandr Fursov', role: 'Deputy Consul General of the Russian Federation' },
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
        // Was three separate talks; they run as one block in Crystal, same shape
        // as India x Russia above.
        id: 'india-south-africa',
        thumb: { motif: 'india-south-africa' },
        time: '2:00 PM – 4:15 PM',
        title: 'India x South Africa',
        location: 'Crystal Ballroom – The Taj Mahal Palace, Mumbai',
        showDot: true,
        tracks: [
          {
            name: 'Guardians of the Wild',
            description: 'Shared India–South Africa conservation battles, from the ground.',
            speakers: [
              { name: 'Anand Shinde', role: 'Founder of Trunk Call The Wildlife Foundation' },
              { name: 'Sibusiso Mpungose', role: 'Speaker, Global Impact Forum' },
            ],
          },
          {
            name: 'Voices Carried Forward',
            description: 'Deep, overlooked history connecting India and Africa.',
            speakers: [
              { name: 'Dr. Neelima Sona', role: 'Emotional intelligence expert, author, and leadership coach' },
              { name: 'Mr. Mashudubele Sedula Mamabolo', role: 'Counsellor, South African High Commission' },
            ],
          },
          {
            name: 'The Long Walk to Selfhood',
            description: 'Diplomacy meets philosophy on freedom and identity.',
            speakers: [
              { name: 'Manish Karmwar', role: 'Department of African Studies' },
              { name: 'Gideon Labane', role: 'Consulate General of South Africa' },
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
        // Everything between High Tea and the closing dinner now runs as one
        // Founders Track block. This replaces five separate sessions: the Media
        // Bite, the Gala Night & Awards opening, the Cultural Icon of the Year
        // Award, the Ministerial Keynote and the Capital Council pitches.
        id: 'founders-track',
        thumb: { motif: 'founders-track' },
        time: '04:45 PM onwards',
        title: 'Founders Track',
        location: 'Crystal Ballroom – The Taj Mahal Palace, Mumbai',
        showDot: true,
        tracks: [
          {
            name: 'Opening Remarks',
            description: 'Founders building enterprises meant to outlast generations.',
            speakers: [
              { name: 'Shreya Hegde', role: 'Indian content creator, entrepreneur, and soft skills trainer' },
            ],
          },
          {
            name: 'The Legacy Hour',
            description: 'A curated session exploring what it takes to build enterprises designed to outlast generations.',
          },
          {
            name: 'Ministerial Keynote',
            description: 'Keynote on India’s current investment moment.',
            speakers: [
              { name: 'Shri Piyush Goyal', role: 'Minister of Commerce and Industry of India' },
            ],
          },
          {
            name: 'The Capital Council',
            description: 'VC dealmaking track for founders and investors.',
          },
        ],
      },
      {
        id: 'networking-reception-closing-dinner',
        description: 'Closing reception to continue the day’s conversations.',
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

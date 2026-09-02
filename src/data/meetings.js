// Sample placeholder meetings dataset.
// In production, this can be hydrated from an Excel sheet or API.

export const MEETINGS_DATA = [
  {
    id: 'meet-1',
    userEmail: 'sid@example.com',
    userName: 'Sid',
    title: '1-on-1 Deal Discussion',
    partnerName: 'Akash Gupta',
    partnerRole: 'CEO & Co-founder, Zypp Electric',
    partnerCompany: 'Zypp Electric',
    time: '11:00 AM – 11:30 AM',
    dayLabel: 'Day 1 (Sep 4)',
    startsAt: '2026-09-04T11:00:00',
    endsAt: '2026-09-04T11:30:00',
    location: 'Gateway Room – Table 03',
    status: 'Confirmed',
    notes: 'Discussion on Series C participation & EV fleet expansion in West India.',
  },
  {
    id: 'meet-2',
    userEmail: 'sid@example.com',
    userName: 'Sid',
    title: 'Startup Review & Q&A',
    partnerName: 'Nitin Agrawal',
    partnerRole: 'Founder & CEO, Navadhan Capital',
    partnerCompany: 'Navadhan Capital',
    time: '02:30 PM – 03:00 PM',
    dayLabel: 'Day 1 (Sep 4)',
    startsAt: '2026-09-04T14:30:00',
    endsAt: '2026-09-04T15:00:00',
    location: 'Gateway Room – Table 07',
    status: 'Confirmed',
    notes: 'Rural nano-enterprise lending model and AceN underwriting roadmap.',
  },
  {
    id: 'meet-3',
    userEmail: 'sid@example.com',
    userName: 'Sid',
    title: 'VIP Investment Sync',
    partnerName: 'Vivek Nirmal',
    partnerRole: 'Founder & CEO, KisanKonnect',
    partnerCompany: 'KisanKonnect',
    time: '11:30 AM – 12:00 PM',
    dayLabel: 'Day 2 (Sep 5)',
    startsAt: '2026-09-05T11:30:00',
    endsAt: '2026-09-05T12:00:00',
    location: 'Gateway Room – Table 02',
    status: 'Scheduled',
    notes: 'Farm-to-fork supply chain economics and D2C expansion beyond Maharashtra.',
  },
  {
    id: 'meet-4',
    userEmail: 'aditya@example.com',
    userName: 'Aditya',
    title: 'Mobility Sector Strategy',
    partnerName: 'Prashant Kumar',
    partnerRole: 'CEO & Co-founder, Zingbus',
    partnerCompany: 'Zingbus',
    time: '03:15 PM – 03:45 PM',
    dayLabel: 'Day 2 (Sep 5)',
    startsAt: '2026-09-05T15:15:00',
    endsAt: '2026-09-05T15:45:00',
    location: 'Gateway Room – Table 05',
    status: 'Confirmed',
    notes: 'Intercity bus electrification tech stack review.',
  },
]

export function getMeetingsForUser(user) {
  if (!user || (!user.name && !user.email)) return []
  
  const searchName = user.name ? user.name.trim().toLowerCase() : ''
  const searchEmail = user.email ? user.email.trim().toLowerCase() : ''

  return MEETINGS_DATA.filter((m) => {
    const mName = m.userName ? m.userName.toLowerCase() : ''
    const mEmail = m.userEmail ? m.userEmail.toLowerCase() : ''

    if (searchEmail && mEmail === searchEmail) return true
    if (searchName && (mName.includes(searchName) || searchName.includes(mName))) return true
    return false
  })
}

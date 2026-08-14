export const MONEY_BY_SCORE = [0, 50, 100, 175, 275, 400, 550, 700, 850, 925, 1000]

export const formatMoney = (k) =>
  k >= 1000 ? `$${(k / 1000).toFixed(k % 1000 === 0 ? 0 : 1)}M` : `$${k}K`

export const formatMoneyFull = (k) =>
  k >= 1000 ? '$1,000,000' : `$${k}K`

const avg = (scores) => scores.reduce((a, b) => a + b, 0) / scores.length

const seed = (scores) => ({ avgScore: Math.round(avg(scores) * 10) / 10, raterCount: scores.length })

export const STARTUPS = [
  {
    id: 'zingbus', name: 'Zingbus', sector: 'Mobility', monogram: 'ZB',
    monoBg: '#1D4ED8', monoFg: '#FFFFFF',
    tagline: 'Tech-driven intercity bus travel, going electric.',
    description: 'Zingbus operates a digital platform for intercity bus travel in India, giving small and medium bus operators the tech stack — pricing, fleet management, route optimisation and ticketing — to run safer, more reliable services, while helping them transition from diesel to electric fleets.',
    founders: [
      { name: 'Prashant Kumar', role: 'CEO & Co-founder' },
      { name: 'Mratunjay Beniwal', role: 'Co-founder' },
      { name: 'Ravi Kumar Verma', role: 'Co-founder & CTO' },
    ],
    metrics: { stage: 'Series A', ask: '$9M', traction: '2M+ users across 300 cities · 70 operator partners · backed by bp Ventures, Info Edge Ventures, Y Combinator' },
    seed: avg([6, 7, 5, 8, 6, 7, 6, 5, 7, 6, 8, 7]),
  },
  {
    id: 'rooter', name: 'Rooter', sector: 'Gaming', monogram: 'RT',
    monoBg: '#7C3AED', monoFg: '#FFFFFF',
    tagline: 'India\u2019s largest game-streaming and esports content platform.',
    description: 'Rooter runs a mobile-first game-streaming and esports community platform, letting gamers stream titles like BGMI and Free Fire, connect with fans, and monetise content. Originally a sports fan-engagement app, it pivoted to gaming during COVID-19 and now partners with top esports teams and tournament organisers across India.',
    founders: [
      { name: 'Piyush Kumar', role: 'CEO & Co-founder' },
      { name: 'Dipesh Agarwal', role: 'Co-founder & COO' },
      { name: 'Akshat Goel', role: 'Co-founder & CTO' },
    ],
    metrics: { stage: 'Growth', ask: '$16M', traction: '80M+ app installs · ~17M MAUs · $7M ARR · backed by March Capital, Lightbox, Paytm' },
    seed: avg([8, 7, 9, 6, 8, 7, 9, 8, 6, 7, 8, 9]),
  },
  {
    id: 'zypp-electric', name: 'Zypp Electric', sector: 'EV Logistics & Mobility', monogram: 'ZE',
    monoBg: '#16A34A', monoFg: '#FFFFFF',
    tagline: 'Electric two-wheelers, as-a-service, for India\u2019s gig economy.',
    description: 'Zypp Electric operates an asset-light EV-as-a-service platform, leasing electric scooters to gig-economy delivery riders and providing AI-driven fleet management (via its FleetEase.ai software) to e-commerce, quick-commerce and food-delivery clients, aiming to electrify India\u2019s last-mile logistics.',
    founders: [
      { name: 'Akash Gupta', role: 'CEO & Co-founder' },
      { name: 'Rashi Agarwal', role: 'Co-founder & COO' },
      { name: 'Tushar Mehta', role: 'Co-founder & COO' },
    ],
    metrics: { stage: 'Series C', ask: '$15M', traction: '20,000+ e-scooters deployed · Rs 438 Cr FY25 revenue (+50% YoY) · backed by ENEOS, Goodyear Ventures' },
    seed: avg([7, 6, 8, 7, 6, 8, 7, 5, 7, 8, 6, 7]),
  },
  {
    id: 'impactguru', name: 'ImpactGuru', sector: 'Healthcare', monogram: 'IG',
    monoBg: '#DC2626', monoFg: '#FFFFFF',
    tagline: 'Crowdfunding and financing to make healthcare affordable.',
    description: 'ImpactGuru runs India\u2019s largest healthcare crowdfunding platform, helping patients raise funds for medical treatment such as cancer care and transplants directly from donors, alongside financing partnerships with hospitals like Apollo — addressing the gap left by low insurance penetration and limited access to credit.',
    founders: [
      { name: 'Piyush Jain', role: 'CEO & Co-founder' },
      { name: 'Khushboo Jain', role: 'Co-founder' },
    ],
    metrics: { stage: 'Series B', ask: '$5M', traction: '$21M+ raised to date · hospital network incl. Apollo · backed by Venture Catalysts, RB Investments' },
    seed: avg([7, 8, 6, 7, 9, 6, 8, 7, 6, 8, 7, 6]),
  },
  {
    id: 'rare-planet', name: 'Rare Planet', sector: 'Retail Consumer', monogram: 'RP',
    monoBg: '#EA580C', monoFg: '#FFFFFF',
    tagline: 'Reviving Indian handicrafts, one artisan at a time.',
    description: 'Rare Planet designs and sells indigenous Indian handicrafts — terracotta, copper, ceramics, jewellery and home decor — through its own airport retail stores, marketplaces and D2C channels, paying its network of thousands of rural artisans within days instead of the industry-standard 40-45.',
    founders: [
      { name: 'Ranodeep Saha', role: 'CEO & Founder' },
      { name: 'Vijay Kumar TR', role: 'Co-founder' },
    ],
    metrics: { stage: 'Series A', ask: '$2M', traction: '10,000+ artisans in 23 states · 35+ airport stores · Rs 40 Cr revenue · backed by Adani family, Venture Catalysts' },
    seed: avg([6, 7, 5, 6, 8, 7, 5, 6, 7, 6, 8, 7]),
  },
]

export const initials = (name) =>
  name.split(' ').filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

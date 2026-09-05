export const MONEY_BY_SCORE = [0, 50, 100, 175, 275, 400, 550, 700, 850, 925, 1000]

export const formatMoney = (k) =>
  k >= 1000 ? `$${(k / 1000).toFixed(k % 1000 === 0 ? 0 : 1)}M` : `$${k}K`

export const formatMoneyFull = (k) =>
  k >= 1000 ? '$1,000,000' : `$${k}K`

const avg = (scores) => scores.reduce((a, b) => a + b, 0) / scores.length

const seed = (scores) => ({ avgScore: Math.round(avg(scores) * 10) / 10, raterCount: scores.length })

// The 6 Innovators-section startups (route /gala) — the only startup cohort in the
// app. Rate.jsx, Detail.jsx, Portfolio.jsx, Admin.jsx and dataService.js all read
// this list and its `seed` (baseline avg/rater count for the leaderboard). Data
// from the "Startup Presentations" deck; funding stage/ask weren't provided (TBD).
export const INNOVATOR_STARTUPS = [
  {
    id: 'cautio', name: 'Cautio', sector: 'Mobility | IoT Fleet Safety', monogram: 'CA',
    monoBg: '#1D4ED8', monoFg: '#FFFFFF', logo: '/logos/cautio.png',
    // Square mark drawn edge-to-edge with no margin of its own, so `object-contain`
    // scales it to full plate height and it reads far heavier than the wordmarks it
    // sits beside. Extra inset brings it back to their optical size.
    logoInset: 11,
    website: 'https://www.cautio.com/',
    tagline: 'AI dashcams turning fleet video into risk alerts and incident evidence.',
    description: 'Cautio is building AI-powered dashcams integrated into India’s first unified mobility intelligence platform, reimagining road safety from the ground up for Indian conditions. Its dual-camera AI dashcams monitor road and cabin activity, turning video into risk alerts, driver scorecards, incident evidence, and operational workflows — a Detect, Verify and Act model with human-verified intervention for critical events. It serves buses, cabs, logistics and freight operators, three-wheelers and other commercial fleets, with future expansion into insurance, lending, autonomous mobility and data licensing. The integrated hardware-software-human model lets fleet operators proactively identify unsafe behaviour, prevent incidents, resolve disputes and accelerate insurance claims.',
    founders: [
      { name: 'Ankit Acharya', role: 'Co-founder & CEO', linkedin: 'https://www.linkedin.com/in/ankitacharya/' },
      { name: 'Pranjal Nadhani', role: 'Co-founder & CTO', linkedin: 'https://www.linkedin.com/in/pranjalnadhani/' },
    ],
    metrics: { stage: 'TBD', ask: 'TBD', traction: '9,500+ devices across 55+ cities · 80+ B2B clients on 3-year avg contracts · 100M+ km of video data, 32M+ AI alerts · ₹25.6 Cr saved across 1,270 incidents, claims settled 3–5 days faster' },
    seed: seed([7, 8, 6, 8, 7, 9, 7, 6, 8, 7, 8, 7]),
  },
  {
    id: 'flawsome', name: 'Flawsome', sector: 'FemTech | D2C Menstrual Hygiene | Cleantech', monogram: 'FL',
    monoBg: '#DB2777', monoFg: '#FFFFFF', logo: '/logos/flawsome.png',
    website: 'https://myflawsome.com/',
    tagline: 'India’s first flushable, 100% biodegradable sanitary pad.',
    description: 'Flawsome is building India’s first flushable, 100% biodegradable sanitary pad, attacking the disposal barrier behind India’s menstrual hygiene gap — ~12 billion pads are discarded yearly, creating non-biodegradable waste with an ~800-year landfill impact, and over 70% of women report hiding used pads due to stigma and lack of privacy. Its patented, plant-based formulation dissolves completely in water and is engineered to run on existing sanitary-pad manufacturing lines rather than costly custom setups. The technology holds a granted Indian patent (US PCT filed), has cleared BIS testing under IS 5405 via NITRA, and has been validated through user trials and an earlier pilot.',
    founders: [
      { name: 'Ranu Khade', role: 'Founder', linkedin: 'https://www.linkedin.com/in/ranu-k-903a4a10/' },
      { name: 'Hitesh Narula', role: 'Chief Business Officer', linkedin: 'https://www.linkedin.com/in/hitesh-narula-25350891/' },
    ],
    metrics: { stage: 'TBD', ask: 'TBD', traction: 'Live across 11+ e-commerce/quick-commerce platforms plus offline retail and an early UAE channel · 1,300+ users · granted Indian patent (US PCT filed), 3 trademarks · ₹50 lakh non-dilutive government grant · 10,200 kg plastic saved, 60–70 t CO₂ prevented' },
    seed: seed([8, 7, 9, 7, 8, 6, 8, 9, 7, 8, 7, 8]),
  },
  {
    id: 'just-deliveries', name: 'Just Deliveries', sector: 'Logistics | Cold-Chain | F&B Infrastructure', monogram: 'JD',
    monoBg: '#0E7490', monoFg: '#FFFFFF', logo: '/logos/just-deliveries.png',
    website: 'https://justdeliveries.co.in/',
    tagline: 'A shared cold-chain logistics network for India’s F&B brands.',
    description: 'Just Deliveries is building the operating layer for India’s rapidly growing F&B and perishables economy, addressing a USD 150Bn+ organized F&B ecosystem where 90% of the logistics backbone is still run by unorganized transporters. Its tech-enabled, asset-light network connects food businesses with semi-organized transporters and Grade-A cold-storage infrastructure, providing reliable temperature-controlled logistics, tracking, routing, vendor allocation and transparent billing. The platform positions itself as a logistics OS for 50,000 F&B brands, enabling them to plug into a shared cold-chain network.',
    founders: [
      { name: 'Mansi Mahansaria', role: 'Founder & CEO', linkedin: 'https://www.linkedin.com/in/mansi-just-deliveries-founder/' },
      { name: 'Pradeep Murugesan', role: 'Co-Founder & COO', linkedin: 'https://www.linkedin.com/in/pradeep1304/' },
    ],
    metrics: { stage: 'TBD', ask: 'TBD', traction: 'INR 75+ Cr ARR · 350+ vehicles running 36,000+ monthly trips across 7 cities · 850+ pallets of storage footprint · 150 clients' },
    seed: seed([6, 7, 7, 8, 6, 7, 8, 7, 6, 8, 7, 7]),
  },
  {
    id: 'zerocircle', name: 'ZeroCircle', sector: 'Sustainable Materials | Biomaterials | Cleantech', monogram: 'ZC',
    monoBg: '#047857', monoFg: '#FFFFFF', logo: '/logos/zerocircle.png',
    website: 'https://zerocircle.in/',
    tagline: 'Ocean-safe, plastic-free materials engineered from seaweed.',
    description: 'Zerocircle is building ocean-safe, plastic-free materials engineered from seaweed and other rapidly renewing biomass. It targets the everyday convenience-versus-planet trade-off: packaging and daily-use products built on synthetic plastics that never truly disappear, leaving behind waste with no clean end-of-life. Its natural polymer materials replace plastic entirely rather than merely reducing it — bio-alternatives designed to be perfectly circular and leave nothing behind. The technology avoids synthetic additives, working instead with the native structure of natural polymers to deliver stable performance, in effect turning seaweed into infrastructure for a circular economy.',
    founders: [
      { name: 'Neha Jain', role: 'Founder & CEO', linkedin: 'https://www.linkedin.com/in/nehajn/' },
    ],
    metrics: { stage: 'TBD', ask: 'TBD', traction: '3 IPs + 1 filed patent · brands incl. Blue Tokai, Zomato, Budweiser and Swiggy · global partnerships across EU, LATAM, UK and MENA (Huhtamaki, Analytico, EcoDispo) · Yes Bengaluru Urban Innovation Challenge winner · 1.5M+ units of conventional plastic replaced' },
    seed: seed([7, 8, 8, 7, 9, 7, 8, 7, 8, 9, 7, 8]),
  },
  {
    id: 'nautical-wings', name: 'Nautical Wings Aerospace', sector: 'Aerospace & Defence | Electric Aviation | eVTOL', monogram: 'NW',
    monoBg: '#4338CA', monoFg: '#FFFFFF', logo: '/logos/nautical-wings.jpg',
    website: 'https://nauticalwings.com/',
    tagline: 'Electric propulsion systems for UAVs, eVTOLs and electric aircraft.',
    description: 'Nautical Wings Aerospace is building next-generation electric propulsion systems for India’s growing UAV, electric aircraft and urban air mobility ecosystem, addressing a market where propulsion — spanning propellers, motors and controllers — remains a critical bottleneck for drone, eVTOL and electric aircraft manufacturers who lack in-house design and certification capability. Its tailored propulsion stack spans 500W to 2.1MW systems, combining proprietary axial-flux motors, custom-engineered composite propellers and its integrated Electric Propulsion Unit (iEPU) — covering everything from UAVs and MALE drones to eVTOLs, tilt-rotor air taxis and manned electric aircraft.',
    founders: [
      { name: 'Shiv Varun', role: 'Founder & CEO', linkedin: 'https://www.linkedin.com/in/shiv-varun-singh-rajput/' },
      { name: 'Praveen T', role: 'Co-Founder & CTO', linkedin: 'https://www.linkedin.com/in/praveen-t-44822616b/' },
      { name: 'Vikas Kamath', role: 'COO', linkedin: 'https://www.linkedin.com/in/vikas-kamath-nw/' },
    ],
    metrics: { stage: 'TBD', ask: 'TBD', traction: '25+ drone companies and 3 prominent air-taxi companies as partners · portfolio 500W–2.1MW, composite propellers 14–120 in, axial-flux motors 1kW–1MW · field-tested to 17,000 ft (Bharat Altitude Trials) · EASA CS-P 350 & FAA 14 CFR Part 35 capability, custom turnaround as fast as 4 weeks' },
    seed: seed([7, 6, 8, 7, 8, 7, 6, 8, 7, 7, 8, 7]),
  },
  {
    id: 'sunfox', name: 'SunFox', sector: 'HealthTech | Diagnostic Cardiology | Medical Devices', monogram: 'SF',
    monoBg: '#E11D48', monoFg: '#FFFFFF', logo: '/logos/sunfox.svg',
    website: 'https://www.sunfox.in/',
    tagline: 'Portable, AI-powered ECG and cardiac diagnostics at population scale.',
    description: 'Sunfox builds portable, AI-powered cardiac diagnostic solutions serving consumers, enterprises, insurers, hospitals, clinics, public health systems and the defence sector’s cardiac analysis needs. Its devices are engineered to capture super-high-quality data for cardiac diagnostics, including the Spandan portable 12-lead ECG, paired with an AI-powered platform that analyzes, connects and processes cardiac data — backed by on-demand cardiologist review and a population-scale heart-attack management system for public health.',
    founders: [
      { name: 'Rajat Jain', role: 'Founder & CEO', linkedin: 'https://www.linkedin.com/in/jairajat/' },
      { name: 'Arpit Jain', role: 'Co-Founder & Director', linkedin: 'https://www.linkedin.com/in/arpit-jain-761350a0/' },
      { name: 'Sabit Rawat', role: 'Co-Founder & Business Lead', linkedin: 'https://www.linkedin.com/in/sabitrawat/' },
    ],
    metrics: { stage: 'TBD', ask: 'TBD', traction: 'Cardiac diagnostics across ~600 public healthcare facilities in a northern Indian state · one of the largest cardiac-diagnostics suppliers to the Indian Army · 60,000+ active centers · 5M+ tests, 100,000+ lives saved · 4+ patents, 35+ published papers' },
    seed: seed([8, 8, 7, 9, 8, 7, 8, 8, 9, 7, 8, 8]),
  },
]

export const initials = (name) =>
  name.split(' ').filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

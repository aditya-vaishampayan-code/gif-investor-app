export const MONEY_BY_SCORE = [0, 50, 100, 175, 275, 400, 550, 700, 850, 925, 1000]

export const formatMoney = (k) =>
  k >= 1000 ? `$${(k / 1000).toFixed(k % 1000 === 0 ? 0 : 1)}M` : `$${k}K`

export const formatMoneyFull = (k) =>
  k >= 1000 ? '$1,000,000' : `$${k}K`

const avg = (scores) => scores.reduce((a, b) => a + b, 0) / scores.length

const seed = (scores) => ({ avgScore: Math.round(avg(scores) * 10) / 10, raterCount: scores.length })

// The 5 startups shown in the Meetings section — browsed only, NOT rated.
// Detail.jsx still renders their profile pages; rating lives with INNOVATOR_STARTUPS.
export const STARTUPS = [
  {
    id: 'biddano', name: 'Biddano', sector: 'PharmaTech | B2B Supply Chain | AI Infrastructure', monogram: 'BD',
    monoBg: '#1D4ED8', monoFg: '#FFFFFF',
    logo: '/logos/biddano.png',
    website: 'https://biddano.com/',
    tagline: 'The AI operating system for India’s pharma supply chain.',
    description: 'Biddano is building the AI operating system for India’s pharma supply chain, a full-stack platform combining licensed distribution infrastructure with a proprietary AI intelligence layer (7 engines: demand forecasting, image-to-order, voice ordering, expiry reduction, warehouse orchestration) connecting manufacturers to pharmacies. With 1,800+ manufacturers, 200K+ pharmacies, and 300K+ SKUs under signal, Biddano delivers 96.4% fill rate and 4-hour fulfilment TAT, already EBITDA-positive at ₹220 Cr ARR ($24.4 Mn) with 130% YoY growth.',
    founders: [
      { name: 'Talha Shaikh', role: 'Co-Founder, Business & Operations' },
      { name: 'Murali Ramanath', role: 'Co-Founder, Tech & Product' },
    ],
    metrics: { stage: 'TBD', ask: 'TBD', traction: '₹220 Cr ARR (3.5% EBITDA, positive today) · 200K+ pharmacies and 1,800+ manufacturers on platform · 92 stockist ERPs connected (79% secondary-sales consent) · 105 live metrics captured across the transaction ledger · 130% average YoY growth (Apr–Aug FY27)' },
  },
  {
    id: 'zypp-electric', name: 'Zypp Electric', sector: 'EV Logistics & Mobility', monogram: 'ZE',
    monoBg: '#16A34A', monoFg: '#FFFFFF',
    logo: '/logos/zypp-electric.jpg',
    website: 'https://zypp.app/',
    tagline: 'Electric two-wheelers, as-a-service, for India’s gig economy.',
    description: 'Zypp Electric is India’s leading tech-enabled EV rental platform, building the operating system for India’s gig economy, starting with mobility and expanding into financial identity, credit, and AI-powered earnings optimization for 100M gig entrepreneurs. Founded in 2017 by Akash Gupta and Rashi Agarwal, with a mission to make India carbon-free through a fully electric, IoT- and AI-enabled last-mile delivery ecosystem. Its proprietary FleetOS powers 28,000+ EVs across 8+ cities, delivering groceries, food, medicines, and e-commerce packages at 96% uptime and 12+ deliveries per EV daily. Beyond mobility, Zypp is driving real social impact, enabling 2.5 Lakh+ gig entrepreneurs with 27% higher take-home income, formal credit access via Zypp CIBIL, and 60M+ kg of CO₂ emissions saved.',
    founders: [
      { name: 'Akash Gupta', role: 'CEO & Co-founder', linkedin: 'https://www.linkedin.com/in/akashg/' },
      { name: 'Rashi Agarwal', role: 'Co-founder & COO', linkedin: 'https://www.linkedin.com/in/rashiagarwalzypp/' },
    ],
    metrics: { stage: 'Series C', ask: '$15M', traction: '28,000+ EVs across 8+ cities · ₹275 Cr ARR · ₹582 Cr rider earnings in 12 months · backed by global investors' },
  },
  {
    id: 'impactguru', name: 'ImpactGuru', sector: 'Healthcare | Financing', monogram: 'IG',
    monoBg: '#DC2626', monoFg: '#FFFFFF',
    logo: '/logos/impact-guru.jpg',
    website: 'https://www.impactguru.com/',
    tagline: 'Crowdfunding and financing to make healthcare affordable.',
    description: 'CarePal Group is India’s category-defining healthcare financing ecosystem, built around three integrated marketplaces: ImpactGuru (medical crowdfunding), CarePal Money (healthcare lending), and CarePal Secure (health insurance and benefits). Since inception, the platform has processed over USD 200 million (₹1,900 Cr+) in cumulative GMV, helped 60,000+ patients and families, and mobilized a community of 60 lakh+ unique donors across 90 lakh+ donations — at a median ticket of just ₹500 ($5) — making it the default financial lifeline for India’s "missing middle," the 600 million+ people with zero or inadequate health insurance. Founded by a team with backgrounds spanning investment banking (J.P. Morgan), strategy consulting (BCG), and design (Jimmy Choo, Michael Kors), and incubated at the Harvard Innovation Lab, CarePal Group has grown into a ~650-person organization with 1,000+ hospital partners nationwide. Backed by marquee global investors including Merck’s Global Health Innovation Fund, Sony Corporation, Apis Partners, HealthQuad, Apollo Hospitals, and Dream Incubator, CarePal Group has raised over $18.5 million in equity funding to date.',
    founders: [
      { name: 'Piyush Jain', role: 'CEO & Co-founder', linkedin: 'https://www.linkedin.com/in/piyushcrjain/' },
      { name: 'Khushboo Jain', role: 'Co-founder', linkedin: 'https://www.linkedin.com/in/khushboopjain/' },
      { name: 'Vikas Kaul', role: 'Co-founder & Chief Product / Tech Officer', linkedin: 'https://www.linkedin.com/in/vikasvirkaul/' },
    ],
    metrics: { stage: 'Series B', ask: '$5M', traction: '$18.5M+ raised to date · 1,000+ hospital partners incl. Apollo · backed by Merck GHI Fund, Sony, Apis Partners, HealthQuad' },
  },
  {
    id: 'navadhan-capital', name: 'Navadhan Capital', sector: 'Fintech | Alternative Lending (Rural)', monogram: 'NC',
    monoBg: '#0891B2', monoFg: '#FFFFFF',
    logo: '/logos/navadhan-capital.png',
    website: 'https://www.navadhan.com/',
    tagline: 'Tech-led financing for India’s rural nano-enterprises.',
    description: 'Navadhan Capital is an RBI-registered NBFC building tech-led financing for India’s rural nano-enterprises, having disbursed ₹807 Cr to 46,000+ active loans across 5 states and 700+ PIN codes via its proprietary underwriting platform, AceN. Founded in 2019 by Nitin Agrawal, a 25-year BFSI veteran and former CEO of a listed NBFC, alongside a founding team with 80+ years of combined experience across ICICI, HDFC Bank, Amazon, and SAP. Operating a phygital model with 99%+ collection efficiency and sub-1% NNPA, Navadhan serves the "missing middle" households earning ₹4-40 lakh, above microfinance yet underserved by MSME lenders, addressing a $500 billion credit gap across India’s 70 million nano-enterprises, backed by marquee investors like Prime Venture Partners, NABVentures, and Gemba Capital.',
    founders: [
      { name: 'Nitin Agrawal', role: 'Founder & CEO' },
    ],
    metrics: { stage: 'TBD', ask: 'TBD', traction: '₹807 Cr disbursed · 46,000+ active loans · 5 states, 700+ PIN codes · backed by Prime Venture Partners, NABVentures, Gemba Capital' },
  },
  {
    id: 'kisankonnect', name: 'KisanKonnect', sector: 'AgriTech | D2C Fresh Food | Supply Chain', monogram: 'KK',
    monoBg: '#4D7C0F', monoFg: '#FFFFFF',
    logo: '/logos/kisankonnect.png',
    website: 'https://www.kisankonnect.in/',
    tagline: 'Farm-to-fork fresh essentials, delivered in hours.',
    description: 'KisanKonnect is building India’s leading habit-driven D2C fresh essentials platform, combining deep control over the fresh supply chain with a proprietary tech stack (KNET) and rapid delivery. With 8,000+ farmer partners, 45 delivery depots, and an omni-channel network of farm stores and app-based delivery, KisanKonnect delivers farm-to-fork in 8-36 hours at ~7% wastage versus the 10-15% industry average — backed by an industry-leading AOV of ₹475 and 3.0x monthly order frequency. Founded by Vivek Nirmal (Founder & CEO), with over two decades in dairy and fresh food supply chains and a former leadership role at Prabhat Dairy, and Nidhi Nirmal (Co-Founder), who leads brand, consumer experience, and growth.',
    founders: [
      { name: 'Vivek Nirmal', role: 'Founder & CEO', linkedin: 'https://www.linkedin.com/in/vivek-nirmal-52656424a/' },
      { name: 'Nidhi Nirmal', role: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/nidhi-nirmal-a55680248/' },
    ],
    metrics: { stage: 'TBD', ask: 'TBD', traction: '1 Mn+ app downloads · 170K active users · 1.0 Mn total customers · 8,000+ Kisan Partners · 45 delivery depots · 15 farm stores' },
  },
]

// The 6 Innovators-section startups (route /gala) — these are the RATEABLE cohort.
// Rate.jsx, Detail.jsx, Portfolio.jsx, Admin.jsx and dataService.js all read this
// list and its `seed` (baseline avg/rater count for the leaderboard). Data from the
// "Startup Presentations" deck; funding stage/ask weren't provided (marked TBD).
export const INNOVATOR_STARTUPS = [
  {
    id: 'cautio', name: 'Cautio', sector: 'Mobility | IoT Fleet Safety', monogram: 'CA',
    monoBg: '#1D4ED8', monoFg: '#FFFFFF', logo: '/logos/cautio.png',
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

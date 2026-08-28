export const MONEY_BY_SCORE = [0, 50, 100, 175, 275, 400, 550, 700, 850, 925, 1000]

export const formatMoney = (k) =>
  k >= 1000 ? `$${(k / 1000).toFixed(k % 1000 === 0 ? 0 : 1)}M` : `$${k}K`

export const formatMoneyFull = (k) =>
  k >= 1000 ? '$1,000,000' : `$${k}K`

const avg = (scores) => scores.reduce((a, b) => a + b, 0) / scores.length

const seed = (scores) => ({ avgScore: Math.round(avg(scores) * 10) / 10, raterCount: scores.length })

// The 5 rateable startups shown in the Meetings section. Keep this export name —
// Rate.jsx, Detail.jsx, Portfolio.jsx, Admin.jsx and dataService.js all import it.
export const STARTUPS = [
  {
    id: 'zingbus', name: 'Zingbus', sector: 'Mobility', monogram: 'ZB',
    monoBg: '#1D4ED8', monoFg: '#FFFFFF',
    logo: '/logos/zingbus.jpg',
    website: 'https://www.zingbus.com/',
    tagline: 'Tech-driven intercity bus travel, going electric.',
    description: 'Zingbus is India’s largest asset-light intercity bus platform, organizing a USD 4Bn market that is growing at a 17% CAGR across 30,000+ buses and 5,200+ operators. Founded by Prashant Kumar, Mratunjay Beniwal, and Ravi Verma, 2X founders with 15+ years together, having built and scaled consumer startups including Tipi Homes, OYO, and Flipkart. With over 300+ buses, Zingbus connects 500 cities and has completed 6 million+ journeys, powered by its proprietary tech stack, Zupiter. Backed by global marquee investors including BP Ventures, Info Edge, and Y Combinator, Zingbus is leading India’s ICE-to-electric bus transition, with EV buses already 10-22% cheaper to run and outperforming on occupancy.',
    founders: [
      { name: 'Prashant Kumar', role: 'CEO & Co-founder', linkedin: 'https://www.linkedin.com/in/prashant-kumar-80801931/' },
      { name: 'Mratunjay Beniwal', role: 'Co-founder', linkedin: 'https://www.linkedin.com/in/mratunjay-beniwal-60870626/' },
      { name: 'Ravi Kumar Verma', role: 'Co-founder & CTO', linkedin: 'https://www.linkedin.com/in/ravi-kumar-verma-b2946797/' },
    ],
    metrics: { stage: 'Series A', ask: '$9M', traction: '2M+ users across 300 cities · 70 operator partners · backed by bp Ventures, Info Edge Ventures, Y Combinator' },
    seed: seed([6, 7, 5, 8, 6, 7, 6, 5, 7, 6, 8, 7]),
  },
  {
    id: 'zypp-electric', name: 'Zypp Electric', sector: 'EV Logistics & Mobility', monogram: 'ZE',
    monoBg: '#16A34A', monoFg: '#FFFFFF',
    logo: '/logos/zypp-electric.jpg',
    website: 'https://zypp.app/',
    tagline: 'Electric two-wheelers, as-a-service, for India’s gig economy.',
    description: 'Zypp Electric is India’s leading tech-enabled EV rental platform, building the operating system for India’s gig economy, starting with mobility and expanding into financial identity, credit, and AI-powered earnings optimization for 100M gig entrepreneurs. Founded in 2017 by Akash Gupta, Rashi Agarwal, and Mukesh Singla, with a mission to make India carbon-free through a fully electric, IoT- and AI-enabled last-mile delivery ecosystem. Its proprietary FleetOS powers 28,000+ EVs across 8+ cities, delivering groceries, food, medicines, and e-commerce packages at 96% uptime and 12+ deliveries per EV daily. Beyond mobility, Zypp is driving real social impact, enabling 2.5 Lakh+ gig entrepreneurs with 27% higher take-home income, formal credit access via Zypp CIBIL, and 60M+ kg of CO₂ emissions saved.',
    founders: [
      { name: 'Akash Gupta', role: 'CEO & Co-founder', linkedin: 'https://www.linkedin.com/in/akashg/' },
      { name: 'Rashi Agarwal', role: 'Co-founder & COO', linkedin: 'https://www.linkedin.com/in/rashiagarwalzypp/' },
      { name: 'Mukesh Singla', role: 'Co-founder' },
    ],
    metrics: { stage: 'Series C', ask: '$15M', traction: '20,000+ e-scooters deployed · Rs 438 Cr FY25 revenue (+50% YoY) · backed by ENEOS, Goodyear Ventures' },
    seed: seed([7, 6, 8, 7, 6, 8, 7, 5, 7, 8, 6, 7]),
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
    ],
    metrics: { stage: 'Series B', ask: '$5M', traction: '$18.5M+ raised to date · 1,000+ hospital partners incl. Apollo · backed by Merck GHI Fund, Sony, Apis Partners, HealthQuad' },
    seed: seed([7, 8, 6, 7, 9, 6, 8, 7, 6, 8, 7, 6]),
  },
  {
    id: 'navadhan-capital', name: 'Navadhan Capital', sector: 'Fintech | Alternative Lending (Rural)', monogram: 'NC',
    monoBg: '#0891B2', monoFg: '#FFFFFF',
    logo: null, // TODO: add public/logos/navadhan-capital.jpg and set this path — falls back to the Logo.jsx mark until then
    website: 'https://www.navadhan.com/',
    tagline: 'Tech-led financing for India’s rural nano-enterprises.',
    description: 'Navadhan Capital is an RBI-registered NBFC building tech-led financing for India’s rural nano-enterprises, having disbursed ₹807 Cr to 46,000+ active loans across 5 states and 700+ PIN codes via its proprietary underwriting platform, AceN. Founded in 2019 by Nitin Agrawal, a 25-year BFSI veteran and former CEO of a listed NBFC, alongside a founding team with 80+ years of combined experience across ICICI, HDFC Bank, Amazon, and SAP. Operating a phygital model with 99%+ collection efficiency and sub-1% NNPA, Navadhan serves the "missing middle" households earning ₹4-40 lakh, above microfinance yet underserved by MSME lenders, addressing a $500 billion credit gap across India’s 70 million nano-enterprises, backed by marquee investors like Prime Venture Partners, NABVentures, and Gemba Capital.',
    founders: [
      { name: 'Nitin Agrawal', role: 'Founder & CEO' },
    ],
    metrics: { stage: 'TBD', ask: 'TBD', traction: '₹807 Cr disbursed · 46,000+ active loans · 5 states, 700+ PIN codes · backed by Prime Venture Partners, NABVentures, Gemba Capital' },
    seed: seed([6, 7, 6, 8, 5, 7, 6, 7, 8, 6, 7, 6]),
  },
  {
    id: 'kisankonnect', name: 'KisanKonnect', sector: 'AgriTech | D2C Fresh Food | Supply Chain', monogram: 'KK',
    monoBg: '#4D7C0F', monoFg: '#FFFFFF',
    logo: null, // TODO: add public/logos/kisankonnect.jpg and set this path — falls back to the Logo.jsx mark until then
    website: 'https://www.kisankonnect.com/',
    tagline: 'Farm-to-fork fresh essentials, delivered in hours.',
    description: 'KisanKonnect is building India’s leading habit-driven D2C fresh essentials platform, combining deep control over the fresh supply chain with a proprietary tech stack (KNET) and rapid delivery. With 8,000+ farmer partners, 45 delivery depots, and an omni-channel network of farm stores and app-based delivery, KisanKonnect delivers farm-to-fork in 8-36 hours at ~7% wastage versus the 10-15% industry average — backed by an industry-leading AOV of ₹475 and 3.0x monthly order frequency. Founded by Vivek Nirmal (Founder & CEO), with over two decades in dairy and fresh food supply chains and a former leadership role at Prabhat Dairy, and Nidhi Nirmal (Co-Founder), who leads brand, consumer experience, and growth.',
    founders: [
      { name: 'Vivek Nirmal', role: 'Founder & CEO' },
      { name: 'Nidhi Nirmal', role: 'Co-Founder' },
    ],
    metrics: { stage: 'TBD', ask: 'TBD', traction: '1 Mn+ app downloads · 170K active users · 1.0 Mn total customers · 8,000+ Kisan Partners · 45 delivery depots · 15 farm stores' },
    seed: seed([6, 6, 7, 7, 5, 6, 7, 6, 8, 6, 7, 6]),
  },
]

// Placeholder lineup for the Innovators section (route /gala) — no real company
// data yet and no rating. Every field below is a TODO: swap in the real tagline,
// description, founders and metrics before the event. The `id`s already have
// matching hand-drawn marks in components/Logo.jsx, so logos render as-is.
export const INNOVATOR_STARTUPS = [
  {
    id: 'nimbusgrid', name: 'NimbusGrid', sector: 'Cleantech / Energy', monogram: 'NG',
    monoBg: '#1D4ED8', monoFg: '#FFFFFF', logo: null,
    tagline: 'TODO placeholder — replace with NimbusGrid’s real one-line pitch.',
    description: 'TODO placeholder — replace with NimbusGrid’s real company description before the event.',
    founders: [{ name: 'Founder TBA', role: 'Founder (placeholder)' }],
    metrics: { stage: 'TBD', ask: 'TBD', traction: 'TODO placeholder — real traction numbers pending.' },
  },
  {
    id: 'medloop', name: 'MedLoop', sector: 'Healthtech', monogram: 'ML',
    monoBg: '#DB2777', monoFg: '#FFFFFF', logo: null,
    tagline: 'TODO placeholder — replace with MedLoop’s real one-line pitch.',
    description: 'TODO placeholder — replace with MedLoop’s real company description before the event.',
    founders: [{ name: 'Founder TBA', role: 'Founder (placeholder)' }],
    metrics: { stage: 'TBD', ask: 'TBD', traction: 'TODO placeholder — real traction numbers pending.' },
  },
  {
    id: 'cratewise', name: 'CrateWise', sector: 'Logistics', monogram: 'CW',
    monoBg: '#EA580C', monoFg: '#FFFFFF', logo: null,
    tagline: 'TODO placeholder — replace with CrateWise’s real one-line pitch.',
    description: 'TODO placeholder — replace with CrateWise’s real company description before the event.',
    founders: [{ name: 'Founder TBA', role: 'Founder (placeholder)' }],
    metrics: { stage: 'TBD', ask: 'TBD', traction: 'TODO placeholder — real traction numbers pending.' },
  },
  {
    id: 'fluentbee', name: 'FluentBee', sector: 'EdTech', monogram: 'FB',
    monoBg: '#CA8A04', monoFg: '#FFFFFF', logo: null,
    tagline: 'TODO placeholder — replace with FluentBee’s real one-line pitch.',
    description: 'TODO placeholder — replace with FluentBee’s real company description before the event.',
    founders: [{ name: 'Founder TBA', role: 'Founder (placeholder)' }],
    metrics: { stage: 'TBD', ask: 'TBD', traction: 'TODO placeholder — real traction numbers pending.' },
  },
  {
    id: 'terraform-farms', name: 'Terraform Farms', sector: 'AgriTech', monogram: 'TF',
    monoBg: '#16A34A', monoFg: '#FFFFFF', logo: null,
    tagline: 'TODO placeholder — replace with Terraform Farms’ real one-line pitch.',
    description: 'TODO placeholder — replace with Terraform Farms’ real company description before the event.',
    founders: [{ name: 'Founder TBA', role: 'Founder (placeholder)' }],
    metrics: { stage: 'TBD', ask: 'TBD', traction: 'TODO placeholder — real traction numbers pending.' },
  },
  {
    id: 'paylattice', name: 'PayLattice', sector: 'Fintech', monogram: 'PL',
    monoBg: '#7C3AED', monoFg: '#FFFFFF', logo: null,
    tagline: 'TODO placeholder — replace with PayLattice’s real one-line pitch.',
    description: 'TODO placeholder — replace with PayLattice’s real company description before the event.',
    founders: [{ name: 'Founder TBA', role: 'Founder (placeholder)' }],
    metrics: { stage: 'TBD', ask: 'TBD', traction: 'TODO placeholder — real traction numbers pending.' },
  },
]

export const initials = (name) =>
  name.split(' ').filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

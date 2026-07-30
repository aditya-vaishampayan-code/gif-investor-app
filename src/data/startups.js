export const MONEY_BY_SCORE = [0, 50, 100, 175, 275, 400, 550, 700, 850, 925, 1000]

export const formatMoney = (k) =>
  k >= 1000 ? `$${(k / 1000).toFixed(k % 1000 === 0 ? 0 : 1)}M` : `$${k}K`

export const formatMoneyFull = (k) =>
  k >= 1000 ? '$1,000,000' : `$${k}K`

const avg = (scores) => scores.reduce((a, b) => a + b, 0) / scores.length

const seed = (scores) => ({ avgScore: Math.round(avg(scores) * 10) / 10, raterCount: scores.length })

export const STARTUPS = [
  { id: 'nimbusgrid', name: 'NimbusGrid', sector: 'CleanTech',
    monogram: 'NG', monoBg: '#F06428', monoFg: '#FFFFFF',
    tagline: 'Intelligent grid orchestration for a decarbonised world.',
    description: 'NimbusGrid builds AI-powered software that balances renewable energy supply across distributed grids. Their platform reduces curtailment by 34% and integrates with existing utility infrastructure in under 90 days.',
    founders: [
      { name: 'Aisha Nkemdirim', role: 'CEO & Co-founder' },
      { name: 'Lars Eriksson', role: 'CTO & Co-founder' },
    ],
    metrics: { stage: 'Series A', ask: '$6M', traction: '18 utility partners · $1.1M ARR · 4.2GW managed' },
    seed: seed([7, 8, 6, 9, 7, 8, 5, 7, 8, 6, 7, 9]) },
  { id: 'medloop', name: 'MedLoop', sector: 'HealthTech',
    monogram: 'ML', monoBg: '#1B1714', monoFg: '#FFFFFF',
    tagline: 'Closing the loop between diagnosis and care.',
    description: 'MedLoop connects discharged patients with care coordinators through an automated follow-up platform. Early pilots show a 41% reduction in readmission rates across three NHS trusts.',
    founders: [
      { name: 'Dr. Priya Sharma', role: 'CEO & Co-founder' },
      { name: 'Tom Osei', role: 'COO' },
    ],
    metrics: { stage: 'Seed', ask: '$2.5M', traction: '3 NHS trusts · 12K patients · 41% readmission reduction' },
    seed: seed([6, 7, 5, 8, 6, 7, 8, 5, 6, 7, 6]) },
  { id: 'cratewise', name: 'CrateWise', sector: 'Logistics',
    monogram: 'CW', monoBg: '#F06428', monoFg: '#FFFFFF',
    tagline: 'The operating system for last-mile logistics.',
    description: 'CrateWise gives logistics operators real-time route intelligence and demand forecasting. Deployed by three national carriers, the platform has reduced last-mile cost per delivery by 28%.',
    founders: [
      { name: 'Marco Trevisan', role: 'CEO' },
      { name: 'Yuki Tanaka', role: 'CPO' },
    ],
    metrics: { stage: 'Series A', ask: '$8M', traction: '3 national carriers · 2.4M monthly deliveries · $3.2M ARR' },
    seed: seed([5, 6, 7, 5, 6, 8, 6, 7, 5, 6, 7]) },
  { id: 'fluentbee', name: 'FluentBee', sector: 'EdTech',
    monogram: 'FB', monoBg: '#1B1714', monoFg: '#FFFFFF',
    tagline: 'Language fluency through adaptive conversation.',
    description: 'FluentBee uses AI-driven conversation scenarios to teach professional language skills. Learners reach conversational fluency 40% faster than traditional methods across 12 languages.',
    founders: [
      { name: 'Sofia Andrade', role: 'CEO' },
      { name: 'James Kwong', role: 'CTO' },
    ],
    metrics: { stage: 'Seed', ask: '$1.8M', traction: '85K active learners · 92% 30-day retention · $420K ARR' },
    seed: seed([5, 6, 4, 7, 5, 6, 5, 7, 6, 5]) },
  { id: 'terraform-farms', name: 'TerraForm Farms', sector: 'AgTech',
    monogram: 'TF', monoBg: '#F06428', monoFg: '#FFFFFF',
    tagline: 'Precision agriculture at the scale of the climate crisis.',
    description: 'TerraForm Farms deploys sensor networks and predictive models across large-scale farmland, reducing water use by 31% and increasing yield by 18% on average across 40,000 acres under management.',
    founders: [
      { name: 'Chidera Okonkwo', role: 'CEO' },
      { name: 'Hana Mizuno', role: 'CTO' },
      { name: 'Pedro Vasconcelos', role: 'CFO' },
    ],
    metrics: { stage: 'Series B', ask: '$12M', traction: '40K acres managed · $8.4M ARR · Series B oversubscribed' },
    seed: seed([8, 7, 9, 8, 7, 8, 9, 7, 8, 7, 8, 9]) },
  { id: 'paylattice', name: 'PayLattice', sector: 'FinTech',
    monogram: 'PL', monoBg: '#1B1714', monoFg: '#FFFFFF',
    tagline: 'Cross-border payments infrastructure for emerging markets.',
    description: 'PayLattice enables businesses to send and receive payments across 22 African and Southeast Asian markets with settlement in under 60 seconds. Transaction volume grew 340% in 18 months.',
    founders: [
      { name: 'Kweku Mensah', role: 'CEO' },
      { name: 'Divya Patel', role: 'CTO' },
    ],
    metrics: { stage: 'Series A', ask: '$7M', traction: '$180M processed · 22 markets · 340% YoY growth' },
    seed: seed([7, 8, 7, 9, 8, 7, 8, 6, 7, 8]) },
  { id: 'quietdesk', name: 'QuietDesk', sector: 'Future of Work',
    monogram: 'QD', monoBg: '#F06428', monoFg: '#FFFFFF',
    tagline: 'Asynchronous work tools built for deep focus.',
    description: 'QuietDesk replaces real-time meeting culture with async video and structured decision docs. Teams using QuietDesk report 22 fewer meeting hours per week and a 35% improvement in self-reported focus.',
    founders: [
      { name: 'Ingrid Svensson', role: 'CEO & Co-founder' },
    ],
    metrics: { stage: 'Seed', ask: '$2M', traction: '4,200 paying teams · $1.8M ARR · 140% NRR' },
    seed: seed([6, 5, 7, 6, 5, 6, 7, 6, 5, 6]) },
  { id: 'aurorasense', name: 'AuroraSense', sector: 'DeepTech',
    monogram: 'AS', monoBg: '#1B1714', monoFg: '#FFFFFF',
    tagline: 'Environmental sensing at the speed of change.',
    description: 'AuroraSense manufactures ultra-low-power air quality sensors that self-calibrate using distributed ML. Deployed in 34 cities across Europe and Asia, processing 2.4 billion readings per day.',
    founders: [
      { name: 'Dr. Elena Sorokina', role: 'CEO' },
      { name: 'Ahmed Al-Rashid', role: 'CTO' },
    ],
    metrics: { stage: 'Series A', ask: '$9M', traction: '34 cities · 2.4B daily readings · $5.2M ARR' },
    seed: seed([7, 8, 6, 7, 8, 7, 8, 9, 7, 8, 7]) },
  { id: 'snackcircle', name: 'SnackCircle', sector: 'Consumer Tech',
    monogram: 'SC', monoBg: '#F06428', monoFg: '#FFFFFF',
    tagline: 'Social commerce for the creator snack economy.',
    description: 'SnackCircle lets food creators build curated product drops for their communities. GMV reached $4.2M in 8 months, with an average basket size 3.2× the direct-to-consumer category benchmark.',
    founders: [
      { name: 'Amara Diallo', role: 'CEO' },
      { name: 'Lucas Ferreira', role: 'CTO' },
    ],
    metrics: { stage: 'Seed', ask: '$1.5M', traction: '$4.2M GMV · 38K active buyers · 3.2× category basket' },
    seed: seed([4, 5, 6, 4, 5, 4, 6, 5, 4, 5]) },
  { id: 'vaultic', name: 'Vaultic', sector: 'CyberSec',
    monogram: 'VL', monoBg: '#1B1714', monoFg: '#FFFFFF',
    tagline: 'Zero-trust security for distributed enterprise infrastructure.',
    description: 'Vaultic provides a hardware-agnostic zero-trust network fabric, replacing legacy VPNs for enterprises with complex multi-cloud and hybrid environments. ARR grew from $2M to $14M in 24 months.',
    founders: [
      { name: 'Rachel Kim', role: 'CEO' },
      { name: 'Dmitri Volkov', role: 'CTO' },
    ],
    metrics: { stage: 'Series B', ask: '$15M', traction: '$14M ARR · 180 enterprise clients · 24-month 7× growth' },
    seed: seed([8, 9, 8, 7, 9, 8, 9, 8, 7, 8, 9]) },
]

export const initials = (name) =>
  name.split(' ').filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

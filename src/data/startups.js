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
    seed: avg([6, 7, 5, 8, 6, 7, 6, 5, 7, 6, 8, 7]),
  },
  {
    id: 'rooter', name: 'Rooter', sector: 'Gaming', monogram: 'RT',
    monoBg: '#7C3AED', monoFg: '#FFFFFF',
    logo: '/logos/rooter.jpg',
    website: 'https://www.rooter.gg/',
    tagline: 'India\u2019s largest game-streaming and esports content platform.',
    description: 'Rooter is India\u2019s largest integrated platform for gaming, live streaming, and in-app purchase (IAP) commerce, blending the functionality of Twitch and Steam for mobile-first gamers. By combining game content, creator monetization, and digital goods commerce, Rooter is redefining how India\u2019s 500M+ gamers engage and transact. Founded by Piyush Kumar (ex-Swatch Group, Dish TV) and Dipesh Agarwal, 9+ year veterans of scaling Rooter across India\u2019s gaming and media ecosystem. With 85M+ users and strong revenue momentum, Rooter is building a creator-led gaming commerce ecosystem addressing inefficiencies in discovery, monetization, and platform commissions. Backed by marquee investors including Lightbox, Pivot Ventures, 100Unicorns, Paytm, Boman Irani, March Capital, and Duane Park.',
    founders: [
      { name: 'Piyush Kumar', role: 'CEO & Co-founder', linkedin: 'https://www.linkedin.com/in/writetopiyush/' },
      { name: 'Dipesh Agarwal', role: 'Co-founder & COO', linkedin: 'https://www.linkedin.com/in/agarwal-dipesh/' },
      { name: 'Akshat Goel', role: 'Co-founder & CTO' },
    ],
    metrics: { stage: 'Growth', ask: '$16M', traction: '80M+ app installs · ~17M MAUs · $7M ARR · backed by March Capital, Lightbox, Paytm' },
    seed: avg([8, 7, 9, 6, 8, 7, 9, 8, 6, 7, 8, 9]),
  },
  {
    id: 'zypp-electric', name: 'Zypp Electric', sector: 'EV Logistics & Mobility', monogram: 'ZE',
    monoBg: '#16A34A', monoFg: '#FFFFFF',
    logo: '/logos/zypp-electric.jpg',
    website: 'https://zypp.app/',
    tagline: 'Electric two-wheelers, as-a-service, for India\u2019s gig economy.',
    description: 'Zypp Electric is India\u2019s leading tech-enabled EV rental platform, building the operating system for India\u2019s gig economy, starting with mobility and expanding into financial identity, credit, and AI-powered earnings optimization for 100M gig entrepreneurs. Founded in 2017 by Akash Gupta, Rashi Agarwal, and Mukesh Singla, with a mission to make India carbon-free through a fully electric, IoT- and AI-enabled last-mile delivery ecosystem. Its proprietary FleetOS powers 28,000+ EVs across 8+ cities, delivering groceries, food, medicines, and e-commerce packages at 96% uptime and 12+ deliveries per EV daily. Beyond mobility, Zypp is driving real social impact, enabling 2.5 Lakh+ gig entrepreneurs with 27% higher take-home income, formal credit access via Zypp CIBIL, and 60M+ kg of CO\u2082 emissions saved.',
    founders: [
      { name: 'Akash Gupta', role: 'CEO & Co-founder', linkedin: 'https://www.linkedin.com/in/akashg/' },
      { name: 'Rashi Agarwal', role: 'Co-founder & COO', linkedin: 'https://www.linkedin.com/in/rashiagarwalzypp/' },
      { name: 'Tushar Mehta', role: 'Co-founder & COO', linkedin: 'https://www.linkedin.com/in/tushar-mehta-26859311/' },
    ],
    metrics: { stage: 'Series C', ask: '$15M', traction: '20,000+ e-scooters deployed · Rs 438 Cr FY25 revenue (+50% YoY) · backed by ENEOS, Goodyear Ventures' },
    seed: avg([7, 6, 8, 7, 6, 8, 7, 5, 7, 8, 6, 7]),
  },
  {
    id: 'impactguru', name: 'ImpactGuru', sector: 'Healthcare', monogram: 'IG',
    monoBg: '#DC2626', monoFg: '#FFFFFF',
    logo: '/logos/impact-guru.jpg',
    website: 'https://www.impactguru.com/',
    tagline: 'Crowdfunding and financing to make healthcare affordable.',
    description: 'ImpactGuru is India\u2019s leading medical crowdfunding platform, having enabled 50K+ patients and 50L+ donors to raise over ₹1,500 Cr for life-saving treatment, becoming the default lifeline for millions battling India\u2019s low insurance penetration. Founded in 2014 by Piyush Jain and Khushboo Jain, ex-J.P. Morgan and BCG, who left careers in investment banking and design to build India\u2019s first dedicated healthcare crowdfunding platform, incubated at Harvard Innovation Lab. Powered by a 50L+ strong donor community across 15+ countries, ImpactGuru has turned everyday generosity into life-saving outcomes for over a lakh families, backed by marquee investors like Sony Group, HealthQuad, and Apollo Hospitals — proof that its asset-light, tech-first model has scaled into India\u2019s most credible bridge between medical urgency and financial access.',
    founders: [
      { name: 'Piyush Jain', role: 'CEO & Co-founder', linkedin: 'https://www.linkedin.com/in/piyushcrjain/' },
      { name: 'Khushboo Jain', role: 'Co-founder', linkedin: 'https://www.linkedin.com/in/khushboopjain/' },
    ],
    metrics: { stage: 'Series B', ask: '$5M', traction: '$21M+ raised to date · hospital network incl. Apollo · backed by Venture Catalysts, RB Investments' },
    seed: avg([7, 8, 6, 7, 9, 6, 8, 7, 6, 8, 7, 6]),
  },
  {
    id: 'rare-planet', name: 'Rare Planet', sector: 'Retail Consumer', monogram: 'RP',
    monoBg: '#EA580C', monoFg: '#FFFFFF',
    logo: '/logos/rare-planet.jpg',
    website: 'https://rareplanet.com/',
    tagline: 'Reviving Indian handicrafts, one artisan at a time.',
    description: 'Rare Planet is India’s largest airport handicraft retailer, empowering 25,000+ rural artisans across 32+ stores nationwide while preserving India’s craft heritage under the AtmaNirbhar Bharat mission. Founded in 2015 by Ranodeep Saha, an IIIT Kolkata computer science graduate who started the business while still in college, and later joined by co-founder Vijay Kumar, an experienced luxury and airport retail executive. Curating 10+ product categories, from hand-painted ceramics to textiles, jewellery, and wooden toys, Rare Planet has built a sustainable ecosystem that gives artisans fair wages and market access, showcasing the beauty of Indian craftsmanship to travellers across every state of India.',
    founders: [
      { name: 'Ranodeep Saha', role: 'CEO & Founder', linkedin: 'https://www.linkedin.com/in/ranodeep-saha-rareplanet/' },
      { name: 'Vijay Kumar TR', role: 'Co-founder' },
    ],
    metrics: { stage: 'Series A', ask: '$2M', traction: '10,000+ artisans in 23 states · 35+ airport stores · Rs 40 Cr revenue · backed by Adani family, Venture Catalysts' },
    seed: avg([6, 7, 5, 6, 8, 7, 5, 6, 7, 6, 8, 7]),
  },
]

export const initials = (name) =>
  name.split(' ').filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

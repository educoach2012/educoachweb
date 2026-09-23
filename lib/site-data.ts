export const contact = {
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsapp: '919876543210',
  whatsappMessage: 'Hi EduCoach, I would like to book an assessment session.',
  email: 'hello@educoach.in',
  address: '3rd Floor, Prestige Tower, MG Road, Bengaluru, Karnataka 560001',
}

export function whatsappHref() {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`
}

export type NavChild = { title: string; href: string; desc?: string }
export type NavItem = { title: string; href: string; children?: NavChild[] }

export const navItems: NavItem[] = [
  { title: 'About', href: '/about' },
  {
    title: 'Services',
    href: '/services',
    children: [
      { title: 'Career Counselling', href: '/services#career', desc: 'Psychometric-led career discovery' },
      { title: 'Profile Building', href: '/services#profile', desc: 'Stand out beyond grades' },
      { title: 'UG Admissions', href: '/services#ug', desc: 'Undergraduate applications' },
      { title: 'PG Admissions', href: '/services#pg', desc: 'Masters & research pathways' },
      { title: 'Test Preparation', href: '/services#test', desc: 'SAT, IELTS, TOEFL, GRE' },
      { title: 'Scholarship Guidance', href: '/services#scholarship', desc: 'Fund your ambition' },
      { title: 'Visa Assistance', href: '/services#visa', desc: 'End-to-end visa support' },
      { title: 'Boarding Schools', href: '/services#boarding', desc: 'Global school placements' },
    ],
  },
  {
    title: 'Countries',
    href: '/countries',
    children: [
      { title: 'United Kingdom', href: '/countries/uk', desc: 'Russell Group & beyond' },
      { title: 'United States', href: '/countries/usa', desc: 'Ivy League & top research' },
      { title: 'Canada', href: '/countries/canada', desc: 'PR-friendly pathways' },
      { title: 'Australia', href: '/countries/australia', desc: 'Group of Eight' },
      { title: 'Singapore', href: '/countries/singapore', desc: 'Asia\'s education hub' },
      { title: 'Europe', href: '/countries/europe', desc: 'Low-cost, high-quality' },
      { title: 'UAE', href: '/countries/uae', desc: 'Global campuses' },
      { title: 'India', href: '/countries/india', desc: 'Premier institutes' },
    ],
  },
  { title: 'Success Stories', href: '/success-stories' },
  { title: 'Events', href: '/events' },
  { title: 'Team', href: '/team' },
  { title: 'Contact', href: '/contact' },
]

export const countries = [
  { slug: 'uk', name: 'United Kingdom', flag: '🇬🇧', tagline: '1-year masters, world-class research', universities: '150+' },
  { slug: 'usa', name: 'United States', flag: '🇺🇸', tagline: 'Ivy League and top research universities', universities: '400+' },
  { slug: 'canada', name: 'Canada', flag: '🇨🇦', tagline: 'Affordable, PR-friendly pathways', universities: '120+' },
  { slug: 'australia', name: 'Australia', flag: '🇦🇺', tagline: 'Group of Eight and vibrant campuses', universities: '90+' },
  { slug: 'singapore', name: 'Singapore', flag: '🇸🇬', tagline: 'Asia\'s premier education hub', universities: '20+' },
  { slug: 'europe', name: 'Europe', flag: '🇪🇺', tagline: 'Low tuition, high quality, in English', universities: '200+' },
  { slug: 'uae', name: 'UAE', flag: '🇦🇪', tagline: 'Global campuses close to home', universities: '40+' },
  { slug: 'india', name: 'India', flag: '🇮🇳', tagline: 'Premier institutes and deemed universities', universities: '300+' },
]

export const services = [
  {
    id: 'career', title: 'Career Counselling', desc: 'Psychometric assessment plus 1:1 guidance to map strengths to real-world careers.', icon: 'Compass',
    longDesc: 'Our career counselling begins with a comprehensive psychometric assessment that maps your aptitudes, interests and personality to real-world career paths. A dedicated counsellor then works with you to shortlist the right courses, universities and countries — ensuring every choice aligns with your long-term goals.',
    features: ['Psychometric profiling (aptitude + personality)', 'One-on-one career mapping sessions', 'Course and university shortlisting', 'Industry-aligned career path planning', 'Parent counselling and alignment sessions'],
  },
  {
    id: 'profile', title: 'Profile Building', desc: 'Research, olympiads, internships and projects that make your application unforgettable.', icon: 'Sparkles',
    longDesc: 'Top universities look beyond grades. We design a personalised profile-building roadmap that includes research projects, internships, olympiads, community service and extracurricular achievements — all curated to make your application stand out in a competitive applicant pool.',
    features: ['Personalised extracurricular roadmap', 'Research project mentoring', 'Internship and volunteering guidance', 'Olympiad and competition strategy', 'Portfolio and achievement documentation'],
  },
  {
    id: 'ug', title: 'UG Admissions', desc: 'End-to-end support for undergraduate applications across 30+ countries.', icon: 'GraduationCap',
    longDesc: 'From university shortlisting to final enrolment, we manage every step of the undergraduate application process. Our counsellors have placed students in the world\'s top universities and understand what each institution values in an applicant.',
    features: ['Strategic university shortlisting', 'Common App and UCAS management', 'Essay brainstorming and review', 'Interview preparation', 'Offer evaluation and decision support'],
  },
  {
    id: 'pg', title: 'PG Admissions', desc: 'Masters, MBA and research applications with tailored SOPs and LORs.', icon: 'BookOpen',
    longDesc: 'Postgraduate applications demand precision — the right programme match, compelling statements of purpose, and strong letters of recommendation. We work closely with you to craft applications that reflect your academic depth and professional aspirations.',
    features: ['Programme and supervisor matching', 'SOP and personal statement crafting', 'LOR strategy and guidance', 'Research proposal development', 'MBA application and interview coaching'],
  },
  {
    id: 'boarding', title: 'Boarding Schools', desc: 'Placements into elite boarding schools in the UK, Switzerland and beyond.', icon: 'School',
    longDesc: 'We help families find the right boarding school for their child — factoring in academic rigour, pastoral care, location and budget. Our network covers elite schools across the UK, Switzerland, USA and Singapore.',
    features: ['School shortlisting and campus insights', 'Application and entrance exam prep', 'Interview coaching for students and parents', 'Scholarship applications', 'Transition and settling-in support'],
  },
  {
    id: 'test', title: 'Test Preparation', desc: 'Structured prep for SAT, IELTS, TOEFL, GRE and GMAT with proven mentors.', icon: 'PencilRuler',
    longDesc: 'Our structured test preparation programmes are designed to maximise scores in the shortest time. With experienced mentors, targeted practice material and regular mock tests, students consistently outperform their baselines.',
    features: ['SAT, IELTS, TOEFL, GRE, GMAT prep', 'Diagnostic test and study plan', 'Weekly mock tests and analytics', 'One-on-one doubt sessions', 'Score improvement guarantee'],
  },
  {
    id: 'scholarship', title: 'Scholarship Guidance', desc: 'Identify and win merit and need-based scholarships worth crores.', icon: 'Award',
    longDesc: 'Scholarships can transform the economics of studying abroad. We maintain an updated database of merit, need-based and country-specific scholarships, and help you craft applications that maximise your chances of funding.',
    features: ['Scholarship database and matching', 'Application essay and portfolio preparation', 'Financial aid and fee negotiation', 'External scholarship sourcing', 'Bursary and grant identification'],
  },
  {
    id: 'visa', title: 'Visa Assistance', desc: 'Documentation, mock interviews and end-to-end visa filing support.', icon: 'Plane',
    longDesc: 'A visa rejection can derail months of effort. Our visa team handles documentation, financial proof preparation, mock interviews and filing — giving you the confidence that your application is thorough and compliant.',
    features: ['Document checklist and review', 'Financial documentation guidance', 'Mock visa interviews', 'Application filing and tracking', 'Post-visa pre-departure briefing'],
  },
]

export const whyCards = [
  { title: 'Psychometric Assessment', desc: 'Science-backed profiling to find the right-fit path, not a random one.', icon: 'Brain' },
  { title: 'Dedicated Counsellor', desc: 'One expert who owns your journey from discovery to departure.', icon: 'UserCheck' },
  { title: 'Profile Building', desc: 'Curated projects and experiences that make admissions officers notice.', icon: 'Sparkles' },
  { title: 'Essay Guidance', desc: 'Authentic, compelling essays and SOPs that tell your real story.', icon: 'PenLine' },
  { title: 'Scholarship Support', desc: 'Strategic applications that maximise your funding potential.', icon: 'Award' },
  { title: 'Visa Support', desc: 'Confident, well-prepared interviews and clean documentation.', icon: 'ShieldCheck' },
  { title: 'Parent Guidance', desc: 'Transparent updates and planning sessions for the whole family.', icon: 'Users' },
  { title: 'Career Planning', desc: 'A long-term view that connects your degree to your ambitions.', icon: 'TrendingUp' },
]

export const steps = [
  { title: 'Discover', desc: 'Understand your goals, strengths and constraints.', longDesc: 'We start with a deep conversation — understanding your academic background, interests, family expectations and long-term ambitions. This forms the foundation for every decision that follows.' },
  { title: 'Assess', desc: 'Psychometric and academic evaluation.', longDesc: 'Using validated psychometric tools, we map your aptitudes, personality traits and learning style. Combined with your academic profile, this gives us a science-backed picture of where you\'ll thrive.' },
  { title: 'Counsel', desc: 'Map right-fit courses, universities and countries.', longDesc: 'Your dedicated counsellor shortlists courses, universities and countries that align with your profile and goals. Every recommendation is backed by data on acceptance rates, outcomes and fit.' },
  { title: 'Profile Building', desc: 'Build the experiences that set you apart.', longDesc: 'We design a personalised roadmap of research, internships, projects and extracurriculars that strengthen your application. This isn\'t generic advice — it\'s curated to match what your target universities value.' },
  { title: 'Applications', desc: 'Essays, SOPs, LORs and submissions done right.', longDesc: 'From brainstorming essay topics to final submission, we guide every element. Your counsellor reviews multiple drafts, ensuring your authentic voice shines through while meeting each university\'s expectations.' },
  { title: 'Offers', desc: 'Compare, negotiate and choose the best offer.', longDesc: 'When offers arrive, we help you evaluate them holistically — considering rankings, scholarships, location, career outcomes and visa pathways — so you make the right choice, not just the obvious one.' },
  { title: 'Visa', desc: 'Documentation and interview preparation.', longDesc: 'Our visa team prepares your documentation, conducts mock interviews and files your application. We\'ve handled thousands of visa cases and know what consulates look for.' },
  { title: 'Departure', desc: 'Pre-departure briefing and settling-in support.', longDesc: 'Before you fly, we cover everything — accommodation, banking, SIM cards, cultural tips and airport logistics. You leave with confidence, and your family leaves with peace of mind.' },
]

export const stats = [
  { value: 13, suffix: '+', label: 'Years of experience' },
  { value: 2500, suffix: '+', label: 'Students counselled' },
  { value: 1000, suffix: '+', label: 'Admission offers' },
  { value: 30, suffix: '+', label: 'Countries covered' },
]

export const successStories = [
  { name: 'Ananya Sharma', university: 'University of Oxford', country: 'United Kingdom', course: 'PPE', scholarship: '£25,000', year: 2025, quote: 'EduCoach turned my scattered ideas into a story Oxford couldn\'t ignore.' },
  { name: 'Rohan Mehta', university: 'Stanford University', country: 'United States', course: 'Computer Science', scholarship: '$40,000', year: 2025, quote: 'The profile-building roadmap made all the difference in my application.' },
  { name: 'Ishita Nair', university: 'University of Toronto', country: 'Canada', course: 'Biotechnology', scholarship: 'CA$18,000', year: 2024, quote: 'From SOPs to visa, every step felt handled and human.' },
  { name: 'Kabir Singh', university: 'University of Melbourne', country: 'Australia', course: 'Data Science', scholarship: 'AU$20,000', year: 2024, quote: 'My counsellor believed in me before I did. Now I\'m in the Group of Eight.' },
  { name: 'Meera Iyer', university: 'National University of Singapore', country: 'Singapore', course: 'Business Analytics', scholarship: 'S$15,000', year: 2025, quote: 'Strategic, calm and genuinely invested in my future.' },
  { name: 'Arjun Rao', university: 'TU Munich', country: 'Europe', course: 'Mechanical Engineering', scholarship: 'Full tuition', year: 2024, quote: 'They found a fully-funded pathway I didn\'t know existed.' },
]

export const experts = [
  { name: 'Dr. Priya Menon', role: 'Founder & Lead Counsellor', experience: '16 years', specialisation: 'UK & US Admissions', countries: 'UK, USA', bio: 'Dr. Priya founded EduCoach with a vision to bring research-backed career counselling to Indian students. With a doctorate in Education Psychology from UCL, she has personally mentored over 800 students into top global universities.' },
  { name: 'Sameer Kapoor', role: 'Senior Career Counsellor', experience: '12 years', specialisation: 'Career Discovery & PG', countries: 'Canada, Australia', bio: 'Sameer specialises in postgraduate admissions and career discovery. An alumnus of the University of Toronto, he brings first-hand experience of the international education landscape and has guided students to scholarships worth over ₹15 crore.' },
  { name: 'Neha Verma', role: 'Profile & Essay Strategist', experience: '9 years', specialisation: 'Ivy League Essays', countries: 'USA, Singapore', bio: 'Neha is known for her ability to draw out authentic, compelling narratives from students. Her essay strategy has helped secure admissions to Stanford, Columbia, NUS and other highly selective institutions.' },
  { name: 'Aditya Bose', role: 'Visa & Finance Advisor', experience: '11 years', specialisation: 'Visa & Scholarships', countries: 'Europe, UAE', bio: 'Aditya manages visa applications and scholarship strategy across European and Middle Eastern institutions. With a near-perfect visa approval record, he ensures no application falls through the cracks.' },
]

export const events = [
  { title: 'UK Universities Masterclass', date: '2026-08-22', mode: 'Online', city: 'Live Webinar', spots: 'Limited seats' },
  { title: 'US Ivy League Profile Workshop', date: '2026-09-05', mode: 'In-person', city: 'Bengaluru', spots: '30 seats' },
  { title: 'Study in Canada — Parent Session', date: '2026-09-19', mode: 'Online', city: 'Live Webinar', spots: 'Free entry' },
]

export const blogs = [
  { title: 'How to Build a Standout University Profile in Class 11', category: 'Admissions', minutes: 7, slug: 'standout-profile-class-11' },
  { title: '2026 Scholarship Guide: Funding Your Study Abroad Dream', category: 'Scholarships', minutes: 9, slug: 'scholarship-guide-2026' },
  { title: 'SAT vs ACT: Which Test Is Right for You?', category: 'SAT', minutes: 6, slug: 'sat-vs-act' },
  { title: 'IELTS in 30 Days: A Realistic Study Plan', category: 'IELTS', minutes: 8, slug: 'ielts-30-day-plan' },
  { title: 'UK vs USA for Undergrad: An Honest Comparison', category: 'Country Guides', minutes: 10, slug: 'uk-vs-usa-undergrad' },
  { title: 'A Parent\'s Guide to Study Abroad Costs', category: 'Parent Guides', minutes: 7, slug: 'parents-guide-costs' },
]

export const faqs = [
  { q: 'When is the right time to start counselling?', a: 'The earlier the better — ideally in Grade 9 or 10 so we can build a strong profile over time. That said, we support students at every stage, including last-minute applicants.' },
  { q: 'What happens in an assessment session?', a: 'We understand your goals, run a psychometric assessment, review your academics, and give you a clear, personalised roadmap toward the right courses and universities.' },
  { q: 'Which countries and universities do you cover?', a: 'We cover the UK, USA, Canada, Australia, Singapore, Europe, UAE and India, working with top global universities across all major disciplines.' },
  { q: 'Do you help with scholarships and visas?', a: 'Yes. Scholarship strategy and end-to-end visa support — including documentation and mock interviews — are core parts of our service.' },
  { q: 'How are you different from other consultancies?', a: 'We combine science-backed psychometric assessment, a dedicated counsellor, and genuine profile building — not just application form-filling.' },
]

export const aboutContent = {
  mission: 'To empower every student to discover their true potential and access world-class education — regardless of where they start.',
  vision: 'To be India\'s most trusted name in study-abroad counselling, known for integrity, depth and outcomes.',
  foundedYear: 2013,
  story: [
    'EduCoach Services was founded in 2013 by Dr. Priya Menon, a UCL-trained education psychologist who saw a gap in how Indian students were being guided toward international education. Too many consultancies focused on form-filling; too few invested in understanding the student.',
    'Starting from a small office in Bengaluru, EduCoach pioneered the use of psychometric assessment in study-abroad counselling — matching students to courses and careers based on science, not guesswork. Over 13 years, this approach has helped over 2,500 students secure admission to top universities across 30+ countries.',
    'Today, EduCoach is a team of dedicated counsellors, essay strategists, visa experts and test-prep mentors — all working toward one goal: ensuring every student finds the right university, builds the right profile, and leaves with the right offer.',
  ],
  values: [
    { title: 'Student First', desc: 'Every decision starts with what\'s best for the student — not what\'s easiest for us.' },
    { title: 'Science-Backed', desc: 'Psychometric assessment and data-driven shortlisting replace guesswork.' },
    { title: 'Transparency', desc: 'No hidden fees, no commission-driven recommendations, no surprises.' },
    { title: 'End-to-End Ownership', desc: 'One counsellor owns your journey from the first call to departure day.' },
  ],
}

export const countryDetails: Record<string, {
  overview: string
  whyStudyHere: string[]
  topUniversities: { name: string; ranking: string; city: string }[]
  intakes: string
  averageCost: string
  visaInfo: string
}> = {
  uk: {
    overview: 'The United Kingdom is home to some of the world\'s oldest and most prestigious universities. With 1-year master\'s programmes, a strong research culture and a globally recognised degree, the UK remains a top choice for Indian students seeking quality and efficiency.',
    whyStudyHere: ['1-year master\'s programmes save time and money', 'Russell Group universities ranked among the global top 100', 'Strong post-study work visa (Graduate Route — 2 years)', 'Rich cultural experience across England, Scotland, Wales and Northern Ireland', 'Wide range of scholarships including Chevening and Commonwealth'],
    topUniversities: [
      { name: 'University of Oxford', ranking: '#1 World', city: 'Oxford' },
      { name: 'University of Cambridge', ranking: '#2 UK', city: 'Cambridge' },
      { name: 'Imperial College London', ranking: '#6 World', city: 'London' },
      { name: 'UCL', ranking: '#9 World', city: 'London' },
      { name: 'University of Edinburgh', ranking: '#22 World', city: 'Edinburgh' },
    ],
    intakes: 'September (main), January (limited)',
    averageCost: '£15,000 – £35,000 per year',
    visaInfo: 'Student Visa (Tier 4) required. EduCoach provides end-to-end visa support including financial documentation, CAS letter guidance and mock interviews.',
  },
  usa: {
    overview: 'The United States offers unmatched academic diversity — from liberal arts colleges to Ivy League research universities. With a flexible curriculum, world-class faculty and a vibrant campus culture, the US continues to attract the best minds globally.',
    whyStudyHere: ['Home to 8 of the world\'s top 10 universities', 'Flexible curriculum with major/minor system', 'OPT allows 1–3 years of post-study work', 'Strong alumni networks and career services', 'Extensive financial aid and merit scholarships'],
    topUniversities: [
      { name: 'Stanford University', ranking: '#2 World', city: 'Stanford, CA' },
      { name: 'MIT', ranking: '#1 World (Engineering)', city: 'Cambridge, MA' },
      { name: 'Harvard University', ranking: '#4 World', city: 'Cambridge, MA' },
      { name: 'Columbia University', ranking: '#12 World', city: 'New York, NY' },
      { name: 'University of Chicago', ranking: '#13 World', city: 'Chicago, IL' },
    ],
    intakes: 'Fall (main — August/September), Spring (January)',
    averageCost: '$25,000 – $60,000 per year',
    visaInfo: 'F-1 Student Visa required. Our team guides you through I-20, SEVIS fee, DS-160 and visa interview preparation.',
  },
  canada: {
    overview: 'Canada combines world-class education with one of the most welcoming immigration policies for international students. PR-friendly pathways, affordable tuition compared to the US and UK, and a safe, multicultural environment make Canada a top destination.',
    whyStudyHere: ['Direct pathway to Permanent Residency (PR)', 'Affordable tuition compared to US and UK', 'PGWP allows 1–3 years of post-study work', 'Safe, multicultural cities consistently ranked for quality of life', 'Co-op programmes integrate work experience into degrees'],
    topUniversities: [
      { name: 'University of Toronto', ranking: '#21 World', city: 'Toronto' },
      { name: 'University of British Columbia', ranking: '#34 World', city: 'Vancouver' },
      { name: 'McGill University', ranking: '#30 World', city: 'Montreal' },
      { name: 'University of Waterloo', ranking: '#112 World', city: 'Waterloo' },
      { name: 'University of Alberta', ranking: '#111 World', city: 'Edmonton' },
    ],
    intakes: 'September (main), January, May (limited)',
    averageCost: 'CA$20,000 – CA$45,000 per year',
    visaInfo: 'Study Permit required. Canada\'s student visa process is straightforward with our guidance on GIC, SDS stream and biometrics.',
  },
  australia: {
    overview: 'Australia\'s Group of Eight universities rank among the world\'s best, and the country offers a laid-back lifestyle, strong research opportunities and post-study work rights that make it a favourite for Indian students.',
    whyStudyHere: ['Group of Eight universities in world top 100', 'Post-study work visa of 2–4 years', 'High quality of life and safety', 'Strong research funding and industry partnerships', 'Part-time work allowed during studies'],
    topUniversities: [
      { name: 'University of Melbourne', ranking: '#14 World', city: 'Melbourne' },
      { name: 'University of Sydney', ranking: '#19 World', city: 'Sydney' },
      { name: 'UNSW Sydney', ranking: '#19 World', city: 'Sydney' },
      { name: 'Australian National University', ranking: '#30 World', city: 'Canberra' },
      { name: 'Monash University', ranking: '#42 World', city: 'Melbourne' },
    ],
    intakes: 'February (main), July',
    averageCost: 'AU$25,000 – AU$50,000 per year',
    visaInfo: 'Student Visa (subclass 500) required. We assist with GTE statement, financial evidence and health insurance (OSHC).',
  },
  singapore: {
    overview: 'Singapore is Asia\'s premier education hub — compact, safe and globally connected. Its universities rank in the world\'s top 15, and the city-state offers strong industry links, especially in finance, technology and biomedical sciences.',
    whyStudyHere: ['NUS and NTU consistently in world top 15', 'Strategic location in Asia with global connections', 'Strong industry links in finance and tech', 'Safe, clean and multicultural city', 'Generous government-funded scholarships (with bond)'],
    topUniversities: [
      { name: 'National University of Singapore', ranking: '#8 World', city: 'Singapore' },
      { name: 'Nanyang Technological University', ranking: '#15 World', city: 'Singapore' },
      { name: 'Singapore Management University', ranking: 'Top 50 (Business)', city: 'Singapore' },
    ],
    intakes: 'August (main), January (limited)',
    averageCost: 'S$15,000 – S$40,000 per year',
    visaInfo: 'Student Pass required. Application is university-facilitated; we help with documentation and ICA submission.',
  },
  europe: {
    overview: 'Continental Europe offers high-quality education at a fraction of the cost — many countries charge little to no tuition for international students. With programmes taught in English across Germany, Netherlands, France, Ireland and more, Europe is an increasingly popular choice.',
    whyStudyHere: ['Low or zero tuition in Germany, Norway, and others', 'Growing number of English-taught programmes', 'Schengen visa allows easy travel across 27 countries', 'Strong engineering, business and design programmes', 'Rich cultural immersion and language learning'],
    topUniversities: [
      { name: 'TU Munich', ranking: '#37 World', city: 'Munich, Germany' },
      { name: 'ETH Zurich', ranking: '#7 World', city: 'Zurich, Switzerland' },
      { name: 'University of Amsterdam', ranking: '#53 World', city: 'Amsterdam, Netherlands' },
      { name: 'Trinity College Dublin', ranking: '#81 World', city: 'Dublin, Ireland' },
      { name: 'Sciences Po', ranking: 'Top 5 (Political Science)', city: 'Paris, France' },
    ],
    intakes: 'September/October (main), February (limited)',
    averageCost: '€0 – €20,000 per year (varies by country)',
    visaInfo: 'National visa (Type D) required for the specific country. We guide documentation for Germany\'s blocked account, France\'s Campus France, Netherlands\' Nuffic, etc.',
  },
  uae: {
    overview: 'The UAE has rapidly emerged as a global education hub, hosting branch campuses of world-renowned universities. Close to India, tax-free and with a booming job market, the UAE is ideal for students seeking global exposure without going far from home.',
    whyStudyHere: ['Branch campuses of NYU, Sorbonne, Heriot-Watt and more', 'Close proximity to India (3–4 hour flight)', 'Tax-free income and strong job market', 'Safe, modern and multicultural environment', 'Growing startup and innovation ecosystem'],
    topUniversities: [
      { name: 'NYU Abu Dhabi', ranking: 'Highly Selective', city: 'Abu Dhabi' },
      { name: 'Khalifa University', ranking: '#181 World', city: 'Abu Dhabi' },
      { name: 'University of Sharjah', ranking: 'Top 300 World', city: 'Sharjah' },
      { name: 'Heriot-Watt University Dubai', ranking: 'UK Top 30', city: 'Dubai' },
      { name: 'Sorbonne University Abu Dhabi', ranking: 'France Top 5', city: 'Abu Dhabi' },
    ],
    intakes: 'September (main), January',
    averageCost: 'AED 30,000 – AED 80,000 per year',
    visaInfo: 'Student Residence Visa sponsored by the university. We assist with documentation, medical fitness and Emirates ID.',
  },
  india: {
    overview: 'India\'s premier institutes — IITs, IIMs, AIIMS, NLUs and top private universities — offer world-class education at competitive costs. For students who prefer to stay close to home or are targeting competitive entrance exams, India remains a strong choice.',
    whyStudyHere: ['IITs and IIMs ranked among Asia\'s best', 'Competitive tuition compared to international options', 'Strong alumni networks in India and globally', 'Emerging research ecosystem with growing funding', 'Diverse programme options across disciplines'],
    topUniversities: [
      { name: 'IIT Bombay', ranking: '#118 World', city: 'Mumbai' },
      { name: 'IIT Delhi', ranking: '#150 World', city: 'New Delhi' },
      { name: 'IISc Bangalore', ranking: '#225 World', city: 'Bengaluru' },
      { name: 'IIM Ahmedabad', ranking: 'Top 50 (MBA)', city: 'Ahmedabad' },
      { name: 'BITS Pilani', ranking: 'India Top 10', city: 'Pilani' },
    ],
    intakes: 'July/August (main), January (limited PG)',
    averageCost: '₹2,00,000 – ₹25,00,000 per year',
    visaInfo: 'No visa required for Indian students. EduCoach assists with entrance exam strategy, application management and counselling seat acceptance.',
  },
}

export const blogContent: Record<string, {
  body: string[]
  author: string
  publishedDate: string
}> = {
  'standout-profile-class-11': {
    body: [
      'Building a standout university profile isn\'t something you start in Class 12 — the strongest applications are built over years of intentional effort, and Class 11 is the ideal starting point.',
      'Top universities look beyond grades. They want to see intellectual curiosity, leadership, community engagement, and a clear narrative that ties your activities to your goals. A student who has spent two years building a research project or leading a community initiative tells a far more compelling story than one who crams activities into the final year.',
      'Start by identifying your core interests — not just academic subjects, but the problems you care about. If you\'re interested in environmental science, don\'t just study it; start a school recycling initiative, attend a workshop on sustainability, or write a blog about local environmental issues.',
      'Internships are another powerful tool. Even short-term experiences at a research lab, startup, or NGO can add depth to your profile. Look for opportunities that align with your interests and demonstrate initiative.',
      'Finally, focus on standardised test preparation early. A strong SAT or IELTS score, achieved without last-minute stress, frees up bandwidth for essays and interviews in Class 12. EduCoach helps students build a personalised profile roadmap — starting as early as Grade 9.',
    ],
    author: 'Neha Verma',
    publishedDate: '2026-07-15',
  },
  'scholarship-guide-2026': {
    body: [
      'Studying abroad is an investment — but it doesn\'t have to be an unaffordable one. Scholarships can cover anywhere from 10% to 100% of your costs, and the key is knowing where to look and how to apply.',
      'Merit-based scholarships reward academic excellence, leadership, and extracurricular achievement. Need-based aid considers your family\'s financial situation. Many universities offer a combination of both, and some countries — like Germany and Norway — charge zero tuition for all students.',
      'Start your scholarship search early. Databases like ScholarshipPortal, Chevening, and university-specific pages list hundreds of options. EduCoach maintains a curated database matched to student profiles.',
      'The application process matters as much as your profile. Scholarship essays should tell a story — not list achievements. Explain why you need the funding, what you\'ll do with the opportunity, and how you\'ll contribute to the university community.',
      'Don\'t overlook external scholarships from corporates, foundations, and government bodies. Many of these are less competitive than university scholarships and can be stacked together. Our counsellors help students build a diversified funding strategy across multiple sources.',
    ],
    author: 'Aditya Bose',
    publishedDate: '2026-06-20',
  },
  'sat-vs-act': {
    body: [
      'If you\'re applying to US universities, you\'ve likely encountered the SAT vs ACT debate. Both tests are accepted by virtually all American colleges, so the choice comes down to which format suits your strengths.',
      'The SAT focuses on evidence-based reading and writing, plus math. It rewards careful analysis and tends to favour students who are strong in reading comprehension and data interpretation. The math section allows a calculator throughout.',
      'The ACT includes an additional Science section — but don\'t be misled by the name. It\'s really a test of data interpretation and scientific reasoning, not biology or chemistry knowledge. The ACT also has a tighter time limit per question.',
      'Take a diagnostic test for both formats. Many students find they naturally score higher on one. If you\'re strong in science reasoning and work quickly, the ACT may suit you. If you prefer more time per question and excel at reading analysis, the SAT could be better.',
      'Regardless of which test you choose, structured preparation over 3–6 months yields the best results. EduCoach\'s test prep programme includes diagnostics, targeted practice, weekly mocks, and one-on-one doubt sessions.',
    ],
    author: 'Neha Verma',
    publishedDate: '2026-05-10',
  },
  'ielts-30-day-plan': {
    body: [
      'Thirty days is a realistic timeframe for IELTS preparation — if you already have a solid foundation in English and approach the month with structure and discipline.',
      'Week 1: Take a full diagnostic test under timed conditions. Identify your weakest band (Listening, Reading, Writing, or Speaking) and allocate 60% of your daily practice to it. Familiarise yourself with the test format and question types.',
      'Week 2: Focus on targeted practice. For Reading, work on skimming and scanning techniques. For Listening, practice note-taking with BBC podcasts. For Writing, learn the structure of Task 1 (data description) and Task 2 (essay) — write at least one of each daily.',
      'Week 3: Take two full mock tests this week. Review every mistake — IELTS penalises specific errors, and understanding the marking criteria for Writing and Speaking is crucial. Practice Speaking with a partner or record yourself.',
      'Week 4: Final refinement. Take one more full mock. Focus on time management — many students lose marks not from lack of knowledge but from running out of time. Get feedback on your Writing and Speaking from an experienced evaluator. EduCoach offers intensive IELTS boot camps with daily mock tests and personalised feedback.',
    ],
    author: 'Sameer Kapoor',
    publishedDate: '2026-04-25',
  },
  'uk-vs-usa-undergrad': {
    body: [
      'The UK and USA are the two most popular study-abroad destinations — but they offer fundamentally different undergraduate experiences. Understanding these differences is key to making the right choice.',
      'In the UK, you apply directly to a specific course (e.g., "Economics at LSE"). The degree is typically 3 years, highly specialised from Year 1, and assessed largely through exams and dissertations. You\'ll gain deep expertise in your subject.',
      'In the US, you apply to a university, not a specific major. The first two years include general education requirements across sciences, humanities, and arts. You declare a major later, giving you time to explore. Degrees are 4 years.',
      'Cost is another major factor. UK tuition for a 3-year degree can work out cheaper than 4 years in the US — but top US universities often offer generous need-based financial aid that UK universities rarely match. Scholarships shift the equation.',
      'Campus culture differs too. US universities emphasise a holistic experience — sports, clubs, Greek life, and campus living are central. UK universities tend to be more academically focused, with social life centred around societies and the local city. Neither is better; it depends on what environment helps you thrive.',
    ],
    author: 'Dr. Priya Menon',
    publishedDate: '2026-03-18',
  },
  'parents-guide-costs': {
    body: [
      'Planning the finances of studying abroad is one of the biggest decisions a family makes. Understanding the full picture — beyond just tuition — helps you plan realistically and avoid surprises.',
      'Tuition varies enormously: from €0 in Germany and Norway to $60,000+ per year at top US private universities. UK and Australian tuition typically falls in the middle. Always check whether the university offers need-based or merit-based discounts.',
      'Living costs are the hidden variable. London, New York, and Sydney are significantly more expensive than smaller university towns. A budget of $800–$1,500 per month covers accommodation, food, transport, and basics in most cities.',
      'Don\'t forget one-time costs: visa application fees, health insurance, flight tickets, initial accommodation deposits, and books/equipment. These can add ₹2–5 lakh depending on the destination.',
      'The good news: education loans are widely available from Indian banks for study abroad, and many countries allow part-time work during studies (15–20 hours per week). EduCoach\'s finance advisory team helps families plan budgets, compare loan options, and maximise scholarship income.',
    ],
    author: 'Aditya Bose',
    publishedDate: '2026-02-10',
  },
}

export const universities = [
  { name: 'University of Oxford', country: 'United Kingdom', ranking: '#1 World', type: 'Public', city: 'Oxford' },
  { name: 'University of Cambridge', country: 'United Kingdom', ranking: '#2 UK', type: 'Public', city: 'Cambridge' },
  { name: 'Imperial College London', country: 'United Kingdom', ranking: '#6 World', type: 'Public', city: 'London' },
  { name: 'UCL', country: 'United Kingdom', ranking: '#9 World', type: 'Public', city: 'London' },
  { name: 'Stanford University', country: 'United States', ranking: '#2 World', type: 'Private', city: 'Stanford, CA' },
  { name: 'MIT', country: 'United States', ranking: '#1 Engineering', type: 'Private', city: 'Cambridge, MA' },
  { name: 'Harvard University', country: 'United States', ranking: '#4 World', type: 'Private', city: 'Cambridge, MA' },
  { name: 'Columbia University', country: 'United States', ranking: '#12 World', type: 'Private', city: 'New York, NY' },
  { name: 'University of Toronto', country: 'Canada', ranking: '#21 World', type: 'Public', city: 'Toronto' },
  { name: 'UBC', country: 'Canada', ranking: '#34 World', type: 'Public', city: 'Vancouver' },
  { name: 'McGill University', country: 'Canada', ranking: '#30 World', type: 'Public', city: 'Montreal' },
  { name: 'University of Melbourne', country: 'Australia', ranking: '#14 World', type: 'Public', city: 'Melbourne' },
  { name: 'University of Sydney', country: 'Australia', ranking: '#19 World', type: 'Public', city: 'Sydney' },
  { name: 'NUS', country: 'Singapore', ranking: '#8 World', type: 'Public', city: 'Singapore' },
  { name: 'NTU', country: 'Singapore', ranking: '#15 World', type: 'Public', city: 'Singapore' },
  { name: 'TU Munich', country: 'Europe', ranking: '#37 World', type: 'Public', city: 'Munich' },
  { name: 'ETH Zurich', country: 'Europe', ranking: '#7 World', type: 'Public', city: 'Zurich' },
  { name: 'NYU Abu Dhabi', country: 'UAE', ranking: 'Highly Selective', type: 'Private', city: 'Abu Dhabi' },
  { name: 'IIT Bombay', country: 'India', ranking: '#118 World', type: 'Public', city: 'Mumbai' },
  { name: 'IIT Delhi', country: 'India', ranking: '#150 World', type: 'Public', city: 'New Delhi' },
]

export const resources = [
  { title: 'Study Abroad Starter Guide', desc: 'A comprehensive guide covering timelines, costs, and how to choose the right country and university.', type: 'Guide' },
  { title: 'Scholarship Database 2026', desc: 'A curated list of merit and need-based scholarships across 30+ countries, updated annually.', type: 'Tool' },
  { title: 'University Comparison Checklist', desc: 'A structured checklist to compare universities across ranking, cost, location, and career outcomes.', type: 'Checklist' },
  { title: 'SOP Writing Template', desc: 'A proven statement of purpose template with guidance notes used by our essay strategists.', type: 'Template' },
  { title: 'Visa Document Checklist', desc: 'Country-specific visa documentation checklists for UK, USA, Canada, Australia and more.', type: 'Checklist' },
  { title: 'IELTS Preparation Planner', desc: 'A 30-day and 60-day IELTS study plan with daily tasks and recommended resources.', type: 'Guide' },
]

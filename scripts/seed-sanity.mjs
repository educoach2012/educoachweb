/**
 * One-time migration script: pushes all static/dummy data from site-data.ts
 * and data.ts into the Sanity project via the Sanity client mutation API.
 *
 * Usage:
 *   node scripts/seed-sanity.mjs
 *
 * Requires env vars:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET (defaults to "production")
 *   SANITY_API_TOKEN  — a write-capable token from manage.sanity.io
 */

import { createClient } from '@sanity/client'
import { randomUUID } from 'crypto'

// ── Config ──────────────────────────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) { console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID'); process.exit(1) }
if (!token) { console.error('Missing SANITY_API_TOKEN'); process.exit(1) }

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

function key() { return randomUUID().replace(/-/g, '').slice(0, 12) }

// ── Source data (duplicated from TS sources to keep this script standalone) ──

const contact = {
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsapp: '919876543210',
  whatsappMessage: 'Hi EduCoach, I would like to book an assessment session.',
  email: 'hello@educoach.in',
  address: '3rd Floor, Prestige Tower, MG Road, Bengaluru, Karnataka 560001',
}

const stats = [
  { value: 13, suffix: '+', label: 'Years of experience' },
  { value: 2500, suffix: '+', label: 'Students counselled' },
  { value: 1000, suffix: '+', label: 'Admission offers' },
  { value: 30, suffix: '+', label: 'Countries covered' },
]

const aboutContent = {
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

const navItems = [
  { title: 'About', href: '/about' },
  {
    title: 'Services', href: '/services',
    children: [
      { title: 'UG Admissions', href: '/services/undergraduate', desc: 'Undergraduate applications' },
      { title: 'PG Admissions', href: '/services/postgraduate', desc: 'Masters, MBA & PhD' },
      { title: 'Career Counselling', href: '/services#career', desc: 'Psychometric-led career discovery' },
      { title: 'Profile Building', href: '/services#profile', desc: 'Stand out beyond grades' },
      { title: 'Test Preparation', href: '/services#test', desc: 'SAT, IELTS, TOEFL, GRE' },
      { title: 'Scholarship Guidance', href: '/services#scholarship', desc: 'Fund your ambition' },
      { title: 'Visa Assistance', href: '/services#visa', desc: 'End-to-end visa support' },
      { title: 'Boarding Schools', href: '/services#boarding', desc: 'Global school placements' },
      { title: 'Our Methodology', href: '/methodology', desc: 'Psycho-Aptitude Analysis framework' },
    ],
  },
  {
    title: 'Programmes', href: '/services',
    children: [
      { title: 'JumpStart', href: '/programmes/jumpstart', desc: 'Early discovery for Class 8–10' },
      { title: 'Sprint', href: '/programmes/sprint', desc: 'Intensive admissions for Class 11–12' },
      { title: 'Career Pivot', href: '/programmes/career-pivot', desc: 'Masters & MBA for professionals' },
    ],
  },
  {
    title: 'Countries', href: '/countries',
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
  { title: 'Case Studies', href: '/case-studies' },
  { title: 'Acceptances', href: '/acceptances' },
  { title: 'Events', href: '/events' },
  { title: 'Team', href: '/team' },
  { title: 'Contact', href: '/contact' },
]

const footerNav = [
  {
    heading: 'Company',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Our Methodology', href: '/methodology' },
      { title: 'How We Work', href: '/how-we-work' },
      { title: 'Our Team', href: '/team' },
      { title: 'Success Stories', href: '/success-stories' },
      { title: 'Case Studies', href: '/case-studies' },
      { title: 'Events', href: '/events' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { title: 'UG Admissions', href: '/services/undergraduate' },
      { title: 'PG Admissions', href: '/services/postgraduate' },
      { title: 'Career Counselling', href: '/services#career' },
      { title: 'Profile Building', href: '/services#profile' },
      { title: 'Test Preparation', href: '/services#test' },
      { title: 'Scholarships', href: '/services#scholarship' },
      { title: 'Visa Assistance', href: '/services#visa' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { title: 'Blog', href: '/blogs' },
      { title: 'Universities', href: '/universities' },
      { title: 'Acceptances', href: '/acceptances' },
      { title: 'Free Guides', href: '/resources' },
      { title: 'FAQs', href: '/#faq' },
    ],
  },
]

const countries = [
  { slug: 'uk', name: 'United Kingdom', flag: '🇬🇧', tagline: '1-year masters, world-class research', universities: '150+' },
  { slug: 'usa', name: 'United States', flag: '🇺🇸', tagline: 'Ivy League and top research universities', universities: '400+' },
  { slug: 'canada', name: 'Canada', flag: '🇨🇦', tagline: 'Affordable, PR-friendly pathways', universities: '120+' },
  { slug: 'australia', name: 'Australia', flag: '🇦🇺', tagline: 'Group of Eight and vibrant campuses', universities: '90+' },
  { slug: 'singapore', name: 'Singapore', flag: '🇸🇬', tagline: 'Asia\'s premier education hub', universities: '20+' },
  { slug: 'europe', name: 'Europe', flag: '🇪🇺', tagline: 'Low tuition, high quality, in English', universities: '200+' },
  { slug: 'uae', name: 'UAE', flag: '🇦🇪', tagline: 'Global campuses close to home', universities: '40+' },
  { slug: 'india', name: 'India', flag: '🇮🇳', tagline: 'Premier institutes and deemed universities', universities: '300+' },
]

const countryDetails = {
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

const services = [
  { id: 'career', title: 'Career Counselling', desc: 'Psychometric assessment plus 1:1 guidance to map strengths to real-world careers.', icon: 'Compass', longDesc: 'Our career counselling begins with a comprehensive psychometric assessment that maps your aptitudes, interests and personality to real-world career paths. A dedicated counsellor then works with you to shortlist the right courses, universities and countries — ensuring every choice aligns with your long-term goals.', features: ['Psychometric profiling (aptitude + personality)', 'One-on-one career mapping sessions', 'Course and university shortlisting', 'Industry-aligned career path planning', 'Parent counselling and alignment sessions'] },
  { id: 'profile', title: 'Profile Building', desc: 'Research, olympiads, internships and projects that make your application unforgettable.', icon: 'Sparkles', longDesc: 'Top universities look beyond grades. We design a personalised profile-building roadmap that includes research projects, internships, olympiads, community service and extracurricular achievements — all curated to make your application stand out in a competitive applicant pool.', features: ['Personalised extracurricular roadmap', 'Research project mentoring', 'Internship and volunteering guidance', 'Olympiad and competition strategy', 'Portfolio and achievement documentation'] },
  { id: 'ug', title: 'UG Admissions', desc: 'End-to-end support for undergraduate applications across 30+ countries.', icon: 'GraduationCap', longDesc: 'From university shortlisting to final enrolment, we manage every step of the undergraduate application process. Our counsellors have placed students in the world\'s top universities and understand what each institution values in an applicant.', features: ['Strategic university shortlisting', 'Common App and UCAS management', 'Essay brainstorming and review', 'Interview preparation', 'Offer evaluation and decision support'] },
  { id: 'pg', title: 'PG Admissions', desc: 'Masters, MBA and research applications with tailored SOPs and LORs.', icon: 'BookOpen', longDesc: 'Postgraduate applications demand precision — the right programme match, compelling statements of purpose, and strong letters of recommendation. We work closely with you to craft applications that reflect your academic depth and professional aspirations.', features: ['Programme and supervisor matching', 'SOP and personal statement crafting', 'LOR strategy and guidance', 'Research proposal development', 'MBA application and interview coaching'] },
  { id: 'boarding', title: 'Boarding Schools', desc: 'Placements into elite boarding schools in the UK, Switzerland and beyond.', icon: 'School', longDesc: 'We help families find the right boarding school for their child — factoring in academic rigour, pastoral care, location and budget. Our network covers elite schools across the UK, Switzerland, USA and Singapore.', features: ['School shortlisting and campus insights', 'Application and entrance exam prep', 'Interview coaching for students and parents', 'Scholarship applications', 'Transition and settling-in support'] },
  { id: 'test', title: 'Test Preparation', desc: 'Structured prep for SAT, IELTS, TOEFL, GRE and GMAT with proven mentors.', icon: 'PencilRuler', longDesc: 'Our structured test preparation programmes are designed to maximise scores in the shortest time. With experienced mentors, targeted practice material and regular mock tests, students consistently outperform their baselines.', features: ['SAT, IELTS, TOEFL, GRE, GMAT prep', 'Diagnostic test and study plan', 'Weekly mock tests and analytics', 'One-on-one doubt sessions', 'Score improvement guarantee'] },
  { id: 'scholarship', title: 'Scholarship Guidance', desc: 'Identify and win merit and need-based scholarships worth crores.', icon: 'Award', longDesc: 'Scholarships can transform the economics of studying abroad. We maintain an updated database of merit, need-based and country-specific scholarships, and help you craft applications that maximise your chances of funding.', features: ['Scholarship database and matching', 'Application essay and portfolio preparation', 'Financial aid and fee negotiation', 'External scholarship sourcing', 'Bursary and grant identification'] },
  { id: 'visa', title: 'Visa Assistance', desc: 'Documentation, mock interviews and end-to-end visa filing support.', icon: 'Plane', longDesc: 'A visa rejection can derail months of effort. Our visa team handles documentation, financial proof preparation, mock interviews and filing — giving you the confidence that your application is thorough and compliant.', features: ['Document checklist and review', 'Financial documentation guidance', 'Mock visa interviews', 'Application filing and tracking', 'Post-visa pre-departure briefing'] },
]

const steps = [
  { title: 'Discover', desc: 'Understand your goals, strengths and constraints.', longDesc: 'We start with a deep conversation — understanding your academic background, interests, family expectations and long-term ambitions. This forms the foundation for every decision that follows.' },
  { title: 'Assess', desc: 'Psychometric and academic evaluation.', longDesc: 'Using validated psychometric tools, we map your aptitudes, personality traits and learning style. Combined with your academic profile, this gives us a science-backed picture of where you\'ll thrive.' },
  { title: 'Counsel', desc: 'Map right-fit courses, universities and countries.', longDesc: 'Your dedicated counsellor shortlists courses, universities and countries that align with your profile and goals. Every recommendation is backed by data on acceptance rates, outcomes and fit.' },
  { title: 'Profile Building', desc: 'Build the experiences that set you apart.', longDesc: 'We design a personalised roadmap of research, internships, projects and extracurriculars that strengthen your application. This isn\'t generic advice — it\'s curated to match what your target universities value.' },
  { title: 'Applications', desc: 'Essays, SOPs, LORs and submissions done right.', longDesc: 'From brainstorming essay topics to final submission, we guide every element. Your counsellor reviews multiple drafts, ensuring your authentic voice shines through while meeting each university\'s expectations.' },
  { title: 'Offers', desc: 'Compare, negotiate and choose the best offer.', longDesc: 'When offers arrive, we help you evaluate them holistically — considering rankings, scholarships, location, career outcomes and visa pathways — so you make the right choice, not just the obvious one.' },
  { title: 'Visa', desc: 'Documentation and interview preparation.', longDesc: 'Our visa team prepares your documentation, conducts mock interviews and files your application. We\'ve handled thousands of visa cases and know what consulates look for.' },
  { title: 'Departure', desc: 'Pre-departure briefing and settling-in support.', longDesc: 'Before you fly, we cover everything — accommodation, banking, SIM cards, cultural tips and airport logistics. You leave with confidence, and your family leaves with peace of mind.' },
]

const experts = [
  { name: 'Dr. Priya Menon', role: 'Founder & Lead Counsellor', experience: '16 years', specialisation: 'UK & US Admissions', countries: 'UK, USA', bio: 'Dr. Priya founded EduCoach with a vision to bring research-backed career counselling to Indian students. With a doctorate in Education Psychology from UCL, she has personally mentored over 800 students into top global universities.' },
  { name: 'Sameer Kapoor', role: 'Senior Career Counsellor', experience: '12 years', specialisation: 'Career Discovery & PG', countries: 'Canada, Australia', bio: 'Sameer specialises in postgraduate admissions and career discovery. An alumnus of the University of Toronto, he brings first-hand experience of the international education landscape and has guided students to scholarships worth over ₹15 crore.' },
  { name: 'Neha Verma', role: 'Profile & Essay Strategist', experience: '9 years', specialisation: 'Ivy League Essays', countries: 'USA, Singapore', bio: 'Neha is known for her ability to draw out authentic, compelling narratives from students. Her essay strategy has helped secure admissions to Stanford, Columbia, NUS and other highly selective institutions.' },
  { name: 'Aditya Bose', role: 'Visa & Finance Advisor', experience: '11 years', specialisation: 'Visa & Scholarships', countries: 'Europe, UAE', bio: 'Aditya manages visa applications and scholarship strategy across European and Middle Eastern institutions. With a near-perfect visa approval record, he ensures no application falls through the cracks.' },
]

const successStories = [
  { name: 'Ananya Sharma', university: 'University of Oxford', country: 'United Kingdom', course: 'PPE', scholarship: '£25,000', year: 2025, quote: 'EduCoach turned my scattered ideas into a story Oxford couldn\'t ignore.' },
  { name: 'Rohan Mehta', university: 'Stanford University', country: 'United States', course: 'Computer Science', scholarship: '$40,000', year: 2025, quote: 'The profile-building roadmap made all the difference in my application.' },
  { name: 'Ishita Nair', university: 'University of Toronto', country: 'Canada', course: 'Biotechnology', scholarship: 'CA$18,000', year: 2024, quote: 'From SOPs to visa, every step felt handled and human.' },
  { name: 'Kabir Singh', university: 'University of Melbourne', country: 'Australia', course: 'Data Science', scholarship: 'AU$20,000', year: 2024, quote: 'My counsellor believed in me before I did. Now I\'m in the Group of Eight.' },
  { name: 'Meera Iyer', university: 'National University of Singapore', country: 'Singapore', course: 'Business Analytics', scholarship: 'S$15,000', year: 2025, quote: 'Strategic, calm and genuinely invested in my future.' },
  { name: 'Arjun Rao', university: 'TU Munich', country: 'Europe', course: 'Mechanical Engineering', scholarship: 'Full tuition', year: 2024, quote: 'They found a fully-funded pathway I didn\'t know existed.' },
]

const events = [
  { title: 'UK Universities Masterclass', date: '2026-08-22', mode: 'Online', city: 'Live Webinar', spots: 'Limited seats' },
  { title: 'US Ivy League Profile Workshop', date: '2026-09-05', mode: 'In-person', city: 'Bengaluru', spots: '30 seats' },
  { title: 'Study in Canada — Parent Session', date: '2026-09-19', mode: 'Online', city: 'Live Webinar', spots: 'Free entry' },
]

const blogs = [
  { title: 'How to Build a Standout University Profile in Class 11', category: 'Admissions', minutes: 7, slug: 'standout-profile-class-11' },
  { title: '2026 Scholarship Guide: Funding Your Study Abroad Dream', category: 'Scholarships', minutes: 9, slug: 'scholarship-guide-2026' },
  { title: 'SAT vs ACT: Which Test Is Right for You?', category: 'SAT', minutes: 6, slug: 'sat-vs-act' },
  { title: 'IELTS in 30 Days: A Realistic Study Plan', category: 'IELTS', minutes: 8, slug: 'ielts-30-day-plan' },
  { title: 'UK vs USA for Undergrad: An Honest Comparison', category: 'Country Guides', minutes: 10, slug: 'uk-vs-usa-undergrad' },
  { title: 'A Parent\'s Guide to Study Abroad Costs', category: 'Parent Guides', minutes: 7, slug: 'parents-guide-costs' },
]

const blogContent = {
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

const faqs = [
  { q: 'When is the right time to start counselling?', a: 'The earlier the better — ideally in Grade 9 or 10 so we can build a strong profile over time. That said, we support students at every stage, including last-minute applicants.' },
  { q: 'What happens in an assessment session?', a: 'We understand your goals, run a psychometric assessment, review your academics, and give you a clear, personalised roadmap toward the right courses and universities.' },
  { q: 'Which countries and universities do you cover?', a: 'We cover the UK, USA, Canada, Australia, Singapore, Europe, UAE and India, working with top global universities across all major disciplines.' },
  { q: 'Do you help with scholarships and visas?', a: 'Yes. Scholarship strategy and end-to-end visa support — including documentation and mock interviews — are core parts of our service.' },
  { q: 'How are you different from other consultancies?', a: 'We combine science-backed psychometric assessment, a dedicated counsellor, and genuine profile building — not just application form-filling.' },
]

const universitiesList = [
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

const resources = [
  { title: 'Study Abroad Starter Guide', desc: 'A comprehensive guide covering timelines, costs, and how to choose the right country and university.', type: 'Guide' },
  { title: 'Scholarship Database 2026', desc: 'A curated list of merit and need-based scholarships across 30+ countries, updated annually.', type: 'Tool' },
  { title: 'University Comparison Checklist', desc: 'A structured checklist to compare universities across ranking, cost, location, and career outcomes.', type: 'Checklist' },
  { title: 'SOP Writing Template', desc: 'A proven statement of purpose template with guidance notes used by our essay strategists.', type: 'Template' },
  { title: 'Visa Document Checklist', desc: 'Country-specific visa documentation checklists for UK, USA, Canada, Australia and more.', type: 'Checklist' },
  { title: 'IELTS Preparation Planner', desc: 'A 30-day and 60-day IELTS study plan with daily tasks and recommended resources.', type: 'Guide' },
]

const caseStudies = [
  {
    title: 'From rejected to LSE with a full scholarship — Priya\'s second chance',
    slug: 'priya-lse-scholarship',
    studentName: 'Priya Sharma',
    university: 'London School of Economics',
    countryName: 'United Kingdom',
    course: 'MSc Economics',
    level: 'Postgraduate',
    scholarshipValue: '£45,000 (Full tuition)',
    year: 2025,
    challenge: 'Priya had a strong academic record — 9.2 CGPA from St. Xavier\'s College, Mumbai — but a thin extracurricular profile. She had applied independently the previous year and been rejected from LSE, UCL, and Warwick. Her confidence was shaken, and her parents were pushing her to accept a less competitive domestic programme instead.',
    approach: 'We began with a Psycho-Aptitude Analysis that revealed Priya\'s strongest traits: analytical rigour, systems thinking, and a latent leadership quality that her previous applications had completely failed to surface. Over 8 months, we helped her co-author a research paper on behavioural economics with a professor at IIT Bombay, volunteer as a policy analyst at a think tank, and redesign her SOP around a clear narrative: using economic policy to address urban inequality. We ran 4 rounds of SOP revision and two mock interviews.',
    outcome: 'Priya received offers from LSE, UCL, and Warwick — all with scholarship offers. She chose LSE with a full-tuition scholarship worth £45,000. Her research paper was cited in her LSE offer letter as a distinguishing factor.',
    quote: 'EduCoach didn\'t just fix my application — they helped me see what I was capable of. The same universities that rejected me last year offered me scholarships this time.',
    featured: true,
  },
  {
    title: 'How a Class 10 student built a Stanford-ready profile in two years',
    slug: 'arjun-stanford-journey',
    studentName: 'Arjun Mehta',
    university: 'Stanford University',
    countryName: 'United States',
    course: 'BS Computer Science',
    level: 'Undergraduate',
    scholarshipValue: '$50,000/year',
    year: 2025,
    challenge: 'Arjun came to us in Class 10 with a genuine passion for coding but an otherwise unremarkable profile — 88% board scores, no olympiad medals, and extracurriculars that read like every other applicant (MUN, school prefect). His parents were sceptical that Stanford was even worth aiming for.',
    approach: 'We enrolled Arjun in the JumpStart programme and built a 24-month profile roadmap. He developed an open-source browser extension for visually impaired users that gained 2,000+ GitHub stars, completed a summer internship at a Bengaluru AI startup, led his school\'s newly founded Computer Science Society, and competed in the National Informatics Olympiad. His Common App essay told the deeply personal story of building assistive technology for his grandmother who was losing her sight — connecting his technical skills to genuine human impact.',
    outcome: 'Arjun received admits from Stanford, MIT, Georgia Tech, and University of Michigan. Stanford offered $50,000/year in need-based financial aid. His GitHub project was specifically referenced in the admissions committee\'s feedback. His parents went from sceptical to speechless.',
    quote: 'Two years ago, my parents thought Stanford was a fantasy. EduCoach saw something in me that I hadn\'t seen in myself — and built a plan to make it real.',
    featured: true,
  },
  {
    title: 'Meera\'s strategic path to University of Toronto with a PR roadmap',
    slug: 'meera-toronto-pr',
    studentName: 'Meera Iyer',
    university: 'University of Toronto',
    countryName: 'Canada',
    course: 'MSc Biotechnology',
    level: 'Postgraduate',
    scholarshipValue: 'CA$25,000',
    year: 2024,
    challenge: 'Meera\'s goal wasn\'t just a degree — it was a life in Canada. She had a BSc in Biotechnology from VIT and 2 years of lab experience, but she had already wasted one application cycle applying to programmes that didn\'t qualify for the Post-Graduation Work Permit (PGWP). She was confused by the immigration pathways and running out of patience.',
    approach: 'We mapped her academic interests against PGWP-eligible programmes, cross-referenced them with provinces that had favourable Provincial Nominee Programme (PNP) streams for biotech graduates, and shortlisted 6 universities. Her SOP was reframed around a clear thesis: using biosensor research to improve food safety in Canadian agriculture — a narrative that connected her lab experience to Canadian industry needs. We also connected her with an EduCoach alum working at a Toronto biotech firm for informational interviews.',
    outcome: 'Meera was admitted to UofT, UBC, and McMaster — all with funding. She chose UofT\'s Biotechnology programme with a CA$25,000 entrance scholarship. She\'s now on track for PR through Ontario\'s PNP stream after graduation, with her supervisor already offering a research assistant role for the transition year.',
    quote: 'EduCoach understood that my goal wasn\'t just a degree — it was a life in Canada. They planned for both, and now both are happening.',
    featured: true,
  },
  {
    title: 'A working professional\'s career pivot — from IT services to INSEAD MBA',
    slug: 'vikram-insead-mba',
    studentName: 'Vikram Desai',
    university: 'INSEAD',
    countryName: 'Europe',
    course: 'MBA',
    level: 'MBA',
    scholarshipValue: '€25,000',
    year: 2025,
    challenge: 'Vikram had 7 years at a large IT services company in Pune and felt stuck in middle management. He knew an MBA could be the reset he needed, but his GMAT score (680) was below the median for top European programmes, and his profile lacked the leadership narrative that MBA admissions committees look for.',
    approach: 'Through the Career Pivot programme, we helped Vikram reframe his career story. We identified that his experience leading a 40-person cross-border delivery team was actually a compelling leadership narrative — it just wasn\'t being told correctly. We coached him through a GMAT retake strategy (focused on quant, where he had headroom) that brought his score to 730. His essays were built around the theme of scaling emerging-market tech teams — a story INSEAD values given its global focus. We ran 5 mock interview rounds, including a stress interview simulation.',
    outcome: 'Vikram received admits from INSEAD, London Business School, and ISB. He chose INSEAD\'s January cohort with a €25,000 scholarship. He\'s now leading product strategy at a fintech startup in Singapore — exactly the career pivot he\'d envisioned.',
    quote: 'I thought my IT services background was a disadvantage. EduCoach helped me see it was my biggest asset — I just needed to tell the story differently.',
    featured: false,
  },
  {
    title: 'Scholarship breakthrough — Nandini\'s fully-funded path to ETH Zurich',
    slug: 'nandini-eth-zurich',
    studentName: 'Nandini Reddy',
    university: 'ETH Zurich',
    countryName: 'Europe',
    course: 'MSc Computer Science',
    level: 'Postgraduate',
    scholarshipValue: 'Full tuition + stipend (CHF 45,000)',
    year: 2024,
    challenge: 'Nandini was an exceptional student — gold medallist in her BTech from IIIT Hyderabad — but her family couldn\'t afford the living costs in Zurich even with a tuition waiver. She was close to giving up on ETH and settling for a domestic programme, believing that fully-funded European opportunities were reserved for European students.',
    approach: 'Our scholarship desk identified the Excellence Scholarship & Opportunity Programme (ESOP) at ETH, which covers tuition and provides a living stipend — but requires a specific application format and research proposal. We helped Nandini craft a research proposal on federated machine learning that aligned with a specific ETH professor\'s lab, secured a pre-admission conversation with the supervisor, and prepared a scholarship application that went beyond academics to demonstrate her community impact (she\'d taught coding to 200+ students in government schools through a volunteer programme).',
    outcome: 'Nandini was admitted to ETH Zurich with the full ESOP scholarship — tuition waiver plus CHF 45,000 living stipend. She also received offers from TU Munich and EPFL. Her research proposal was accepted as a thesis project on day one.',
    quote: 'I almost didn\'t apply because I thought I couldn\'t afford it. EduCoach found a scholarship I didn\'t know existed and helped me win it.',
    featured: false,
  },
]

const acceptances = [
  { studentName: 'Ananya Sharma', university: 'University of Oxford', countryName: 'United Kingdom', course: 'PPE', level: 'Undergraduate', scholarship: '£25,000', year: 2025 },
  { studentName: 'Arjun Mehta', university: 'Stanford University', countryName: 'United States', course: 'Computer Science', level: 'Undergraduate', scholarship: '$50,000/year', year: 2025 },
  { studentName: 'Priya Sharma', university: 'London School of Economics', countryName: 'United Kingdom', course: 'MSc Economics', level: 'Postgraduate', scholarship: '£45,000', year: 2025 },
  { studentName: 'Vikram Desai', university: 'INSEAD', countryName: 'Europe', course: 'MBA', level: 'MBA', scholarship: '€25,000', year: 2025 },
  { studentName: 'Meera Iyer', university: 'National University of Singapore', countryName: 'Singapore', course: 'Business Analytics', level: 'Postgraduate', scholarship: 'S$15,000', year: 2025 },
  { studentName: 'Sneha Patel', university: 'Imperial College London', countryName: 'United Kingdom', course: 'Biomedical Engineering', level: 'Postgraduate', scholarship: '£15,000', year: 2025 },
  { studentName: 'Karan Malhotra', university: 'NYU Abu Dhabi', countryName: 'UAE', course: 'Economics', level: 'Undergraduate', scholarship: 'Full scholarship', year: 2025 },
  { studentName: 'Tanya Bhatia', university: 'University of Cambridge', countryName: 'United Kingdom', course: 'Natural Sciences', level: 'Undergraduate', year: 2025 },
  { studentName: 'Pooja Nair', university: 'Harvard University', countryName: 'United States', course: 'MPH Public Health', level: 'Postgraduate', scholarship: '$35,000', year: 2025 },
  { studentName: 'Aditya Joshi', university: 'University of Sydney', countryName: 'Australia', course: 'Master of Finance', level: 'Postgraduate', scholarship: 'AU$10,000', year: 2025 },
  { studentName: 'Diya Kapoor', university: 'University of Edinburgh', countryName: 'United Kingdom', course: 'MSc Artificial Intelligence', level: 'Postgraduate', scholarship: '£10,000', year: 2025 },
  { studentName: 'Siddharth Rao', university: 'University of Michigan', countryName: 'United States', course: 'Aerospace Engineering', level: 'Undergraduate', scholarship: '$25,000/year', year: 2025 },
  { studentName: 'Kavya Menon', university: 'University of Waterloo', countryName: 'Canada', course: 'Computer Engineering (Co-op)', level: 'Undergraduate', scholarship: 'CA$10,000', year: 2025 },
  { studentName: 'Harsh Gupta', university: 'London Business School', countryName: 'United Kingdom', course: 'MBA', level: 'MBA', scholarship: '£20,000', year: 2025 },
  { studentName: 'Nisha Agarwal', university: 'Monash University', countryName: 'Australia', course: 'Master of Pharmacy', level: 'Postgraduate', scholarship: 'AU$15,000', year: 2025 },
  { studentName: 'Rohan Sinha', university: 'Sciences Po', countryName: 'Europe', course: 'International Affairs', level: 'Undergraduate', scholarship: 'Full tuition', year: 2025 },
  { studentName: 'Meera Iyer', university: 'University of Toronto', countryName: 'Canada', course: 'MSc Biotechnology', level: 'Postgraduate', scholarship: 'CA$25,000', year: 2024 },
  { studentName: 'Nandini Reddy', university: 'ETH Zurich', countryName: 'Europe', course: 'MSc Computer Science', level: 'Postgraduate', scholarship: 'Full tuition + stipend', year: 2024 },
  { studentName: 'Kabir Singh', university: 'University of Melbourne', countryName: 'Australia', course: 'Master of Data Science', level: 'Postgraduate', scholarship: 'AU$20,000', year: 2024 },
  { studentName: 'Arjun Rao', university: 'TU Munich', countryName: 'Europe', course: 'MSc Mechanical Engineering', level: 'Postgraduate', scholarship: 'Full tuition', year: 2024 },
  { studentName: 'Riya Gupta', university: 'McGill University', countryName: 'Canada', course: 'Psychology', level: 'Undergraduate', year: 2024 },
  { studentName: 'Aman Trivedi', university: 'NTU Singapore', countryName: 'Singapore', course: 'Electrical Engineering', level: 'Postgraduate', scholarship: 'S$20,000', year: 2024 },
  { studentName: 'Ishita Nair', university: 'University of Toronto', countryName: 'Canada', course: 'Biotechnology', level: 'Postgraduate', scholarship: 'CA$18,000', year: 2024 },
  { studentName: 'Rahul Khanna', university: 'University of British Columbia', countryName: 'Canada', course: 'Civil Engineering', level: 'Postgraduate', scholarship: 'CA$12,000', year: 2024 },
  { studentName: 'Deepa Krishnan', university: 'University of Amsterdam', countryName: 'Europe', course: 'MSc Marketing', level: 'Postgraduate', year: 2024 },
  { studentName: 'Pranav Saxena', university: 'University of New South Wales', countryName: 'Australia', course: 'Master of Laws', level: 'Postgraduate', scholarship: 'AU$8,000', year: 2024 },
  { studentName: 'Sanya Verma', university: 'UCL', countryName: 'United Kingdom', course: 'MSc Urban Planning', level: 'Postgraduate', scholarship: '£12,000', year: 2024 },
  { studentName: 'Varun Chopra', university: 'University of Chicago', countryName: 'United States', course: 'Economics', level: 'Undergraduate', scholarship: '$30,000/year', year: 2024 },
  { studentName: 'Anisha Pillai', university: 'Khalifa University', countryName: 'UAE', course: 'Petroleum Engineering', level: 'Undergraduate', scholarship: 'Full scholarship', year: 2024 },
  { studentName: 'Manav Reddy', university: 'University of Alberta', countryName: 'Canada', course: 'MSc Environmental Science', level: 'Postgraduate', scholarship: 'CA$15,000', year: 2024 },
  { studentName: 'Shreya Dutta', university: 'University of Warwick', countryName: 'United Kingdom', course: 'MSc Business Analytics', level: 'Postgraduate', scholarship: '£8,000', year: 2023 },
  { studentName: 'Nikhil Bhatt', university: 'Columbia University', countryName: 'United States', course: 'MS Data Science', level: 'Postgraduate', scholarship: '$20,000', year: 2023 },
  { studentName: 'Anika Das', university: 'University of Melbourne', countryName: 'Australia', course: 'Master of Architecture', level: 'Postgraduate', year: 2023 },
  { studentName: 'Rohan Pillai', university: 'NUS Singapore', countryName: 'Singapore', course: 'MSc Finance', level: 'Postgraduate', scholarship: 'S$12,000', year: 2023 },
  { studentName: 'Tanvi Jain', university: 'Trinity College Dublin', countryName: 'Europe', course: 'Computer Science', level: 'Undergraduate', scholarship: '€5,000', year: 2023 },
  { studentName: 'Sahil Mehra', university: 'University of Toronto', countryName: 'Canada', course: 'Computer Engineering', level: 'Undergraduate', scholarship: 'CA$8,000', year: 2023 },
  { studentName: 'Kriti Sharma', university: 'King\'s College London', countryName: 'United Kingdom', course: 'LLM International Law', level: 'Postgraduate', year: 2023 },
  { studentName: 'Aravind Kumar', university: 'Georgia Institute of Technology', countryName: 'United States', course: 'MS Computer Science', level: 'Postgraduate', scholarship: '$15,000', year: 2023 },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function toBlocks(paragraphs) {
  return paragraphs.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }))
}

const countryDisplayMap = {
  'United Kingdom': 'uk',
  'United States': 'usa',
  'Canada': 'canada',
  'Australia': 'australia',
  'Singapore': 'singapore',
  'Europe': 'europe',
  'UAE': 'uae',
  'India': 'india',
}

function countryRef(name) {
  const slug = countryDisplayMap[name]
  if (!slug) return undefined
  return { _type: 'reference', _ref: `country-${slug}` }
}

// ── Build mutations ─────────────────────────────────────────────────────────

const mutations = []

// 1. Site Settings (singleton)
mutations.push({
  createOrReplace: {
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'EduCoach Services',
    tagline: 'Study Abroad & Career Counselling',
    phone: contact.phone,
    phoneHref: contact.phoneHref,
    whatsapp: contact.whatsapp,
    whatsappMessage: contact.whatsappMessage,
    email: contact.email,
    address: contact.address,
    mission: aboutContent.mission,
    vision: aboutContent.vision,
    foundedYear: aboutContent.foundedYear,
    story: aboutContent.story,
    stats: stats.map((s) => ({ ...s, _type: 'object', _key: key() })),
    values: aboutContent.values.map((v) => ({ ...v, _type: 'object', _key: key() })),
    mainNav: navItems.map((item) => ({
      _type: 'navItem',
      _key: key(),
      title: item.title,
      href: item.href,
      children: item.children
        ? item.children.map((ch) => ({
            _type: 'navChild',
            _key: key(),
            title: ch.title,
            href: ch.href,
            desc: ch.desc,
          }))
        : [],
    })),
    footerNav: footerNav.map((col) => ({
      _type: 'footerColumn',
      _key: key(),
      heading: col.heading,
      links: col.links.map((l) => ({
        _type: 'footerLink',
        _key: key(),
        title: l.title,
        href: l.href,
      })),
    })),
  },
})

// 2. Countries (8)
for (let i = 0; i < countries.length; i++) {
  const c = countries[i]
  const d = countryDetails[c.slug]
  mutations.push({
    createOrReplace: {
      _id: `country-${c.slug}`,
      _type: 'country',
      name: c.name,
      slug: { _type: 'slug', current: c.slug },
      flag: c.flag,
      tagline: c.tagline,
      universityCount: c.universities,
      overview: d.overview,
      whyStudyHere: d.whyStudyHere,
      topUniversities: d.topUniversities.map((u) => ({
        _type: 'object',
        _key: key(),
        name: u.name,
        ranking: u.ranking,
        city: u.city,
      })),
      intakes: d.intakes,
      averageCost: d.averageCost,
      visaInfo: d.visaInfo,
      order: i,
    },
  })
}

// 3. Team Members (4) — before blogs so author refs resolve
const teamMemberIds = {}
for (let i = 0; i < experts.length; i++) {
  const e = experts[i]
  const id = `team-${e.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`
  teamMemberIds[e.name] = id
  mutations.push({
    createOrReplace: {
      _id: id,
      _type: 'teamMember',
      name: e.name,
      role: e.role,
      experience: e.experience,
      specialisation: e.specialisation,
      countries: e.countries,
      bio: e.bio,
      order: i,
    },
  })
}

// 4. Services (8)
for (let i = 0; i < services.length; i++) {
  const s = services[i]
  mutations.push({
    createOrReplace: {
      _id: `service-${s.id}`,
      _type: 'service',
      title: s.title,
      serviceId: s.id,
      icon: s.icon,
      shortDesc: s.desc,
      longDesc: s.longDesc,
      features: s.features,
      order: i,
    },
  })
}

// 5. Steps (8)
for (let i = 0; i < steps.length; i++) {
  const s = steps[i]
  mutations.push({
    createOrReplace: {
      _id: `step-${i + 1}`,
      _type: 'step',
      title: s.title,
      shortDesc: s.desc,
      longDesc: s.longDesc,
      order: i + 1,
    },
  })
}

// 6. Blogs (6) — with Portable Text body and author refs
for (const b of blogs) {
  const content = blogContent[b.slug]
  const authorId = content ? teamMemberIds[content.author] : undefined
  mutations.push({
    createOrReplace: {
      _id: `blog-${b.slug}`,
      _type: 'blog',
      title: b.title,
      slug: { _type: 'slug', current: b.slug },
      category: b.category,
      readingTime: b.minutes,
      publishedDate: content?.publishedDate,
      author: authorId ? { _type: 'reference', _ref: authorId } : undefined,
      body: content ? toBlocks(content.body) : [],
      featured: false,
    },
  })
}

// 7. Success Stories (6)
for (let i = 0; i < successStories.length; i++) {
  const s = successStories[i]
  mutations.push({
    createOrReplace: {
      _id: `story-${i}`,
      _type: 'successStory',
      name: s.name,
      university: s.university,
      country: countryRef(s.country),
      countryName: s.country,
      course: s.course,
      scholarship: s.scholarship,
      year: s.year,
      quote: s.quote,
      featured: false,
    },
  })
}

// 8. Events (3)
for (let i = 0; i < events.length; i++) {
  const e = events[i]
  mutations.push({
    createOrReplace: {
      _id: `event-${i}`,
      _type: 'event',
      title: e.title,
      date: `${e.date}T00:00:00.000Z`,
      mode: e.mode,
      city: e.city,
      spots: e.spots,
      featured: false,
    },
  })
}

// 9. Universities (20)
for (let i = 0; i < universitiesList.length; i++) {
  const u = universitiesList[i]
  const slug = u.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
  mutations.push({
    createOrReplace: {
      _id: `uni-${slug}`,
      _type: 'university',
      name: u.name,
      country: countryRef(u.country),
      countryName: u.country,
      ranking: u.ranking,
      type: u.type,
      city: u.city,
    },
  })
}

// 10. FAQs (5)
for (let i = 0; i < faqs.length; i++) {
  const f = faqs[i]
  mutations.push({
    createOrReplace: {
      _id: `faq-${i}`,
      _type: 'faq',
      question: f.q,
      answer: f.a,
      order: i,
    },
  })
}

// 11. Resources (6)
for (let i = 0; i < resources.length; i++) {
  const r = resources[i]
  const slug = r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
  mutations.push({
    createOrReplace: {
      _id: `resource-${slug}`,
      _type: 'resource',
      title: r.title,
      description: r.desc,
      type: r.type,
      order: i,
    },
  })
}

// 12. Case Studies (5)
for (let i = 0; i < caseStudies.length; i++) {
  const cs = caseStudies[i]
  mutations.push({
    createOrReplace: {
      _id: `casestudy-${cs.slug}`,
      _type: 'caseStudy',
      title: cs.title,
      slug: { _type: 'slug', current: cs.slug },
      studentName: cs.studentName,
      university: cs.university,
      country: countryRef(cs.countryName),
      course: cs.course,
      level: cs.level,
      scholarshipValue: cs.scholarshipValue,
      year: cs.year,
      challenge: cs.challenge,
      approach: cs.approach,
      outcome: cs.outcome,
      quote: cs.quote,
      featured: cs.featured,
      order: i,
    },
  })
}

// 13. Acceptances (38)
for (let i = 0; i < acceptances.length; i++) {
  const a = acceptances[i]
  const slug = `${a.studentName}-${a.university}-${a.year}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
  mutations.push({
    createOrReplace: {
      _id: `accept-${slug}`,
      _type: 'acceptance',
      studentName: a.studentName,
      university: a.university,
      country: countryRef(a.countryName),
      countryName: a.countryName,
      course: a.course,
      level: a.level,
      scholarship: a.scholarship,
      year: a.year,
    },
  })
}

// ── Execute ─────────────────────────────────────────────────────────────────

console.log(`\nSeeding ${mutations.length} documents into Sanity project "${projectId}" / dataset "${dataset}"...\n`)

const BATCH = 50
for (let i = 0; i < mutations.length; i += BATCH) {
  const batch = mutations.slice(i, i + BATCH)
  try {
    await client.mutate(batch, { visibility: 'async' })
    console.log(`  Batch ${Math.floor(i / BATCH) + 1}: ${batch.length} documents`)
  } catch (err) {
    console.error(`  Batch ${Math.floor(i / BATCH) + 1} FAILED:`, err.message)
    if (err.response?.body) console.error(JSON.stringify(err.response.body, null, 2))
    process.exit(1)
  }
}

console.log(`\nDone! ${mutations.length} documents seeded.`)
console.log(`
  1  siteSettings (singleton)
  8  countries (with full detail)
  4  team members
  8  services
  8  steps
  6  blogs (with Portable Text body + author refs)
  6  success stories
  3  events
  20 universities (with country refs)
  5  FAQs
  6  resources
  5  case studies
  ${acceptances.length} acceptances
  ─────────
  ${mutations.length} total
`)

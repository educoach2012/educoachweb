/**
 * Seed script — populates Sanity with content from site-data.ts
 * Run: node scripts/seed-sanity.mjs
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN env vars.
 * Generate a write token at: https://www.sanity.io/manage → project → API → Tokens
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const token = process.env.SANITY_API_TOKEN
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId || !token) {
  console.error('Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// --- Static data (mirrors site-data.ts) ---

const contact = {
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsapp: '919876543210',
  whatsappMessage: 'Hi EduCoach, I would like to book an assessment session.',
  email: 'hello@educoach.in',
  address: '3rd Floor, Prestige Tower, MG Road, Bengaluru, Karnataka 560001',
}

const stats = [
  { value: 13, suffix: '+', label: 'Years of experience', _key: 's1' },
  { value: 2500, suffix: '+', label: 'Students counselled', _key: 's2' },
  { value: 1000, suffix: '+', label: 'Admission offers', _key: 's3' },
  { value: 30, suffix: '+', label: 'Countries covered', _key: 's4' },
]

const aboutValues = [
  { title: 'Student First', desc: "Every decision starts with what's best for the student — not what's easiest for us.", _key: 'v1' },
  { title: 'Science-Backed', desc: 'Psychometric assessment and data-driven shortlisting replace guesswork.', _key: 'v2' },
  { title: 'Transparency', desc: 'No hidden fees, no commission-driven recommendations, no surprises.', _key: 'v3' },
  { title: 'End-to-End Ownership', desc: 'One counsellor owns your journey from the first call to departure day.', _key: 'v4' },
]

const aboutStory = [
  "EduCoach Services was founded in 2013 by Dr. Priya Menon, a UCL-trained education psychologist who saw a gap in how Indian students were being guided toward international education. Too many consultancies focused on form-filling; too few invested in understanding the student.",
  "Starting from a small office in Bengaluru, EduCoach pioneered the use of psychometric assessment in study-abroad counselling — matching students to courses and careers based on science, not guesswork. Over 13 years, this approach has helped over 2,500 students secure admission to top universities across 30+ countries.",
  "Today, EduCoach is a team of dedicated counsellors, essay strategists, visa experts and test-prep mentors — all working toward one goal: ensuring every student finds the right university, builds the right profile, and leaves with the right offer.",
]

// --- Helpers ---

function toBlocks(paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `b${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `s${i}`, text, marks: [] }],
  }))
}

async function seedDoc(doc) {
  const existing = await client.fetch(`*[_id == $id][0]._id`, { id: doc._id })
  if (existing) {
    console.log(`  ↻ ${doc._type} "${doc._id}" already exists, skipping`)
    return existing
  }
  const result = await client.create(doc)
  console.log(`  ✓ Created ${doc._type} "${result._id}"`)
  return result._id
}

async function seedDocWithId(doc) {
  const existing = await client.fetch(`*[_id == $id][0]._id`, { id: doc._id })
  if (existing) {
    console.log(`  ↻ ${doc._type} "${doc._id}" already exists, skipping`)
    return existing
  }
  const result = await client.createOrReplace(doc)
  console.log(`  ✓ Created ${doc._type} "${result._id}"`)
  return result._id
}

// --- Seed functions ---

async function seedSiteSettings() {
  console.log('\n📋 Site Settings')
  await seedDocWithId({
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'EduCoach Services',
    tagline: 'Find the right university. Build the right profile. Create the right future.',
    ...contact,
    mission: "To empower every student to discover their true potential and access world-class education — regardless of where they start.",
    vision: "To be India's most trusted name in study-abroad counselling, known for integrity, depth and outcomes.",
    foundedYear: 2013,
    story: aboutStory,
    stats,
    values: aboutValues,
    notificationEmail: contact.email,
  })
}

async function seedCountries() {
  console.log('\n🌍 Countries')
  const countries = [
    { slug: 'uk', name: 'United Kingdom', flag: '🇬🇧', tagline: '1-year masters, world-class research', universityCount: '150+' },
    { slug: 'usa', name: 'United States', flag: '🇺🇸', tagline: 'Ivy League and top research universities', universityCount: '400+' },
    { slug: 'canada', name: 'Canada', flag: '🇨🇦', tagline: 'Affordable, PR-friendly pathways', universityCount: '120+' },
    { slug: 'australia', name: 'Australia', flag: '🇦🇺', tagline: 'Group of Eight and vibrant campuses', universityCount: '90+' },
    { slug: 'singapore', name: 'Singapore', flag: '🇸🇬', tagline: "Asia's premier education hub", universityCount: '20+' },
    { slug: 'europe', name: 'Europe', flag: '🇪🇺', tagline: 'Low tuition, high quality, in English', universityCount: '200+' },
    { slug: 'uae', name: 'UAE', flag: '🇦🇪', tagline: 'Global campuses close to home', universityCount: '40+' },
    { slug: 'india', name: 'India', flag: '🇮🇳', tagline: 'Premier institutes and deemed universities', universityCount: '300+' },
  ]

  const countryDetails = {
    uk: {
      overview: "The United Kingdom is home to some of the world's oldest and most prestigious universities. With 1-year master's programmes, a strong research culture and a globally recognised degree, the UK remains a top choice for Indian students seeking quality and efficiency.",
      whyStudyHere: ["1-year master's programmes save time and money", 'Russell Group universities ranked among the global top 100', 'Strong post-study work visa (Graduate Route — 2 years)', 'Rich cultural experience across England, Scotland, Wales and Northern Ireland', 'Wide range of scholarships including Chevening and Commonwealth'],
      topUniversities: [
        { name: 'University of Oxford', ranking: '#1 World', city: 'Oxford', _key: 'u1' },
        { name: 'University of Cambridge', ranking: '#2 UK', city: 'Cambridge', _key: 'u2' },
        { name: 'Imperial College London', ranking: '#6 World', city: 'London', _key: 'u3' },
        { name: 'UCL', ranking: '#9 World', city: 'London', _key: 'u4' },
        { name: 'University of Edinburgh', ranking: '#22 World', city: 'Edinburgh', _key: 'u5' },
      ],
      intakes: 'September (main), January (limited)',
      averageCost: '£15,000 – £35,000 per year',
      visaInfo: 'Student Visa (Tier 4) required. EduCoach provides end-to-end visa support including financial documentation, CAS letter guidance and mock interviews.',
    },
    usa: {
      overview: "The United States offers unmatched academic diversity — from liberal arts colleges to Ivy League research universities. With a flexible curriculum, world-class faculty and a vibrant campus culture, the US continues to attract the best minds globally.",
      whyStudyHere: ["Home to 8 of the world's top 10 universities", 'Flexible curriculum with major/minor system', 'OPT allows 1–3 years of post-study work', 'Strong alumni networks and career services', 'Extensive financial aid and merit scholarships'],
      topUniversities: [
        { name: 'Stanford University', ranking: '#2 World', city: 'Stanford, CA', _key: 'u1' },
        { name: 'MIT', ranking: '#1 World (Engineering)', city: 'Cambridge, MA', _key: 'u2' },
        { name: 'Harvard University', ranking: '#4 World', city: 'Cambridge, MA', _key: 'u3' },
        { name: 'Columbia University', ranking: '#12 World', city: 'New York, NY', _key: 'u4' },
        { name: 'University of Chicago', ranking: '#13 World', city: 'Chicago, IL', _key: 'u5' },
      ],
      intakes: 'Fall (main — August/September), Spring (January)',
      averageCost: '$25,000 – $60,000 per year',
      visaInfo: 'F-1 Student Visa required. Our team guides you through I-20, SEVIS fee, DS-160 and visa interview preparation.',
    },
    canada: {
      overview: "Canada combines world-class education with one of the most welcoming immigration policies for international students. PR-friendly pathways, affordable tuition compared to the US and UK, and a safe, multicultural environment make Canada a top destination.",
      whyStudyHere: ['Direct pathway to Permanent Residency (PR)', 'Affordable tuition compared to US and UK', 'PGWP allows 1–3 years of post-study work', 'Safe, multicultural cities consistently ranked for quality of life', 'Co-op programmes integrate work experience into degrees'],
      topUniversities: [
        { name: 'University of Toronto', ranking: '#21 World', city: 'Toronto', _key: 'u1' },
        { name: 'University of British Columbia', ranking: '#34 World', city: 'Vancouver', _key: 'u2' },
        { name: 'McGill University', ranking: '#30 World', city: 'Montreal', _key: 'u3' },
        { name: 'University of Waterloo', ranking: '#112 World', city: 'Waterloo', _key: 'u4' },
        { name: 'University of Alberta', ranking: '#111 World', city: 'Edmonton', _key: 'u5' },
      ],
      intakes: 'September (main), January, May (limited)',
      averageCost: 'CA$20,000 – CA$45,000 per year',
      visaInfo: "Canada's student visa process is straightforward with our guidance on GIC, SDS stream and biometrics.",
    },
    australia: {
      overview: "Australia's Group of Eight universities rank among the world's best, and the country offers a laid-back lifestyle, strong research opportunities and post-study work rights that make it a favourite for Indian students.",
      whyStudyHere: ['Group of Eight universities in world top 100', 'Post-study work visa of 2–4 years', 'High quality of life and safety', 'Strong research funding and industry partnerships', 'Part-time work allowed during studies'],
      topUniversities: [
        { name: 'University of Melbourne', ranking: '#14 World', city: 'Melbourne', _key: 'u1' },
        { name: 'University of Sydney', ranking: '#19 World', city: 'Sydney', _key: 'u2' },
        { name: 'UNSW Sydney', ranking: '#19 World', city: 'Sydney', _key: 'u3' },
        { name: 'Australian National University', ranking: '#30 World', city: 'Canberra', _key: 'u4' },
        { name: 'Monash University', ranking: '#42 World', city: 'Melbourne', _key: 'u5' },
      ],
      intakes: 'February (main), July',
      averageCost: 'AU$25,000 – AU$50,000 per year',
      visaInfo: 'Student Visa (subclass 500) required. We assist with GTE statement, financial evidence and health insurance (OSHC).',
    },
    singapore: {
      overview: "Singapore is Asia's premier education hub — compact, safe and globally connected. Its universities rank in the world's top 15, and the city-state offers strong industry links, especially in finance, technology and biomedical sciences.",
      whyStudyHere: ['NUS and NTU consistently in world top 15', 'Strategic location in Asia with global connections', 'Strong industry links in finance and tech', 'Safe, clean and multicultural city', 'Generous government-funded scholarships (with bond)'],
      topUniversities: [
        { name: 'National University of Singapore', ranking: '#8 World', city: 'Singapore', _key: 'u1' },
        { name: 'Nanyang Technological University', ranking: '#15 World', city: 'Singapore', _key: 'u2' },
        { name: 'Singapore Management University', ranking: 'Top 50 (Business)', city: 'Singapore', _key: 'u3' },
      ],
      intakes: 'August (main), January (limited)',
      averageCost: 'S$15,000 – S$40,000 per year',
      visaInfo: 'Student Pass required. Application is university-facilitated; we help with documentation and ICA submission.',
    },
    europe: {
      overview: "Continental Europe offers high-quality education at a fraction of the cost — many countries charge little to no tuition for international students. With programmes taught in English across Germany, Netherlands, France, Ireland and more, Europe is an increasingly popular choice.",
      whyStudyHere: ['Low or zero tuition in Germany, Norway, and others', 'Growing number of English-taught programmes', 'Schengen visa allows easy travel across 27 countries', 'Strong engineering, business and design programmes', 'Rich cultural immersion and language learning'],
      topUniversities: [
        { name: 'TU Munich', ranking: '#37 World', city: 'Munich, Germany', _key: 'u1' },
        { name: 'ETH Zurich', ranking: '#7 World', city: 'Zurich, Switzerland', _key: 'u2' },
        { name: 'University of Amsterdam', ranking: '#53 World', city: 'Amsterdam, Netherlands', _key: 'u3' },
        { name: 'Trinity College Dublin', ranking: '#81 World', city: 'Dublin, Ireland', _key: 'u4' },
        { name: 'Sciences Po', ranking: 'Top 5 (Political Science)', city: 'Paris, France', _key: 'u5' },
      ],
      intakes: 'September/October (main), February (limited)',
      averageCost: '€0 – €20,000 per year (varies by country)',
      visaInfo: "National visa (Type D) required for the specific country. We guide documentation for Germany's blocked account, France's Campus France, Netherlands' Nuffic, etc.",
    },
    uae: {
      overview: "The UAE has rapidly emerged as a global education hub, hosting branch campuses of world-renowned universities. Close to India, tax-free and with a booming job market, the UAE is ideal for students seeking global exposure without going far from home.",
      whyStudyHere: ['Branch campuses of NYU, Sorbonne, Heriot-Watt and more', 'Close proximity to India (3–4 hour flight)', 'Tax-free income and strong job market', 'Safe, modern and multicultural environment', 'Growing startup and innovation ecosystem'],
      topUniversities: [
        { name: 'NYU Abu Dhabi', ranking: 'Highly Selective', city: 'Abu Dhabi', _key: 'u1' },
        { name: 'Khalifa University', ranking: '#181 World', city: 'Abu Dhabi', _key: 'u2' },
        { name: 'University of Sharjah', ranking: 'Top 300 World', city: 'Sharjah', _key: 'u3' },
        { name: 'Heriot-Watt University Dubai', ranking: 'UK Top 30', city: 'Dubai', _key: 'u4' },
        { name: 'Sorbonne University Abu Dhabi', ranking: 'France Top 5', city: 'Abu Dhabi', _key: 'u5' },
      ],
      intakes: 'September (main), January',
      averageCost: 'AED 30,000 – AED 80,000 per year',
      visaInfo: 'Student Residence Visa sponsored by the university. We assist with documentation, medical fitness and Emirates ID.',
    },
    india: {
      overview: "India's premier institutes — IITs, IIMs, AIIMS, NLUs and top private universities — offer world-class education at competitive costs. For students who prefer to stay close to home or are targeting competitive entrance exams, India remains a strong choice.",
      whyStudyHere: ["IITs and IIMs ranked among Asia's best", 'Competitive tuition compared to international options', 'Strong alumni networks in India and globally', 'Emerging research ecosystem with growing funding', 'Diverse programme options across disciplines'],
      topUniversities: [
        { name: 'IIT Bombay', ranking: '#118 World', city: 'Mumbai', _key: 'u1' },
        { name: 'IIT Delhi', ranking: '#150 World', city: 'New Delhi', _key: 'u2' },
        { name: 'IISc Bangalore', ranking: '#225 World', city: 'Bengaluru', _key: 'u3' },
        { name: 'IIM Ahmedabad', ranking: 'Top 50 (MBA)', city: 'Ahmedabad', _key: 'u4' },
        { name: 'BITS Pilani', ranking: 'India Top 10', city: 'Pilani', _key: 'u5' },
      ],
      intakes: 'July/August (main), January (limited PG)',
      averageCost: '₹2,00,000 – ₹25,00,000 per year',
      visaInfo: 'No visa required for Indian students. EduCoach assists with entrance exam strategy, application management and counselling seat acceptance.',
    },
  }

  const countryIds = {}
  for (let i = 0; i < countries.length; i++) {
    const c = countries[i]
    const details = countryDetails[c.slug] || {}
    const id = `country-${c.slug}`
    countryIds[c.slug] = id
    await seedDocWithId({
      _id: id,
      _type: 'country',
      name: c.name,
      slug: { _type: 'slug', current: c.slug },
      flag: c.flag,
      tagline: c.tagline,
      universityCount: c.universityCount,
      order: i,
      ...details,
    })
  }
  return countryIds
}

async function seedTeamMembers() {
  console.log('\n👥 Team Members')
  const experts = [
    { name: 'Dr. Priya Menon', role: 'Founder & Lead Counsellor', experience: '16 years', specialisation: 'UK & US Admissions', countries: 'UK, USA', bio: 'Dr. Priya founded EduCoach with a vision to bring research-backed career counselling to Indian students. With a doctorate in Education Psychology from UCL, she has personally mentored over 800 students into top global universities.' },
    { name: 'Sameer Kapoor', role: 'Senior Career Counsellor', experience: '12 years', specialisation: 'Career Discovery & PG', countries: 'Canada, Australia', bio: 'Sameer specialises in postgraduate admissions and career discovery. An alumnus of the University of Toronto, he brings first-hand experience of the international education landscape and has guided students to scholarships worth over ₹15 crore.' },
    { name: 'Neha Verma', role: 'Profile & Essay Strategist', experience: '9 years', specialisation: 'Ivy League Essays', countries: 'USA, Singapore', bio: 'Neha is known for her ability to draw out authentic, compelling narratives from students. Her essay strategy has helped secure admissions to Stanford, Columbia, NUS and other highly selective institutions.' },
    { name: 'Aditya Bose', role: 'Visa & Finance Advisor', experience: '11 years', specialisation: 'Visa & Scholarships', countries: 'Europe, UAE', bio: 'Aditya manages visa applications and scholarship strategy across European and Middle Eastern institutions. With a near-perfect visa approval record, he ensures no application falls through the cracks.' },
  ]

  const memberIds = {}
  for (let i = 0; i < experts.length; i++) {
    const e = experts[i]
    const id = `team-${e.name.toLowerCase().replace(/[^a-z]+/g, '-')}`
    memberIds[e.name] = id
    await seedDocWithId({ _id: id, _type: 'teamMember', ...e, order: i })
  }
  return memberIds
}

async function seedServices() {
  console.log('\n🚀 Services')
  const services = [
    { id: 'career', title: 'Career Counselling', shortDesc: 'Psychometric assessment plus 1:1 guidance to map strengths to real-world careers.', icon: 'Compass', longDesc: 'Our career counselling begins with a comprehensive psychometric assessment that maps your aptitudes, interests and personality to real-world career paths. A dedicated counsellor then works with you to shortlist the right courses, universities and countries — ensuring every choice aligns with your long-term goals.', features: ['Psychometric profiling (aptitude + personality)', 'One-on-one career mapping sessions', 'Course and university shortlisting', 'Industry-aligned career path planning', 'Parent counselling and alignment sessions'] },
    { id: 'profile', title: 'Profile Building', shortDesc: 'Research, olympiads, internships and projects that make your application unforgettable.', icon: 'Sparkles', longDesc: 'Top universities look beyond grades. We design a personalised profile-building roadmap that includes research projects, internships, olympiads, community service and extracurricular achievements — all curated to make your application stand out in a competitive applicant pool.', features: ['Personalised extracurricular roadmap', 'Research project mentoring', 'Internship and volunteering guidance', 'Olympiad and competition strategy', 'Portfolio and achievement documentation'] },
    { id: 'ug', title: 'UG Admissions', shortDesc: 'End-to-end support for undergraduate applications across 30+ countries.', icon: 'GraduationCap', longDesc: "From university shortlisting to final enrolment, we manage every step of the undergraduate application process. Our counsellors have placed students in the world's top universities and understand what each institution values in an applicant.", features: ['Strategic university shortlisting', 'Common App and UCAS management', 'Essay brainstorming and review', 'Interview preparation', 'Offer evaluation and decision support'] },
    { id: 'pg', title: 'PG Admissions', shortDesc: 'Masters, MBA and research applications with tailored SOPs and LORs.', icon: 'BookOpen', longDesc: 'Postgraduate applications demand precision — the right programme match, compelling statements of purpose, and strong letters of recommendation. We work closely with you to craft applications that reflect your academic depth and professional aspirations.', features: ['Programme and supervisor matching', 'SOP and personal statement crafting', 'LOR strategy and guidance', 'Research proposal development', 'MBA application and interview coaching'] },
    { id: 'boarding', title: 'Boarding Schools', shortDesc: 'Placements into elite boarding schools in the UK, Switzerland and beyond.', icon: 'School', longDesc: 'We help families find the right boarding school for their child — factoring in academic rigour, pastoral care, location and budget. Our network covers elite schools across the UK, Switzerland, USA and Singapore.', features: ['School shortlisting and campus insights', 'Application and entrance exam prep', 'Interview coaching for students and parents', 'Scholarship applications', 'Transition and settling-in support'] },
    { id: 'test', title: 'Test Preparation', shortDesc: 'Structured prep for SAT, IELTS, TOEFL, GRE and GMAT with proven mentors.', icon: 'PencilRuler', longDesc: 'Our structured test preparation programmes are designed to maximise scores in the shortest time. With experienced mentors, targeted practice material and regular mock tests, students consistently outperform their baselines.', features: ['SAT, IELTS, TOEFL, GRE, GMAT prep', 'Diagnostic test and study plan', 'Weekly mock tests and analytics', 'One-on-one doubt sessions', 'Score improvement guarantee'] },
    { id: 'scholarship', title: 'Scholarship Guidance', shortDesc: 'Identify and win merit and need-based scholarships worth crores.', icon: 'Award', longDesc: 'Scholarships can transform the economics of studying abroad. We maintain an updated database of merit, need-based and country-specific scholarships, and help you craft applications that maximise your chances of funding.', features: ['Scholarship database and matching', 'Application essay and portfolio preparation', 'Financial aid and fee negotiation', 'External scholarship sourcing', 'Bursary and grant identification'] },
    { id: 'visa', title: 'Visa Assistance', shortDesc: 'Documentation, mock interviews and end-to-end visa filing support.', icon: 'Plane', longDesc: 'A visa rejection can derail months of effort. Our visa team handles documentation, financial proof preparation, mock interviews and filing — giving you the confidence that your application is thorough and compliant.', features: ['Document checklist and review', 'Financial documentation guidance', 'Mock visa interviews', 'Application filing and tracking', 'Post-visa pre-departure briefing'] },
  ]

  for (let i = 0; i < services.length; i++) {
    const s = services[i]
    await seedDocWithId({
      _id: `service-${s.id}`,
      _type: 'service',
      title: s.title,
      serviceId: s.id,
      icon: s.icon,
      shortDesc: s.shortDesc,
      longDesc: s.longDesc,
      features: s.features,
      order: i,
    })
  }
}

async function seedSteps() {
  console.log('\n📝 Steps')
  const steps = [
    { title: 'Discover', shortDesc: 'Understand your goals, strengths and constraints.', longDesc: 'We start with a deep conversation — understanding your academic background, interests, family expectations and long-term ambitions. This forms the foundation for every decision that follows.' },
    { title: 'Assess', shortDesc: 'Psychometric and academic evaluation.', longDesc: "Using validated psychometric tools, we map your aptitudes, personality traits and learning style. Combined with your academic profile, this gives us a science-backed picture of where you'll thrive." },
    { title: 'Counsel', shortDesc: 'Map right-fit courses, universities and countries.', longDesc: 'Your dedicated counsellor shortlists courses, universities and countries that align with your profile and goals. Every recommendation is backed by data on acceptance rates, outcomes and fit.' },
    { title: 'Profile Building', shortDesc: 'Build the experiences that set you apart.', longDesc: "We design a personalised roadmap of research, internships, projects and extracurriculars that strengthen your application. This isn't generic advice — it's curated to match what your target universities value." },
    { title: 'Applications', shortDesc: 'Essays, SOPs, LORs and submissions done right.', longDesc: "From brainstorming essay topics to final submission, we guide every element. Your counsellor reviews multiple drafts, ensuring your authentic voice shines through while meeting each university's expectations." },
    { title: 'Offers', shortDesc: 'Compare, negotiate and choose the best offer.', longDesc: "When offers arrive, we help you evaluate them holistically — considering rankings, scholarships, location, career outcomes and visa pathways — so you make the right choice, not just the obvious one." },
    { title: 'Visa', shortDesc: 'Documentation and interview preparation.', longDesc: "Our visa team prepares your documentation, conducts mock interviews and files your application. We've handled thousands of visa cases and know what consulates look for." },
    { title: 'Departure', shortDesc: 'Pre-departure briefing and settling-in support.', longDesc: 'Before you fly, we cover everything — accommodation, banking, SIM cards, cultural tips and airport logistics. You leave with confidence, and your family leaves with peace of mind.' },
  ]

  for (let i = 0; i < steps.length; i++) {
    const s = steps[i]
    await seedDocWithId({
      _id: `step-${i + 1}`,
      _type: 'step',
      title: s.title,
      shortDesc: s.shortDesc,
      longDesc: s.longDesc,
      order: i + 1,
    })
  }
}

async function seedSuccessStories(countryIds) {
  console.log('\n⭐ Success Stories')
  const stories = [
    { name: 'Ananya Sharma', university: 'University of Oxford', countrySlug: 'uk', course: 'PPE', scholarship: '£25,000', year: 2025, quote: "EduCoach turned my scattered ideas into a story Oxford couldn't ignore." },
    { name: 'Rohan Mehta', university: 'Stanford University', countrySlug: 'usa', course: 'Computer Science', scholarship: '$40,000', year: 2025, quote: 'The profile-building roadmap made all the difference in my application.' },
    { name: 'Ishita Nair', university: 'University of Toronto', countrySlug: 'canada', course: 'Biotechnology', scholarship: 'CA$18,000', year: 2024, quote: 'From SOPs to visa, every step felt handled and human.' },
    { name: 'Kabir Singh', university: 'University of Melbourne', countrySlug: 'australia', course: 'Data Science', scholarship: 'AU$20,000', year: 2024, quote: "My counsellor believed in me before I did. Now I'm in the Group of Eight." },
    { name: 'Meera Iyer', university: 'National University of Singapore', countrySlug: 'singapore', course: 'Business Analytics', scholarship: 'S$15,000', year: 2025, quote: 'Strategic, calm and genuinely invested in my future.' },
    { name: 'Arjun Rao', university: 'TU Munich', countrySlug: 'europe', course: 'Mechanical Engineering', scholarship: 'Full tuition', year: 2024, quote: "They found a fully-funded pathway I didn't know existed." },
  ]

  for (const s of stories) {
    const id = `story-${s.name.toLowerCase().replace(/[^a-z]+/g, '-')}`
    const countryRef = countryIds[s.countrySlug]
    await seedDocWithId({
      _id: id,
      _type: 'successStory',
      name: s.name,
      university: s.university,
      country: countryRef ? { _type: 'reference', _ref: countryRef } : undefined,
      countryName: s.countrySlug,
      course: s.course,
      scholarship: s.scholarship,
      year: s.year,
      quote: s.quote,
      featured: true,
    })
  }
}

async function seedEvents() {
  console.log('\n📅 Events')
  const events = [
    { title: 'UK Universities Masterclass', date: '2026-08-22T10:00:00Z', mode: 'Online', city: 'Live Webinar', spots: 'Limited seats' },
    { title: 'US Ivy League Profile Workshop', date: '2026-09-05T10:00:00Z', mode: 'In-person', city: 'Bengaluru', spots: '30 seats' },
    { title: 'Study in Canada — Parent Session', date: '2026-09-19T10:00:00Z', mode: 'Online', city: 'Live Webinar', spots: 'Free entry' },
  ]

  for (const e of events) {
    const id = `event-${e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    await seedDocWithId({ _id: id, _type: 'event', ...e, featured: true })
  }
}

async function seedBlogs(memberIds) {
  console.log('\n📰 Blog Posts')
  const blogs = [
    { title: 'How to Build a Standout University Profile in Class 11', category: 'Admissions', readingTime: 7, slug: 'standout-profile-class-11', author: 'Neha Verma', publishedDate: '2026-07-15' },
    { title: '2026 Scholarship Guide: Funding Your Study Abroad Dream', category: 'Scholarships', readingTime: 9, slug: 'scholarship-guide-2026', author: 'Aditya Bose', publishedDate: '2026-06-20' },
    { title: 'SAT vs ACT: Which Test Is Right for You?', category: 'SAT', readingTime: 6, slug: 'sat-vs-act', author: 'Neha Verma', publishedDate: '2026-05-10' },
    { title: 'IELTS in 30 Days: A Realistic Study Plan', category: 'IELTS', readingTime: 8, slug: 'ielts-30-day-plan', author: 'Sameer Kapoor', publishedDate: '2026-04-25' },
    { title: 'UK vs USA for Undergrad: An Honest Comparison', category: 'Country Guides', readingTime: 10, slug: 'uk-vs-usa-undergrad', author: 'Dr. Priya Menon', publishedDate: '2026-03-18' },
    { title: "A Parent's Guide to Study Abroad Costs", category: 'Parent Guides', readingTime: 7, slug: 'parents-guide-costs', author: 'Aditya Bose', publishedDate: '2026-02-10' },
  ]

  const blogBodies = {
    'standout-profile-class-11': [
      "Building a standout university profile isn't something you start in Class 12 — the strongest applications are built over years of intentional effort, and Class 11 is the ideal starting point.",
      "Top universities look beyond grades. They want to see intellectual curiosity, leadership, community engagement, and a clear narrative that ties your activities to your goals.",
      "Start by identifying your core interests — not just academic subjects, but the problems you care about. If you're interested in environmental science, start a school recycling initiative or write a blog about local environmental issues.",
      "Internships are another powerful tool. Even short-term experiences at a research lab, startup, or NGO can add depth to your profile.",
      "Finally, focus on standardised test preparation early. A strong SAT or IELTS score, achieved without last-minute stress, frees up bandwidth for essays and interviews in Class 12.",
    ],
    'scholarship-guide-2026': [
      "Studying abroad is an investment — but it doesn't have to be an unaffordable one. Scholarships can cover anywhere from 10% to 100% of your costs.",
      "Merit-based scholarships reward academic excellence, leadership, and extracurricular achievement. Need-based aid considers your family's financial situation.",
      "Start your scholarship search early. Databases like ScholarshipPortal, Chevening, and university-specific pages list hundreds of options.",
      "The application process matters as much as your profile. Scholarship essays should tell a story — not list achievements.",
      "Don't overlook external scholarships from corporates, foundations, and government bodies. Many of these are less competitive than university scholarships.",
    ],
    'sat-vs-act': [
      "If you're applying to US universities, you've likely encountered the SAT vs ACT debate. Both tests are accepted by virtually all American colleges.",
      "The SAT focuses on evidence-based reading and writing, plus math. It rewards careful analysis and tends to favour students strong in reading comprehension.",
      "The ACT includes an additional Science section — but it's really a test of data interpretation and scientific reasoning, not biology or chemistry knowledge.",
      "Take a diagnostic test for both formats. Many students find they naturally score higher on one.",
      "Regardless of which test you choose, structured preparation over 3–6 months yields the best results.",
    ],
    'ielts-30-day-plan': [
      "Thirty days is a realistic timeframe for IELTS preparation — if you already have a solid foundation in English.",
      "Week 1: Take a full diagnostic test under timed conditions. Identify your weakest band and allocate 60% of daily practice to it.",
      "Week 2: Focus on targeted practice. For Reading, work on skimming and scanning techniques. For Writing, learn the structure of Task 1 and Task 2.",
      "Week 3: Take two full mock tests this week. Review every mistake — understanding the marking criteria is crucial.",
      "Week 4: Final refinement. Focus on time management — many students lose marks not from lack of knowledge but from running out of time.",
    ],
    'uk-vs-usa-undergrad': [
      "The UK and USA are the two most popular study-abroad destinations — but they offer fundamentally different undergraduate experiences.",
      "In the UK, you apply directly to a specific course. The degree is typically 3 years, highly specialised from Year 1.",
      "In the US, you apply to a university, not a specific major. The first two years include general education requirements. You declare a major later.",
      "Cost is another major factor. UK tuition for a 3-year degree can work out cheaper — but top US universities often offer generous need-based financial aid.",
      "Campus culture differs too. US universities emphasise a holistic experience — sports, clubs, and campus living are central. UK universities tend to be more academically focused.",
    ],
    'parents-guide-costs': [
      "Planning the finances of studying abroad is one of the biggest decisions a family makes.",
      "Tuition varies enormously: from €0 in Germany and Norway to $60,000+ per year at top US private universities.",
      "Living costs are the hidden variable. London, New York, and Sydney are significantly more expensive than smaller university towns.",
      "Don't forget one-time costs: visa application fees, health insurance, flight tickets, and initial accommodation deposits.",
      "The good news: education loans are widely available from Indian banks, and many countries allow part-time work during studies.",
    ],
  }

  for (const b of blogs) {
    const id = `blog-${b.slug}`
    const authorRef = memberIds[b.author]
    const bodyParagraphs = blogBodies[b.slug] || []
    await seedDocWithId({
      _id: id,
      _type: 'blog',
      title: b.title,
      slug: { _type: 'slug', current: b.slug },
      category: b.category,
      readingTime: b.readingTime,
      publishedDate: b.publishedDate,
      author: authorRef ? { _type: 'reference', _ref: authorRef } : undefined,
      body: toBlocks(bodyParagraphs),
      featured: true,
    })
  }
}

async function seedUniversities(countryIds) {
  console.log('\n🎓 Universities')
  const unis = [
    { name: 'University of Oxford', countrySlug: 'uk', ranking: '#1 World', type: 'Public', city: 'Oxford' },
    { name: 'University of Cambridge', countrySlug: 'uk', ranking: '#2 UK', type: 'Public', city: 'Cambridge' },
    { name: 'Imperial College London', countrySlug: 'uk', ranking: '#6 World', type: 'Public', city: 'London' },
    { name: 'UCL', countrySlug: 'uk', ranking: '#9 World', type: 'Public', city: 'London' },
    { name: 'Stanford University', countrySlug: 'usa', ranking: '#2 World', type: 'Private', city: 'Stanford, CA' },
    { name: 'MIT', countrySlug: 'usa', ranking: '#1 Engineering', type: 'Private', city: 'Cambridge, MA' },
    { name: 'Harvard University', countrySlug: 'usa', ranking: '#4 World', type: 'Private', city: 'Cambridge, MA' },
    { name: 'Columbia University', countrySlug: 'usa', ranking: '#12 World', type: 'Private', city: 'New York, NY' },
    { name: 'University of Toronto', countrySlug: 'canada', ranking: '#21 World', type: 'Public', city: 'Toronto' },
    { name: 'UBC', countrySlug: 'canada', ranking: '#34 World', type: 'Public', city: 'Vancouver' },
    { name: 'McGill University', countrySlug: 'canada', ranking: '#30 World', type: 'Public', city: 'Montreal' },
    { name: 'University of Melbourne', countrySlug: 'australia', ranking: '#14 World', type: 'Public', city: 'Melbourne' },
    { name: 'University of Sydney', countrySlug: 'australia', ranking: '#19 World', type: 'Public', city: 'Sydney' },
    { name: 'NUS', countrySlug: 'singapore', ranking: '#8 World', type: 'Public', city: 'Singapore' },
    { name: 'NTU', countrySlug: 'singapore', ranking: '#15 World', type: 'Public', city: 'Singapore' },
    { name: 'TU Munich', countrySlug: 'europe', ranking: '#37 World', type: 'Public', city: 'Munich' },
    { name: 'ETH Zurich', countrySlug: 'europe', ranking: '#7 World', type: 'Public', city: 'Zurich' },
    { name: 'NYU Abu Dhabi', countrySlug: 'uae', ranking: 'Highly Selective', type: 'Private', city: 'Abu Dhabi' },
    { name: 'IIT Bombay', countrySlug: 'india', ranking: '#118 World', type: 'Public', city: 'Mumbai' },
    { name: 'IIT Delhi', countrySlug: 'india', ranking: '#150 World', type: 'Public', city: 'New Delhi' },
  ]

  for (const u of unis) {
    const id = `uni-${u.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    const countryRef = countryIds[u.countrySlug]
    const countryNames = { uk: 'United Kingdom', usa: 'United States', canada: 'Canada', australia: 'Australia', singapore: 'Singapore', europe: 'Europe', uae: 'UAE', india: 'India' }
    await seedDocWithId({
      _id: id,
      _type: 'university',
      name: u.name,
      country: countryRef ? { _type: 'reference', _ref: countryRef } : undefined,
      countryName: countryNames[u.countrySlug],
      ranking: u.ranking,
      type: u.type,
      city: u.city,
    })
  }
}

async function seedFaqs() {
  console.log('\n❓ FAQs')
  const faqs = [
    { q: 'When is the right time to start counselling?', a: 'The earlier the better — ideally in Grade 9 or 10 so we can build a strong profile over time. That said, we support students at every stage, including last-minute applicants.' },
    { q: 'What happens in an assessment session?', a: 'We understand your goals, run a psychometric assessment, review your academics, and give you a clear, personalised roadmap toward the right courses and universities.' },
    { q: 'Which countries and universities do you cover?', a: 'We cover the UK, USA, Canada, Australia, Singapore, Europe, UAE and India, working with top global universities across all major disciplines.' },
    { q: 'Do you help with scholarships and visas?', a: 'Yes. Scholarship strategy and end-to-end visa support — including documentation and mock interviews — are core parts of our service.' },
    { q: 'How are you different from other consultancies?', a: 'We combine science-backed psychometric assessment, a dedicated counsellor, and genuine profile building — not just application form-filling.' },
  ]

  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i]
    await seedDocWithId({
      _id: `faq-${i + 1}`,
      _type: 'faq',
      question: f.q,
      answer: f.a,
      order: i + 1,
    })
  }
}

async function seedResources() {
  console.log('\n📁 Resources')
  const resources = [
    { title: 'Study Abroad Starter Guide', description: 'A comprehensive guide covering timelines, costs, and how to choose the right country and university.', type: 'Guide' },
    { title: 'Scholarship Database 2026', description: 'A curated list of merit and need-based scholarships across 30+ countries, updated annually.', type: 'Tool' },
    { title: 'University Comparison Checklist', description: 'A structured checklist to compare universities across ranking, cost, location, and career outcomes.', type: 'Checklist' },
    { title: 'SOP Writing Template', description: 'A proven statement of purpose template with guidance notes used by our essay strategists.', type: 'Template' },
    { title: 'Visa Document Checklist', description: 'Country-specific visa documentation checklists for UK, USA, Canada, Australia and more.', type: 'Checklist' },
    { title: 'IELTS Preparation Planner', description: 'A 30-day and 60-day IELTS study plan with daily tasks and recommended resources.', type: 'Guide' },
  ]

  for (let i = 0; i < resources.length; i++) {
    const r = resources[i]
    await seedDocWithId({
      _id: `resource-${i + 1}`,
      _type: 'resource',
      title: r.title,
      description: r.description,
      type: r.type,
      order: i + 1,
    })
  }
}

// --- Main ---

async function main() {
  console.log('🌱 Seeding Sanity CMS...')
  console.log(`   Project: ${projectId}`)
  console.log(`   Dataset: ${dataset}`)

  await seedSiteSettings()
  const countryIds = await seedCountries()
  const memberIds = await seedTeamMembers()
  await seedServices()
  await seedSteps()
  await seedSuccessStories(countryIds)
  await seedEvents()
  await seedBlogs(memberIds)
  await seedUniversities(countryIds)
  await seedFaqs()
  await seedResources()

  console.log('\n✅ Seeding complete!')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

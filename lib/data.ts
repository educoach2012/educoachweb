import { client } from '@/sanity/lib/client'
import { projectId } from '@/sanity/env'
import * as queries from '@/sanity/lib/queries'
import * as siteData from './site-data'
import type {
  SiteSettings,
  Country,
  CountryDetail,
  Service,
  Blog,
  BlogDetail,
  SuccessStory,
  TeamMember,
  Event,
  University,
  Faq,
  Resource,
  Step,
  CaseStudy,
  Acceptance,
} from './types'

const useCms = !!projectId

const fetchOptions = { next: { revalidate: 60 } } as const

async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return client.fetch<T>(query, params ?? {}, fetchOptions)
}

const fallbackSettings: SiteSettings = {
  companyName: 'EduCoach Services',
  phone: siteData.contact.phone,
  phoneHref: siteData.contact.phoneHref,
  whatsapp: siteData.contact.whatsapp,
  whatsappMessage: siteData.contact.whatsappMessage,
  email: siteData.contact.email,
  address: siteData.contact.address,
  stats: siteData.stats,
  mission: siteData.aboutContent.mission,
  vision: siteData.aboutContent.vision,
  foundedYear: siteData.aboutContent.foundedYear,
  story: siteData.aboutContent.story,
  values: siteData.aboutContent.values,
  assessmentFormUrl: null,
  notificationEmail: null,
  gtmId: null,
  ga4Id: null,
  seoTitle: null,
  seoDescription: null,
  seoImage: null,
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (useCms) {
    const result = await sanityFetch<SiteSettings | null>(queries.siteSettingsQuery)
    if (!result) return fallbackSettings
    return {
      ...fallbackSettings,
      ...result,
      stats: result.stats ?? fallbackSettings.stats,
      values: result.values ?? fallbackSettings.values,
      story: result.story ?? fallbackSettings.story,
    }
  }
  return fallbackSettings
}

export async function getCountries(): Promise<Country[]> {
  if (useCms) return (await sanityFetch<Country[] | null>(queries.countriesQuery)) ?? []
  return siteData.countries.map((c, i) => ({
    ...c,
    universityCount: c.universities,
    order: i,
  }))
}

export async function getCountryBySlug(slug: string): Promise<CountryDetail | null> {
  if (useCms) return sanityFetch<CountryDetail | null>(queries.countryBySlugQuery, { slug })
  const country = siteData.countries.find((c) => c.slug === slug)
  const details = siteData.countryDetails[slug]
  if (!country || !details) return null
  return { ...country, universityCount: country.universities, ...details }
}

export async function getServices(): Promise<Service[]> {
  if (useCms) return (await sanityFetch<Service[] | null>(queries.servicesQuery)) ?? []
  return siteData.services.map((s, i) => ({ ...s, serviceId: s.id, shortDesc: s.desc, order: i }))
}

export async function getBlogs(): Promise<Blog[]> {
  if (useCms) return (await sanityFetch<Blog[] | null>(queries.blogsQuery)) ?? []
  return siteData.blogs.map((b) => ({ ...b, readingTime: b.minutes }))
}

export async function getBlogBySlug(slug: string): Promise<BlogDetail | null> {
  if (useCms) return sanityFetch<BlogDetail | null>(queries.blogBySlugQuery, { slug })
  const blog = siteData.blogs.find((b) => b.slug === slug)
  if (!blog) return null
  const content = siteData.blogContent[slug]
  return {
    ...blog,
    readingTime: blog.minutes,
    ...(content ?? {}),
    author: content?.author ? { name: content.author, role: 'EduCoach Services' } : null,
    body: content?.body ? content.body.map((text: string) => ({ children: [{ text }] })) : [],
  }
}

export async function getSuccessStories(): Promise<SuccessStory[]> {
  if (useCms) return (await sanityFetch<SuccessStory[] | null>(queries.successStoriesQuery)) ?? []
  return siteData.successStories.map((s) => ({ ...s, countryName: s.country }))
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (useCms) return (await sanityFetch<TeamMember[] | null>(queries.teamMembersQuery)) ?? []
  return siteData.experts.map((e, i) => ({ ...e, order: i }))
}

export async function getEvents(): Promise<Event[]> {
  if (useCms) return (await sanityFetch<Event[] | null>(queries.eventsQuery)) ?? []
  return siteData.events
}

export async function getUniversities(): Promise<University[]> {
  if (useCms) return (await sanityFetch<University[] | null>(queries.universitiesQuery)) ?? []
  return siteData.universities.map((u) => ({ ...u, countryName: u.country }))
}

export async function getFaqs(): Promise<Faq[]> {
  if (useCms) return (await sanityFetch<Faq[] | null>(queries.faqsQuery)) ?? []
  return siteData.faqs.map((f) => ({ question: f.q, answer: f.a }))
}

export async function getResources(): Promise<Resource[]> {
  if (useCms) return (await sanityFetch<Resource[] | null>(queries.resourcesQuery)) ?? []
  return siteData.resources.map((r) => ({ ...r, description: r.desc }))
}

export async function getSteps(): Promise<Step[]> {
  if (useCms) return (await sanityFetch<Step[] | null>(queries.stepsQuery)) ?? []
  return siteData.steps.map((s, i) => ({ ...s, shortDesc: s.desc, order: i + 1 }))
}

const dummyCaseStudies: CaseStudy[] = [
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

const dummyAcceptances: Acceptance[] = [
  // 2025
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
  // 2024
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
  // 2023
  { studentName: 'Shreya Dutta', university: 'University of Warwick', countryName: 'United Kingdom', course: 'MSc Business Analytics', level: 'Postgraduate', scholarship: '£8,000', year: 2023 },
  { studentName: 'Nikhil Bhatt', university: 'Columbia University', countryName: 'United States', course: 'MS Data Science', level: 'Postgraduate', scholarship: '$20,000', year: 2023 },
  { studentName: 'Anika Das', university: 'University of Melbourne', countryName: 'Australia', course: 'Master of Architecture', level: 'Postgraduate', year: 2023 },
  { studentName: 'Rohan Pillai', university: 'NUS Singapore', countryName: 'Singapore', course: 'MSc Finance', level: 'Postgraduate', scholarship: 'S$12,000', year: 2023 },
  { studentName: 'Tanvi Jain', university: 'Trinity College Dublin', countryName: 'Europe', course: 'Computer Science', level: 'Undergraduate', scholarship: '€5,000', year: 2023 },
  { studentName: 'Sahil Mehra', university: 'University of Toronto', countryName: 'Canada', course: 'Computer Engineering', level: 'Undergraduate', scholarship: 'CA$8,000', year: 2023 },
  { studentName: 'Kriti Sharma', university: 'King\'s College London', countryName: 'United Kingdom', course: 'LLM International Law', level: 'Postgraduate', year: 2023 },
  { studentName: 'Aravind Kumar', university: 'Georgia Institute of Technology', countryName: 'United States', course: 'MS Computer Science', level: 'Postgraduate', scholarship: '$15,000', year: 2023 },
]

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (useCms) {
    const result = (await sanityFetch<CaseStudy[] | null>(queries.caseStudiesQuery)) ?? []
    return result.length > 0 ? result : dummyCaseStudies
  }
  return dummyCaseStudies
}

export async function getAcceptances(): Promise<Acceptance[]> {
  if (useCms) {
    const result = (await sanityFetch<Acceptance[] | null>(queries.acceptancesQuery)) ?? []
    return result.length > 0 ? result : dummyAcceptances
  }
  return dummyAcceptances
}

export async function getStoriesByCountry(slug: string): Promise<SuccessStory[]> {
  if (useCms) return (await sanityFetch<SuccessStory[] | null>(queries.storiesByCountryQuery, { slug })) ?? []
  return siteData.successStories
    .filter((s) => s.country.toLowerCase().replace(/\s+/g, '-') === slug)
    .map((s) => ({ ...s, countryName: s.country }))
}

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
    return result ?? fallbackSettings
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
    title: 'How we helped Priya secure a full scholarship at LSE',
    slug: 'priya-lse-scholarship',
    studentName: 'Priya Sharma',
    university: 'London School of Economics',
    countryName: 'United Kingdom',
    course: 'MSc Economics',
    level: 'Postgraduate',
    scholarshipValue: '£45,000 (Full tuition)',
    year: 2025,
    challenge: 'Priya had strong academics but a thin extracurricular profile. She had applied independently the previous year and was rejected from her top 3 choices. Her confidence was low and she was considering settling for a less competitive programme.',
    approach: 'We started with a psychometric assessment that revealed strong analytical and leadership aptitudes. Over 8 months, we helped Priya build a research portfolio — including a published paper on behavioural economics — redesigned her SOP to tell a compelling narrative, and prepped her for LSE\'s interview.',
    outcome: 'Priya received offers from LSE, UCL, and Warwick — all with scholarship offers. She chose LSE with a full-tuition scholarship worth £45,000.',
    quote: 'EduCoach didn\'t just fix my application — they helped me see what I was capable of.',
    featured: true,
  },
  {
    title: 'From average scores to Stanford — Arjun\'s transformation',
    slug: 'arjun-stanford-journey',
    studentName: 'Arjun Mehta',
    university: 'Stanford University',
    countryName: 'United States',
    course: 'BS Computer Science',
    level: 'Undergraduate',
    scholarshipValue: '$50,000/year',
    year: 2025,
    challenge: 'Arjun was a bright student but his board exam scores were average (88%). He had no olympiad medals and his extracurriculars were generic. His parents were sceptical that top US universities were realistic.',
    approach: 'Starting in Class 10, we built a 2-year profile roadmap. Arjun developed an open-source accessibility tool that gained 2,000+ GitHub stars, interned at a startup, and led his school\'s coding club. His Common App essay told the story of building tech for his visually impaired grandmother.',
    outcome: 'Arjun was admitted to Stanford, MIT, and Georgia Tech. Stanford offered $50,000/year in financial aid. His GitHub project was specifically mentioned by the admissions committee.',
    quote: 'They saw something in me that I hadn\'t seen in myself. Two years later, I\'m at Stanford.',
    featured: true,
  },
  {
    title: 'Meera\'s path to University of Toronto with PR pathway',
    slug: 'meera-toronto-pr',
    studentName: 'Meera Iyer',
    university: 'University of Toronto',
    countryName: 'Canada',
    course: 'MSc Biotechnology',
    level: 'Postgraduate',
    scholarshipValue: 'CA$25,000',
    year: 2024,
    challenge: 'Meera wanted a programme that would lead to permanent residency in Canada, but she was confused by the immigration pathways and had applied to programmes that didn\'t qualify for PGWP.',
    approach: 'We mapped her academic interests against PR-eligible programmes, shortlisted universities in provinces with favourable PNP streams, and crafted her SOP around her biotech research experience. We also connected her with an EduCoach alum in Toronto for mentorship.',
    outcome: 'Meera was admitted to UofT with a CA$25,000 scholarship. She\'s now on track for PR through the Ontario PNP stream after graduation.',
    quote: 'EduCoach understood that my goal wasn\'t just a degree — it was a life in Canada. They planned for both.',
    featured: false,
  },
]

const dummyAcceptances: Acceptance[] = [
  { studentName: 'Ananya Sharma', university: 'University of Oxford', countryName: 'United Kingdom', course: 'PPE', level: 'Undergraduate', scholarship: '£25,000', year: 2025 },
  { studentName: 'Rohan Mehta', university: 'Stanford University', countryName: 'United States', course: 'Computer Science', level: 'Undergraduate', scholarship: '$40,000/year', year: 2025 },
  { studentName: 'Ishita Nair', university: 'University of Toronto', countryName: 'Canada', course: 'Biotechnology', level: 'Postgraduate', scholarship: 'CA$18,000', year: 2024 },
  { studentName: 'Kabir Singh', university: 'University of Melbourne', countryName: 'Australia', course: 'Data Science', level: 'Postgraduate', scholarship: 'AU$20,000', year: 2024 },
  { studentName: 'Meera Iyer', university: 'National University of Singapore', countryName: 'Singapore', course: 'Business Analytics', level: 'Postgraduate', scholarship: 'S$15,000', year: 2025 },
  { studentName: 'Arjun Rao', university: 'TU Munich', countryName: 'Europe', course: 'Mechanical Engineering', level: 'Postgraduate', scholarship: 'Full tuition', year: 2024 },
  { studentName: 'Sneha Patel', university: 'Imperial College London', countryName: 'United Kingdom', course: 'Biomedical Engineering', level: 'Postgraduate', scholarship: '£15,000', year: 2025 },
  { studentName: 'Vikram Desai', university: 'Columbia University', countryName: 'United States', course: 'MBA', level: 'MBA', scholarship: '$30,000', year: 2025 },
  { studentName: 'Riya Gupta', university: 'McGill University', countryName: 'Canada', course: 'Psychology', level: 'Undergraduate', year: 2024 },
  { studentName: 'Aditya Joshi', university: 'University of Sydney', countryName: 'Australia', course: 'Finance', level: 'Postgraduate', scholarship: 'AU$10,000', year: 2025 },
  { studentName: 'Nandini Reddy', university: 'ETH Zurich', countryName: 'Europe', course: 'Computer Science', level: 'Postgraduate', scholarship: 'Full tuition', year: 2024 },
  { studentName: 'Karan Malhotra', university: 'NYU Abu Dhabi', countryName: 'UAE', course: 'Economics', level: 'Undergraduate', scholarship: 'Full scholarship', year: 2025 },
  { studentName: 'Tanya Bhatia', university: 'University of Cambridge', countryName: 'United Kingdom', course: 'Natural Sciences', level: 'Undergraduate', year: 2025 },
  { studentName: 'Rahul Khanna', university: 'University of British Columbia', countryName: 'Canada', course: 'Civil Engineering', level: 'Postgraduate', scholarship: 'CA$12,000', year: 2024 },
  { studentName: 'Pooja Nair', university: 'Harvard University', countryName: 'United States', course: 'Public Health', level: 'Postgraduate', scholarship: '$35,000', year: 2025 },
  { studentName: 'Aman Trivedi', university: 'NTU Singapore', countryName: 'Singapore', course: 'Electrical Engineering', level: 'Postgraduate', scholarship: 'S$20,000', year: 2024 },
]

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (useCms) return (await sanityFetch<CaseStudy[] | null>(queries.caseStudiesQuery)) ?? []
  return dummyCaseStudies
}

export async function getAcceptances(): Promise<Acceptance[]> {
  if (useCms) return (await sanityFetch<Acceptance[] | null>(queries.acceptancesQuery)) ?? []
  return dummyAcceptances
}

export async function getStoriesByCountry(slug: string): Promise<SuccessStory[]> {
  if (useCms) return (await sanityFetch<SuccessStory[] | null>(queries.storiesByCountryQuery, { slug })) ?? []
  return siteData.successStories
    .filter((s) => s.country.toLowerCase().replace(/\s+/g, '-') === slug)
    .map((s) => ({ ...s, countryName: s.country }))
}

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
} from './types'

const useCms = !!projectId

const fetchOptions = { next: { revalidate: 60 } } as const

async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return client.fetch<T>(query, params ?? {}, fetchOptions)
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (useCms) return sanityFetch<SiteSettings | null>(queries.siteSettingsQuery)
  return {
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
  }
}

export async function getCountries(): Promise<Country[]> {
  if (useCms) return sanityFetch<Country[]>(queries.countriesQuery)
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
  if (useCms) return sanityFetch<Service[]>(queries.servicesQuery)
  return siteData.services.map((s, i) => ({ ...s, serviceId: s.id, shortDesc: s.desc, order: i }))
}

export async function getBlogs(): Promise<Blog[]> {
  if (useCms) return sanityFetch<Blog[]>(queries.blogsQuery)
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
  if (useCms) return sanityFetch<SuccessStory[]>(queries.successStoriesQuery)
  return siteData.successStories.map((s) => ({ ...s, countryName: s.country }))
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (useCms) return sanityFetch<TeamMember[]>(queries.teamMembersQuery)
  return siteData.experts.map((e, i) => ({ ...e, order: i }))
}

export async function getEvents(): Promise<Event[]> {
  if (useCms) return sanityFetch<Event[]>(queries.eventsQuery)
  return siteData.events
}

export async function getUniversities(): Promise<University[]> {
  if (useCms) return sanityFetch<University[]>(queries.universitiesQuery)
  return siteData.universities.map((u) => ({ ...u, countryName: u.country }))
}

export async function getFaqs(): Promise<Faq[]> {
  if (useCms) return sanityFetch<Faq[]>(queries.faqsQuery)
  return siteData.faqs.map((f) => ({ question: f.q, answer: f.a }))
}

export async function getResources(): Promise<Resource[]> {
  if (useCms) return sanityFetch<Resource[]>(queries.resourcesQuery)
  return siteData.resources.map((r) => ({ ...r, description: r.desc }))
}

export async function getSteps(): Promise<Step[]> {
  if (useCms) return sanityFetch<Step[]>(queries.stepsQuery)
  return siteData.steps.map((s, i) => ({ ...s, shortDesc: s.desc, order: i + 1 }))
}

export async function getStoriesByCountry(slug: string): Promise<SuccessStory[]> {
  if (useCms) return sanityFetch<SuccessStory[]>(queries.storiesByCountryQuery, { slug })
  return siteData.successStories
    .filter((s) => s.country.toLowerCase().replace(/\s+/g, '-') === slug)
    .map((s) => ({ ...s, countryName: s.country }))
}

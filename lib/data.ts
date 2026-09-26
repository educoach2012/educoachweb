import { client } from '@/sanity/lib/client'
import * as queries from '@/sanity/lib/queries'
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
  PageContent,
  Programme,
} from './types'

const fetchOptions = { next: { revalidate: 60 } } as const

async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return client.fetch<T>(query, params ?? {}, fetchOptions)
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await sanityFetch<SiteSettings | null>(queries.siteSettingsQuery)
  if (!result) throw new Error('Site settings not found in CMS')
  return result
}

export async function getCountries(): Promise<Country[]> {
  return (await sanityFetch<Country[] | null>(queries.countriesQuery)) ?? []
}

export async function getCountryBySlug(slug: string): Promise<CountryDetail | null> {
  return sanityFetch<CountryDetail | null>(queries.countryBySlugQuery, { slug })
}

export async function getServices(): Promise<Service[]> {
  return (await sanityFetch<Service[] | null>(queries.servicesQuery)) ?? []
}

export async function getBlogs(): Promise<Blog[]> {
  return (await sanityFetch<Blog[] | null>(queries.blogsQuery)) ?? []
}

export async function getBlogBySlug(slug: string): Promise<BlogDetail | null> {
  return sanityFetch<BlogDetail | null>(queries.blogBySlugQuery, { slug })
}

export async function getSuccessStories(): Promise<SuccessStory[]> {
  return (await sanityFetch<SuccessStory[] | null>(queries.successStoriesQuery)) ?? []
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return (await sanityFetch<TeamMember[] | null>(queries.teamMembersQuery)) ?? []
}

export async function getEvents(): Promise<Event[]> {
  return (await sanityFetch<Event[] | null>(queries.eventsQuery)) ?? []
}

export async function getUniversities(): Promise<University[]> {
  return (await sanityFetch<University[] | null>(queries.universitiesQuery)) ?? []
}

export async function getFaqs(): Promise<Faq[]> {
  return (await sanityFetch<Faq[] | null>(queries.faqsQuery)) ?? []
}

export async function getResources(): Promise<Resource[]> {
  return (await sanityFetch<Resource[] | null>(queries.resourcesQuery)) ?? []
}

export async function getSteps(): Promise<Step[]> {
  return (await sanityFetch<Step[] | null>(queries.stepsQuery)) ?? []
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return (await sanityFetch<CaseStudy[] | null>(queries.caseStudiesQuery)) ?? []
}

export async function getAcceptances(): Promise<Acceptance[]> {
  return (await sanityFetch<Acceptance[] | null>(queries.acceptancesQuery)) ?? []
}

export async function getPageContent(slug: string): Promise<PageContent | null> {
  return sanityFetch<PageContent | null>(queries.pageContentBySlugQuery, { slug })
}

export async function getProgramme(slug: string): Promise<Programme | null> {
  return sanityFetch<Programme | null>(queries.programmeBySlugQuery, { slug })
}

export async function getStoriesByCountry(slug: string): Promise<SuccessStory[]> {
  return (await sanityFetch<SuccessStory[] | null>(queries.storiesByCountryQuery, { slug })) ?? []
}

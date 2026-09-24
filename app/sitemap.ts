import type { MetadataRoute } from 'next'
import { getBlogs, getCountries } from '@/lib/data'

const siteUrl = 'https://educoach.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, countries] = await Promise.all([getBlogs(), getCountries()])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/how-we-work`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/team`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/success-stories`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/events`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/countries`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/blogs`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/universities`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/resources`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/book-assessment`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/methodology`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/services/undergraduate`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/postgraduate`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/programmes/jumpstart`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/programmes/sprint`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/programmes/career-pivot`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/case-studies`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/acceptances`, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const countryRoutes: MetadataRoute.Sitemap = countries.map((c) => ({
    url: `${siteUrl}/countries/${c.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${siteUrl}/blogs/${b.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...countryRoutes, ...blogRoutes]
}

import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { TrustBar } from '@/components/home/trust-bar'
import { WhyEduCoach } from '@/components/home/why-educoach'
import { HowWeWork } from '@/components/home/how-we-work'
import { SuccessStories } from '@/components/home/success-stories'
import { Destinations } from '@/components/home/destinations'
import { ServicesSection } from '@/components/home/services-section'
import { Experts } from '@/components/home/experts'
import { EventsSection } from '@/components/home/events-section'
import { BlogsSection } from '@/components/home/blogs-section'
import { FaqSection } from '@/components/home/faq-section'
import {
  getSiteSettings,
  getCountries,
  getSteps,
  getSuccessStories,
  getServices,
  getTeamMembers,
  getEvents,
  getBlogs,
  getFaqs,
} from '@/lib/data'
import { whyCards } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'EduCoach Services — Study Abroad & Career Counselling',
  description:
    "India's leading study abroad consultancy helping students gain admission into the world's top universities with personalised guidance, test prep and visa support.",
}

export default async function HomePage() {
  const [settings, countries, steps, stories, services, experts, events, blogs, faqs] =
    await Promise.all([
      getSiteSettings(),
      getCountries(),
      getSteps(),
      getSuccessStories(),
      getServices(),
      getTeamMembers(),
      getEvents(),
      getBlogs(),
      getFaqs(),
    ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'EduCoach Services',
    url: 'https://educoach.in',
    description:
      'India\'s leading study abroad and career counselling consultancy helping students gain admission into the world\'s leading universities.',
    areaServed: ['UK', 'USA', 'Canada', 'Australia', 'Singapore', 'Europe', 'UAE', 'India'],
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Hero countries={countries} />
      <TrustBar stats={settings.stats} />
      <WhyEduCoach whyCards={whyCards} />
      <HowWeWork steps={steps} />
      <SuccessStories stories={stories} />
      <Destinations countries={countries} />
      <ServicesSection services={services} />
      <Experts experts={experts} />
      <EventsSection events={events} />
      <BlogsSection blogs={blogs} />
      <FaqSection faqs={faqs} />
    </>
  )
}

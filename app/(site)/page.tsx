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
import { FounderSpotlight } from '@/components/home/founder-spotlight'
import { InstagramFeed } from '@/components/instagram-feed'
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
import { section } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: settings.seoTitle ?? 'EduCoach Services — Study Abroad & Career Counselling',
    description: settings.seoDescription ?? "India's leading study abroad consultancy helping students gain admission into the world's top universities with personalised guidance, test prep and visa support.",
  }
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

  const s = (key: string) => section(settings.homeSections, key)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: settings.companyName ?? 'EduCoach Services',
    url: 'https://educoach.in',
    description: settings.seoDescription ?? "India's leading study abroad and career counselling consultancy helping students gain admission into the world's leading universities.",
    areaServed: countries.map((c) => c.name),
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
      <Hero
        countries={countries}
        stats={settings.stats}
        badge={settings.heroBadge}
        headingLines={settings.heroHeadingLines}
        subtitle={settings.heroSubtitle}
      />
      <TrustBar
        stats={settings.stats}
        universities={settings.trustedUniversities}
        label={settings.trustBarLabel}
      />
      <WhyEduCoach
        whyCards={settings.whyCards ?? []}
        eyebrow={s('why-educoach').eyebrow}
        title={s('why-educoach').title}
        description={s('why-educoach').description}
      />
      <FounderSpotlight founder={settings.founder} />
      <HowWeWork
        steps={steps}
        eyebrow={s('how-we-work').eyebrow}
        title={s('how-we-work').title}
        description={s('how-we-work').description}
      />
      <SuccessStories
        stories={stories}
        title={s('success-stories').title}
        description={s('success-stories').description}
      />
      <Destinations
        countries={countries}
        title={s('destinations').title}
        description={s('destinations').description}
      />
      <ServicesSection
        services={services}
        title={s('services').title}
        description={s('services').description}
      />
      <Experts
        experts={experts}
        title={s('experts').title}
        description={s('experts').description}
      />
      <EventsSection
        events={events}
        sectionTitle={s('events').title}
        sectionDescription={s('events').description}
      />
      <BlogsSection
        blogs={blogs}
        sectionTitle={s('blogs').title}
        sectionDescription={s('blogs').description}
      />
      <FaqSection faqs={faqs} title={s('faq').title} />
      <InstagramFeed handle={settings.instagramHandle} />
    </>
  )
}

import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { CTABand } from '@/components/cta-band'
import { UniversitiesGrid } from '@/components/universities-grid'
import { getUniversities, getPageContent } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('universities')
  return {
    title: page?.metaTitle ?? 'Partner Universities',
    description: page?.metaDescription ?? 'Explore EduCoach\'s network of 150+ partner universities across 30+ countries — from Ivy League to Russell Group and beyond.',
  }
}

export default async function UniversitiesPage() {
  const [universities, page] = await Promise.all([
    getUniversities(),
    getPageContent('universities'),
  ])

  return (
    <>
      <PageHero
        eyebrow={page?.heroEyebrow ?? 'Partner Universities'}
        title={page?.heroTitle ?? 'World-class universities, one trusted guide'}
        description={page?.heroDescription ?? 'We work with 150+ universities across 30+ countries. Here are some of our key partners.'}
        crumbs={[{ label: 'Universities' }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <UniversitiesGrid universities={universities} />
        </div>
      </section>

      <CTABand
        title={page?.ctaTitle ?? 'Looking for a specific university?'}
        subtitle={page?.ctaSubtitle ?? 'Our counsellors have relationships with 150+ universities worldwide. Book a session to get matched.'}
      />
    </>
  )
}

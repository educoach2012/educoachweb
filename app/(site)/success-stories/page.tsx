import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { CTABand } from '@/components/cta-band'
import { StoriesGrid } from '@/components/stories-grid'
import { getSuccessStories, getPageContent } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('success-stories')
  return {
    title: page?.metaTitle ?? 'Success Stories',
    description: page?.metaDescription ?? 'Read real stories from EduCoach students who secured admission and scholarships at the world\'s top universities.',
  }
}

export default async function SuccessStoriesPage() {
  const [stories, page] = await Promise.all([
    getSuccessStories(),
    getPageContent('success-stories'),
  ])

  return (
    <>
      <PageHero
        eyebrow={page?.heroEyebrow ?? 'Success Stories'}
        title={page?.heroTitle ?? 'Real students. Life-changing offers.'}
        description={page?.heroDescription ?? 'Behind every offer is a story of the right guidance at the right time.'}
        crumbs={[{ label: 'Success Stories' }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <StoriesGrid stories={stories} />
        </div>
      </section>

      <CTABand
        title={page?.ctaTitle ?? 'Your story could be next'}
        subtitle={page?.ctaSubtitle ?? 'Book a free assessment and start your journey to a world-class university.'}
      />
    </>
  )
}

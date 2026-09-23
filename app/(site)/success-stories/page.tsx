import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { CTABand } from '@/components/cta-band'
import { StoriesGrid } from '@/components/stories-grid'
import { getSuccessStories } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Success Stories',
  description:
    'Read real stories from EduCoach students who secured admission and scholarships at the world\'s top universities.',
}

export default async function SuccessStoriesPage() {
  const stories = await getSuccessStories()

  return (
    <>
      <PageHero
        eyebrow="Success Stories"
        title="Real students. Life-changing offers."
        description="Behind every offer is a story of the right guidance at the right time."
        crumbs={[{ label: 'Success Stories' }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <StoriesGrid stories={stories} />
        </div>
      </section>

      <CTABand
        title="Your story could be next"
        subtitle="Book a free assessment and start your journey to a world-class university."
      />
    </>
  )
}

import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { CTABand } from '@/components/cta-band'
import { BlogsGrid } from '@/components/blogs-grid'
import { getBlogs } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Expert advice on study-abroad admissions, scholarships, test preparation and country-specific strategies from EduCoach Services.',
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights for the study-abroad journey"
        description="Expert advice on admissions, scholarships, test prep and country-specific strategies."
        crumbs={[{ label: 'Blog' }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <BlogsGrid blogs={blogs} />
        </div>
      </section>

      <CTABand />
    </>
  )
}

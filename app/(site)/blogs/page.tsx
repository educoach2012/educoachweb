import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { CTABand } from '@/components/cta-band'
import { BlogsGrid } from '@/components/blogs-grid'
import { getBlogs, getPageContent } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('blogs')
  return {
    title: page?.metaTitle ?? 'Blog',
    description: page?.metaDescription ?? 'Expert advice on study-abroad admissions, scholarships, test preparation and country-specific strategies from EduCoach Services.',
  }
}

export default async function BlogsPage() {
  const [blogs, page] = await Promise.all([
    getBlogs(),
    getPageContent('blogs'),
  ])

  return (
    <>
      <PageHero
        eyebrow={page?.heroEyebrow ?? 'Blog'}
        title={page?.heroTitle ?? 'Insights for the study-abroad journey'}
        description={page?.heroDescription ?? 'Expert advice on admissions, scholarships, test prep and country-specific strategies.'}
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

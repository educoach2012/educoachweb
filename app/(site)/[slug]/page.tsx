import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { CTABand } from '@/components/cta-band'
import { DynamicLayout } from '@/components/dynamic-layout'
import { getPageContent, getItemsByContentType, getDynamicItemsByPage, getAllPageContentSlugs } from '@/lib/data'

const EXISTING_ROUTES = new Set([
  'about', 'acceptances', 'blogs', 'book-assessment', 'case-studies',
  'contact', 'countries', 'events', 'how-we-work', 'methodology',
  'programmes', 'resources', 'services', 'success-stories', 'team', 'universities',
])

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllPageContentSlugs()
  return slugs
    .filter((s) => !EXISTING_ROUTES.has(s))
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageContent(slug)
  if (!page) return {}
  return {
    title: page.metaTitle ?? page.heroTitle ?? slug,
    description: page.metaDescription ?? page.heroDescription,
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const page = await getPageContent(slug)
  if (!page || !page.layout) return notFound()

  let items: unknown[] = []
  if (page.layout !== 'content') {
    if (page.contentSource === 'existing' && page.contentType) {
      items = await getItemsByContentType(page.contentType)
    } else if (page._id) {
      items = await getDynamicItemsByPage(page._id)
    }
  }

  return (
    <>
      <PageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle ?? ''}
        description={page.heroDescription}
        richDescription={page.heroRichDescription}
        crumbs={[{ label: 'Home', href: '/' }, { label: page.heroTitle ?? slug }]}
      />

      <DynamicLayout layout={page.layout} items={items} page={page} />

      {page.ctaVisible !== false && (
        <CTABand
          title={page.ctaTitle}
          subtitle={page.ctaSubtitle}
        />
      )}
    </>
  )
}

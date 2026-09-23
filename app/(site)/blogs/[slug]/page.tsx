import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { CtaButton } from '@/components/cta-button'
import { CTABand } from '@/components/cta-band'
import { getBlogs, getBlogBySlug } from '@/lib/data'

export async function generateStaticParams() {
  const blogs = await getBlogs()
  return blogs.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return {}
  return {
    title: blog.title,
    description: `${blog.title} — expert advice from EduCoach Services on ${blog.category.toLowerCase()}.`,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    author: { '@type': 'Person', name: post.author?.name ?? 'EduCoach Services' },
    publisher: { '@type': 'Organization', name: 'EduCoach Services', url: 'https://educoach.in' },
    ...(post.publishedDate ? { datePublished: post.publishedDate } : {}),
    mainEntityOfPage: `https://educoach.in/blogs/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        crumbs={[
          { label: 'Blog', href: '/blogs' },
          { label: post.title },
        ]}
      />

      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          {/* Meta */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 border-b border-border pb-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" /> {post.author?.name ?? 'EduCoach'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {post.publishedDate ? formatDate(post.publishedDate) : 'Recently'}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readingTime} min read
              </span>
            </div>
          </Reveal>

          {/* Body */}
          <div className="mt-10 space-y-6">
            {post.body.map((block: any, i: number) => (
              <Reveal key={i} delay={i * 0.04}>
                <p className="text-base leading-relaxed text-muted-foreground">{block.children?.map((c: any) => c.text).join('')}</p>
              </Reveal>
            ))}
          </div>

          {/* Author card */}
          <Reveal delay={0.2}>
            <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Written by</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{post.author?.name ?? 'EduCoach'}</p>
              <p className="mt-1 text-sm text-muted-foreground">{post.author?.role ?? 'EduCoach Services'}</p>
            </div>
          </Reveal>

          {/* Navigation */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <CtaButton href="/book-assessment" variant="gold">
              Book Free Assessment
            </CtaButton>
          </div>
        </div>
      </article>

      <CTABand />
    </>
  )
}

import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { RevealStagger, RevealItem } from '@/components/reveal'

interface BlogsSectionProps {
  blogs: { slug: string; category: string; readingTime: number; title: string }[]
}

export function BlogsSection({ blogs }: BlogsSectionProps) {
  return (
    <section className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="From the blog"
            title="Insights to guide every decision"
            description="Practical, up-to-date advice on admissions, scholarships, tests and more."
          />
          <Link
            href="/blogs"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            View all articles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <RevealStagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => (
            <RevealItem key={b.slug}>
              <Link
                href={`/blogs/${b.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-foreground">
                    {b.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {b.readingTime} min
                  </span>
                </div>
                <h3 className="mt-4 flex-1 text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                  {b.title}
                </h3>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}

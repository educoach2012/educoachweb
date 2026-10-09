'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { RevealStagger, RevealItem } from '@/components/reveal'
type Blog = { title: string; slug: string; category: string; readingTime: number }

export function BlogsGrid({ blogs }: { blogs: Blog[] }) {
  const [filter, setFilter] = useState<string | null>(null)

  const allCategories = Array.from(new Set(blogs.map((b) => b.category)))
  const filtered = filter ? blogs.filter((b) => b.category === filter) : blogs

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filter === null
              ? 'bg-primary text-primary-foreground'
              : 'border border-border bg-card text-foreground hover:bg-secondary'
          }`}
        >
          All
        </button>
        {allCategories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === c
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-card text-foreground hover:bg-secondary'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">No articles found for this category.</p>
      )}
      <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" key={filter ?? 'all'}>
        {filtered.map((b) => (
          <RevealItem key={b.slug}>
            <Link
              href={`/blogs/${b.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {b.category}
              </span>
              <h3 className="mt-4 flex-1 text-lg font-semibold leading-snug text-foreground">
                {b.title}
              </h3>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {b.readingTime} min
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealStagger>
    </>
  )
}

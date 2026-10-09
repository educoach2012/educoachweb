'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1={17.5} x2={17.51} y1={6.5} y2={6.5} />
    </svg>
  )
}

type InstaPost = {
  id: string
  media_url: string
  permalink: string
  caption?: string
  media_type: string
  thumbnail_url?: string
}

interface InstagramFeedProps {
  handle?: string
  count?: number
}

export function InstagramFeed({ handle, count = 6 }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstaPost[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`/api/instagram?count=${count}`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed')
        return r.json()
      })
      .then((data) => setPosts(data.posts ?? []))
      .catch(() => setError(true))
  }, [count])

  if (error || (!posts.length && !handle)) return null

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <InstagramIcon className="h-6 w-6 text-primary" />
            <h2 className="font-heading text-2xl font-bold text-foreground">Follow us on Instagram</h2>
          </div>
          {handle && (
            <a
              href={`https://instagram.com/${handle}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-primary hover:underline"
            >
              @{handle}
            </a>
          )}
        </div>

        {posts.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-card"
              >
                <Image
                  src={post.media_type === 'VIDEO' ? (post.thumbnail_url ?? post.media_url) : post.media_url}
                  alt={post.caption?.slice(0, 100) ?? 'Instagram post'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/20" />
                {post.media_type === 'VIDEO' && (
                  <div className="absolute right-2 top-2 rounded-full bg-card/80 px-2 py-0.5 text-xs font-medium">
                    Reel
                  </div>
                )}
              </a>
            ))}
          </div>
        ) : handle ? (
          <div className="mt-8 text-center">
            <a
              href={`https://instagram.com/${handle}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <InstagramIcon className="h-5 w-5" />
              Visit @{handle} on Instagram
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}

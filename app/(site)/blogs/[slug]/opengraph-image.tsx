import { ImageResponse } from 'next/og'
import { getBlogBySlug } from '@/lib/data'

export const alt = 'EduCoach Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)

  const title = post?.title ?? 'Blog Post'
  const category = post?.category ?? 'Article'
  const author = post?.author?.name ?? 'EduCoach Services'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #1a1f4e 0%, #2d1b69 50%, #1a1f4e 100%)',
          padding: '60px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #d4a843, #c49a38)',
                borderRadius: '999px',
                padding: '8px 20px',
                fontSize: '18px',
                fontWeight: 700,
                color: '#1a1f4e',
              }}
            >
              {category}
            </div>
          </div>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              maxWidth: '1000px',
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '24px',
                background: '#374491',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              {author.split(' ').map((n) => n[0]).join('')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff' }}>{author}</span>
              <span style={{ fontSize: '16px', color: '#a0aec0' }}>EduCoach Services</span>
            </div>
          </div>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#d4a843' }}>
            educoach.in
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}

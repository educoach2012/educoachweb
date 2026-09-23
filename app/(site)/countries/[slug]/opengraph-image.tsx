import { ImageResponse } from 'next/og'
import { getCountryBySlug } from '@/lib/data'

export const alt = 'EduCoach — Study Destination'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const country = await getCountryBySlug(slug)

  const name = country?.name ?? 'Study Destination'
  const flag = country?.flag ?? ''
  const tagline = country?.tagline ?? 'Explore study abroad opportunities'
  const uniCount = country?.universityCount ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1a1f4e 0%, #2d1b69 50%, #1a1f4e 100%)',
          padding: '60px',
        }}
      >
        <span style={{ fontSize: '96px', marginBottom: '20px' }}>{flag}</span>
        <div
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#d4a843',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            marginBottom: '16px',
          }}
        >
          Study in
        </div>
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#a0aec0',
            marginTop: '16px',
            textAlign: 'center',
            maxWidth: '700px',
          }}
        >
          {tagline}
        </div>
        {uniCount && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '32px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '999px',
              padding: '10px 24px',
            }}
          >
            <span style={{ fontSize: '22px', fontWeight: 700, color: '#d4a843' }}>{uniCount}</span>
            <span style={{ fontSize: '18px', color: '#a0aec0' }}>partner universities</span>
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #d4a843, #c49a38)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 700,
              color: '#1a1f4e',
            }}
          >
            E
          </div>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#d4a843' }}>educoach.in</span>
        </div>
      </div>
    ),
    { ...size }
  )
}

import { ImageResponse } from 'next/og'

export const alt = 'EduCoach Services — Study Abroad & Career Counselling'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #d4a843, #c49a38)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 700,
              color: '#1a1f4e',
            }}
          >
            E
          </div>
          <span style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff' }}>
            EduCoach Services
          </span>
        </div>
        <div
          style={{
            fontSize: '52px',
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '900px',
          }}
        >
          Study Abroad & Career Counselling
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#a0aec0',
            marginTop: '20px',
            textAlign: 'center',
            maxWidth: '700px',
          }}
        >
          Find the right university. Build the right profile. Create the right future.
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '40px',
          }}
        >
          {['🇬🇧', '🇺🇸', '🇨🇦', '🇦🇺', '🇸🇬', '🇪🇺', '🇦🇪', '🇮🇳'].map((flag) => (
            <span key={flag} style={{ fontSize: '32px' }}>{flag}</span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}

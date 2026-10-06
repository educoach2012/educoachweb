import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Sora } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const siteUrl = 'https://educoach.in'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'EduCoach Services — Study Abroad & Career Counselling',
    template: '%s | EduCoach Services',
  },
  description:
    'India\'s leading study abroad and career counselling consultancy. We help students discover the right career, build outstanding profiles, and gain admission into the world\'s leading universities.',
  keywords: [
    'study abroad',
    'career counselling',
    'university admissions',
    'UK USA Canada Australia',
    'profile building',
    'scholarship guidance',
    'IELTS SAT',
    'EduCoach Services',
  ],
  authors: [{ name: 'EduCoach Services' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'EduCoach Services',
    title: 'EduCoach Services — Study Abroad & Career Counselling',
    description:
      'Find the right university, build the right profile, create the right future. Book your assessment with India\'s leading counselling platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduCoach Services — Study Abroad & Career Counselling',
    description:
      'Find the right university, build the right profile, create the right future.',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e3a8a' },
    { media: '(prefers-color-scheme: dark)', color: '#141f3d' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${sora.variable} bg-background`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

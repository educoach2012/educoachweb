import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/logo'
import { CtaButton } from '@/components/cta-button'
import { NewsletterForm } from '@/components/newsletter-form'
import type { FooterColumn } from '@/lib/types'

type SiteFooterProps = {
  contact: {
    phone: string
    phoneHref: string
    email: string
    address: string
  }
  whatsappHref: string
  countries: { slug: string; name: string; flag: string }[]
  logoUrl?: string
  footerNav?: FooterColumn[]
}

const defaultColumns = [
  {
    heading: 'Company',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Our Methodology', href: '/methodology' },
      { title: 'How We Work', href: '/how-we-work' },
      { title: 'Our Team', href: '/team' },
      { title: 'Success Stories', href: '/success-stories' },
      { title: 'Case Studies', href: '/case-studies' },
      { title: 'Events', href: '/events' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { title: 'UG Admissions', href: '/services/undergraduate' },
      { title: 'PG Admissions', href: '/services/postgraduate' },
      { title: 'Career Counselling', href: '/services#career' },
      { title: 'Profile Building', href: '/services#profile' },
      { title: 'Test Preparation', href: '/services#test' },
      { title: 'Scholarships', href: '/services#scholarship' },
      { title: 'Visa Assistance', href: '/services#visa' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { title: 'Blog', href: '/blogs' },
      { title: 'Universities', href: '/universities' },
      { title: 'Acceptances', href: '/acceptances' },
      { title: 'Free Guides', href: '/resources' },
      { title: 'FAQs', href: '/#faq' },
    ],
  },
]

export function SiteFooter({ contact, whatsappHref, countries, logoUrl, footerNav }: SiteFooterProps) {
  const columns = footerNav && footerNav.length > 0 ? footerNav : defaultColumns
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      {/* Final CTA band */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative -mt-12 overflow-hidden rounded-[2rem] bg-primary p-5 text-primary-foreground shadow-2xl shadow-primary/20 sm:p-8 md:p-12">
          <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="max-w-xl text-balance text-2xl font-bold sm:text-3xl md:text-4xl">
                Ready to begin? Book your assessment today.
              </h2>
              <p className="mt-3 max-w-lg text-primary-foreground/80">
                One free session to map your right-fit universities, profile plan and next steps.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <CtaButton href="/book-assessment" variant="gold" size="lg">
                Book Assessment
              </CtaButton>
              <CtaButton
                href={whatsappHref}
                variant="outline"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                Chat on WhatsApp
              </CtaButton>
            </div>
          </div>
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo imageUrl={logoUrl} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Helping students discover the right career, build outstanding profiles, and gain
              admission into the world&apos;s leading universities.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a href={contact.phoneHref} className="flex items-center gap-2.5 text-foreground hover:text-primary">
                <Phone className="h-4 w-4 text-primary" /> {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 text-foreground hover:text-primary">
                <Mail className="h-4 w-4 text-primary" /> {contact.email}
              </a>
              <p className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {contact.address}
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-foreground">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-10 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Study destinations</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {countries.map((c) => (
                <Link
                  key={c.slug}
                  href={`/countries/${c.slug}`}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {c.flag} {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Get the free study-abroad guide</h3>
            <p className="mt-1 text-sm text-muted-foreground">Monthly tips on admissions, scholarships and deadlines.</p>
            <NewsletterForm className="mt-4" />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} EduCoach Services. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/contact" className="hover:text-primary">Contact</Link>
            <Link href="/about" className="hover:text-primary">Privacy</Link>
            <Link href="/about" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

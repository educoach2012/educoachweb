import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GraduationCap, Calendar, DollarSign, FileText } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, RevealStagger, RevealItem } from '@/components/reveal'
import { CtaButton } from '@/components/cta-button'
import { CTABand } from '@/components/cta-band'
import { getCountries, getCountryBySlug, getStoriesByCountry } from '@/lib/data'
import { Check } from 'lucide-react'

export async function generateStaticParams() {
  const countries = await getCountries()
  return countries.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const country = await getCountryBySlug(slug)
  if (!country) return {}
  return {
    title: country.seoTitle ?? `Study in ${country.name}`,
    description: country.seoDescription ?? `Explore studying in ${country.name} with EduCoach — ${country.tagline}. Top universities, scholarships, visa guidance and more.`,
  }
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const country = await getCountryBySlug(slug)
  if (!country) notFound()

  const relatedStories = await getStoriesByCountry(slug)

  return (
    <>
      <PageHero
        eyebrow={`Study in ${country.name}`}
        title={`${country.flag} ${country.name}`}
        description={country.tagline}
        crumbs={[
          { label: 'Countries', href: '/countries' },
          { label: country.name },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            {/* Main content */}
            <div>
              <Reveal>
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Overview</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{country.overview}</p>
              </Reveal>

              {/* Why study here */}
              <Reveal delay={0.1}>
                <h3 className="mt-12 font-heading text-xl font-bold text-foreground">Why study in {country.name}?</h3>
                <ul className="mt-4 space-y-3">
                  {country.whyStudyHere?.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Top universities */}
              <Reveal delay={0.15}>
                <h3 className="mt-12 font-heading text-xl font-bold text-foreground">Top universities</h3>
                <div className="mt-4 overflow-hidden rounded-2xl border border-border">
                  <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/60">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">University</th>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">Ranking</th>
                        <th className="hidden px-4 py-3 text-left font-semibold text-foreground sm:table-cell">City</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {country.topUniversities?.map((u) => (
                        <tr key={u.name} className="hover:bg-secondary/30">
                          <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{u.ranking}</td>
                          <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{u.city}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              </Reveal>

              {/* Visa info */}
              <Reveal delay={0.2}>
                <h3 className="mt-12 font-heading text-xl font-bold text-foreground">Visa information</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{country.visaInfo}</p>
              </Reveal>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-28">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-5 w-5 text-gold" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Intakes</p>
                        <p className="mt-1 text-sm font-medium text-foreground">{country.intakes}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="mt-0.5 h-5 w-5 text-gold" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Average Cost</p>
                        <p className="mt-1 text-sm font-medium text-foreground">{country.averageCost}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <GraduationCap className="mt-0.5 h-5 w-5 text-gold" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Universities</p>
                        <p className="mt-1 text-sm font-medium text-foreground">{country.universityCount} partner universities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-5 w-5 text-gold" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Visa</p>
                        <p className="mt-1 text-sm font-medium text-foreground">Full visa support included</p>
                      </div>
                    </div>
                  </div>
                  <CtaButton href="/book-assessment" variant="gold" className="mt-6 w-full">
                    Book Free Assessment
                  </CtaButton>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* Related success stories */}
      {relatedStories.length > 0 && (
        <section className="border-t border-border bg-secondary/40 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading
              eyebrow="Success Stories"
              title={`Students who made it to ${country.name}`}
            />
            <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedStories.map((s) => (
                <RevealItem key={s.name}>
                  <div className="rounded-3xl border border-border bg-card p-6">
                    <p className="text-base leading-relaxed text-foreground">&ldquo;{s.quote}&rdquo;</p>
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="font-semibold text-foreground">{s.name}</p>
                      <p className="text-sm text-muted-foreground">{s.university} · {s.course}</p>
                      <div className="mt-2 inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-foreground">
                        {s.scholarship} scholarship
                      </div>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}

      <CTABand
        title={`Ready to study in ${country.name}?`}
        subtitle="Book a free assessment and get a personalised roadmap from a senior counsellor."
      />
    </>
  )
}

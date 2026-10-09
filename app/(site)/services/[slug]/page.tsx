import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { RichText } from '@/components/rich-text'
import { Reveal } from '@/components/reveal'
import { CtaButton } from '@/components/cta-button'
import { CTABand } from '@/components/cta-band'
import { Icon } from '@/components/icon'
import { getServices, getServiceBySlug } from '@/lib/data'
import { urlFor } from '@/sanity/lib/image'

export async function generateStaticParams() {
  const services = await getServices()
  return services.filter((s) => s.slug).map((s) => ({ slug: s.slug! }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.metaTitle ?? service.title,
    description: service.metaDescription ?? service.shortDesc,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.title}
        description={service.shortDesc}
        crumbs={[
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            {/* Main content */}
            <div>
              {/* Hero image */}
              {service.heroImage?.asset?._ref && (
                <Reveal>
                  <div className="mb-10 overflow-hidden rounded-2xl">
                    <Image
                      src={urlFor(service.heroImage).width(900).height(500).url()}
                      alt={service.title}
                      width={900}
                      height={500}
                      className="w-full object-cover"
                    />
                  </div>
                </Reveal>
              )}

              {/* Description */}
              <Reveal>
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">About this service</h2>
                <div className="mt-4">
                  {service.richLongDesc && service.richLongDesc.length > 0 ? (
                    <RichText value={service.richLongDesc} />
                  ) : service.longDesc ? (
                    <p className="leading-relaxed text-muted-foreground">{service.longDesc}</p>
                  ) : null}
                </div>
              </Reveal>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <Reveal delay={0.1}>
                  <h3 className="mt-12 font-heading text-xl font-bold text-foreground">What's included</h3>
                  <ul className="mt-4 space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3.5 w-3.5 text-primary" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {/* Page body (rich text) */}
              {service.pageBody && service.pageBody.length > 0 && (
                <Reveal delay={0.15}>
                  <div className="mt-12">
                    <RichText value={service.pageBody} />
                  </div>
                </Reveal>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-28">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-border bg-card p-5">
                  {service.icon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold-foreground">
                      <Icon name={service.icon} className="h-6 w-6" />
                    </div>
                  )}
                  <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.shortDesc}</p>

                  {service.highlights && service.highlights.length > 0 && (
                    <div className="mt-5 space-y-3 border-t border-border pt-5">
                      {service.highlights.map((h) => (
                        <div key={h.label}>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h.label}</p>
                          <p className="mt-0.5 text-sm font-medium text-foreground">{h.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <CtaButton href="/book-assessment" variant="gold" className="mt-6 w-full">
                    Book Free Assessment
                  </CtaButton>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <CTABand
        title={service.ctaTitle ?? `Ready for ${service.title.toLowerCase()}?`}
        subtitle={service.ctaSubtitle ?? 'Book a free assessment and get a personalised roadmap from a senior counsellor.'}
      />
    </>
  )
}

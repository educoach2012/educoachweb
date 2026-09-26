import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"
import { Reveal } from "@/components/reveal"
import { Icon } from "@/components/icon"
import { getSiteSettings, getPageContent } from "@/lib/data"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('contact')
  return {
    title: page?.metaTitle ?? 'Contact Us',
    description: page?.metaDescription ?? 'Get in touch with EduCoach Services. Call, WhatsApp, email or visit our office — our counsellors are ready to guide your study abroad journey.',
  }
}

export default async function ContactPage() {
  const [settings, page] = await Promise.all([
    getSiteSettings(),
    getPageContent('contact'),
  ])

  const whatsappHref = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.whatsappMessage)}`

  const channels = [
    { icon: "phone", label: "Call us", value: settings.phone, href: settings.phoneHref },
    { icon: "message", label: "WhatsApp", value: "Chat with a counsellor", href: whatsappHref },
    { icon: "mail", label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { icon: "mapPin", label: "Visit us", value: settings.address, href: undefined },
  ]

  return (
    <>
      <PageHero
        eyebrow={page?.heroEyebrow ?? 'Contact'}
        title={page?.heroTitle ?? "We'd love to hear from you"}
        description={page?.heroDescription ?? 'Have a question about studying abroad? Reach out through any channel — we typically reply within one business day.'}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Talk to a counsellor</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Whether you&apos;re just exploring or ready to apply, our team is here to help you plan your next step
                abroad.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {channels.map((channel, i) => {
                const inner = (
                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-md">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-primary">
                      <Icon name={channel.icon} className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{channel.label}</p>
                      <p className="font-heading font-semibold text-foreground text-pretty">{channel.value}</p>
                    </div>
                  </div>
                )
                return (
                  <li key={channel.label}>
                    <Reveal delay={i * 0.06}>
                      {channel.href ? (
                        <a href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </Reveal>
                  </li>
                )
              })}
            </ul>
            <Reveal delay={0.2}>
              <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="EduCoach Services office location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=77.58%2C12.96%2C77.62%2C12.99&layer=mapnik&marker=12.975%2C77.60"
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}

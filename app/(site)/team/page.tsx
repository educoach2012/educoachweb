import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { CTABand } from '@/components/cta-band'
import { TeamGrid } from '@/components/team-modal'
import { getTeamMembers, getPageContent } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('team')
  return {
    title: page?.metaTitle ?? 'Our Team',
    description:
      page?.metaDescription ??
      "Meet the EduCoach team — experienced counsellors, essay strategists and visa experts who've guided thousands of students to the world's best universities.",
  }
}

export default async function TeamPage() {
  const [experts, page] = await Promise.all([
    getTeamMembers(),
    getPageContent('team'),
  ])

  return (
    <>
      <PageHero
        eyebrow={page?.heroEyebrow ?? 'Our Team'}
        title={page?.heroTitle ?? "Counsellors who've done this thousands of times"}
        description={
          page?.heroDescription ??
          'Seasoned mentors with deep, country-specific expertise and a genuine care for outcomes.'
        }
        richDescription={page?.heroRichDescription}
        crumbs={[{ label: 'Team' }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Meet the experts"
            title="Your journey is led by people who care"
            description="Every counsellor at EduCoach has lived the international education experience. They don't just advise — they empathise, strategise and advocate."
          />

          <TeamGrid members={experts} />
        </div>
      </section>

      {page?.ctaVisible !== false && (
        <CTABand
          title={page?.ctaTitle}
          subtitle={page?.ctaSubtitle}
        />
      )}
    </>
  )
}

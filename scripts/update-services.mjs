import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const slugMap = {
  career: 'career-counselling',
  profile: 'profile-building',
  ug: 'ug-admissions',
  pg: 'pg-admissions',
  boarding: 'boarding-schools',
  test: 'test-preparation',
  scholarship: 'scholarship-guidance',
  visa: 'visa-assistance',
}

const pageContent = {
  career: {
    highlights: [
      { _key: 'h1', label: 'Duration', value: '4–6 sessions over 2 months' },
      { _key: 'h2', label: 'Ideal for', value: 'Classes 8–12, gap-year students' },
      { _key: 'h3', label: 'Includes', value: 'Psychometric report + roadmap' },
    ],
    ctaTitle: 'Not sure which career path is right?',
    ctaSubtitle: 'Book a free assessment — our counsellors will map your strengths to real opportunities.',
  },
  profile: {
    highlights: [
      { _key: 'h1', label: 'Duration', value: '6–18 months (ongoing)' },
      { _key: 'h2', label: 'Ideal for', value: 'Classes 8–11, early planners' },
      { _key: 'h3', label: 'Includes', value: 'Personalised activity roadmap' },
    ],
    ctaTitle: 'Want a profile that stands out?',
    ctaSubtitle: 'Start early — the best profiles are built over semesters, not weeks.',
  },
  ug: {
    highlights: [
      { _key: 'h1', label: 'Countries', value: 'USA, UK, Canada, Australia + 25 more' },
      { _key: 'h2', label: 'Ideal for', value: 'Class 12 students, gap-year applicants' },
      { _key: 'h3', label: 'Includes', value: 'Full application management' },
    ],
    ctaTitle: 'Applying to universities this year?',
    ctaSubtitle: 'Get expert guidance on shortlisting, essays and applications.',
  },
  pg: {
    highlights: [
      { _key: 'h1', label: 'Programmes', value: 'Masters, MBA, PhD, MiM' },
      { _key: 'h2', label: 'Ideal for', value: 'Final-year undergrads, working professionals' },
      { _key: 'h3', label: 'Includes', value: 'SOP, LOR, interview prep' },
    ],
    ctaTitle: 'Ready for your postgraduate journey?',
    ctaSubtitle: 'Our team has helped secure admits at Oxford, MIT, INSEAD, NUS and more.',
  },
  boarding: {
    highlights: [
      { _key: 'h1', label: 'Countries', value: 'UK, Switzerland, USA, Singapore' },
      { _key: 'h2', label: 'Ideal for', value: 'Ages 11–16' },
      { _key: 'h3', label: 'Includes', value: 'School visits + parent briefing' },
    ],
    ctaTitle: 'Looking for the right boarding school?',
    ctaSubtitle: 'We help families find schools that match academic goals, values and budget.',
  },
  test: {
    highlights: [
      { _key: 'h1', label: 'Tests covered', value: 'SAT, IELTS, TOEFL, GRE, GMAT' },
      { _key: 'h2', label: 'Format', value: 'Online + in-person batches' },
      { _key: 'h3', label: 'Includes', value: 'Mock tests + score analytics' },
    ],
    ctaTitle: 'Need to improve your test scores?',
    ctaSubtitle: 'Structured prep with weekly mocks and one-on-one doubt sessions.',
  },
  scholarship: {
    highlights: [
      { _key: 'h1', label: 'Database', value: '500+ scholarships tracked' },
      { _key: 'h2', label: 'Ideal for', value: 'All applicants — UG and PG' },
      { _key: 'h3', label: 'Includes', value: 'Essay review + financial planning' },
    ],
    ctaTitle: 'Want to study abroad on a scholarship?',
    ctaSubtitle: 'We have helped students win scholarships worth crores — let us help you too.',
  },
  visa: {
    highlights: [
      { _key: 'h1', label: 'Success rate', value: '99%+ visa approval' },
      { _key: 'h2', label: 'Countries', value: 'All major study destinations' },
      { _key: 'h3', label: 'Includes', value: 'Mock interview + filing' },
    ],
    ctaTitle: 'Need visa support?',
    ctaSubtitle: 'Our team handles everything — from documentation to mock interviews to filing.',
  },
}

async function run() {
  const services = await client.fetch('*[_type == "service"] { _id, serviceId }')

  for (const svc of services) {
    const slug = slugMap[svc.serviceId]
    const content = pageContent[svc.serviceId]
    if (!slug || !content) {
      console.log(`Skipping ${svc.serviceId}`)
      continue
    }

    await client.patch(svc._id)
      .set({
        slug: { _type: 'slug', current: slug },
        highlights: content.highlights,
        ctaTitle: content.ctaTitle,
        ctaSubtitle: content.ctaSubtitle,
      })
      .commit()

    console.log(`Updated ${svc.serviceId} -> /services/${slug}`)
  }

  console.log('Done!')
}

run().catch(console.error)

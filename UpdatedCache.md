# EduCoach Project — Complete Context Cache

**Last Updated:** 2026-10-03
**Current Version:** v2.0

---

## Project Overview

EduCoach Services is a study-abroad counselling website built with Next.js and Sanity CMS. All content is CMS-driven. The site has 44 routes covering services, country guides, team, blog, events, case studies, success stories, programmes, and more.

**Git Repo:** https://github.com/educoach2012/educoachweb
**Production:** Files are on a separate machine — changes require versioned changelogs for manual transfer.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, Turbopack) | 16.3.0 |
| React | React | 19.x |
| Language | TypeScript | 5.7.3 |
| Styling | Tailwind CSS v4 | 4.3.3 |
| CMS | Sanity v3 (embedded Studio at `/studio`) | 6.15.0 |
| Rich Text | @portabletext/react | 8.0.1 |
| Images | @sanity/image-url | 2.1.1 |
| Animation | Framer Motion | 13.x |
| Icons | Lucide React | 1.17.0 (note: `Linkedin` export removed in this version) |
| Forms | Zod validation + Resend email | zod 4.6.5, resend 6.28.1 |
| Analytics | @vercel/analytics | 1.6.1 |
| UI | class-variance-authority, clsx, tailwind-merge | latest |
| Package Manager | pnpm | — |

### Important Next.js 16 Differences

- `revalidateTag()` requires TWO arguments (tag + profile/CacheLifeConfig) — different from Next.js 14/15
- `params` in page components is a `Promise` — must `await params` before accessing
- Turbopack is default for both dev and build
- Read `node_modules/next/dist/docs/` for API reference before writing code

---

## Sanity CMS Configuration

| Setting | Value |
|---------|-------|
| Project ID | `i8j6p507` |
| Dataset | `production` |
| API Version | `2024-01-01` |
| useCdn | `false` (changed from `true` — CDN was serving stale content) |
| Studio URL | `/studio` (embedded in Next.js app) |
| Revalidation | ISR with 60-second `revalidate` on all queries |
| Webhook | `/api/revalidate` endpoint — uses `revalidatePath('/', 'layout')` for on-demand ISR |
| Webhook Secret | `SANITY_REVALIDATE_SECRET` env var |

---

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=i8j6p507
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_REVALIDATE_SECRET=<webhook secret>
```

---

## Directory Structure

```
edu-coach-services-WebBase/
├── app/
│   ├── (site)/                    # All public pages
│   │   ├── page.tsx               # Homepage (12 sections)
│   │   ├── about/page.tsx
│   │   ├── acceptances/page.tsx
│   │   ├── blogs/page.tsx
│   │   ├── blogs/[slug]/page.tsx
│   │   ├── book-assessment/page.tsx
│   │   ├── case-studies/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── countries/page.tsx
│   │   ├── countries/[slug]/page.tsx
│   │   ├── events/page.tsx
│   │   ├── how-we-work/page.tsx
│   │   ├── methodology/page.tsx
│   │   ├── programmes/jumpstart/page.tsx
│   │   ├── programmes/sprint/page.tsx
│   │   ├── programmes/career-pivot/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── services/page.tsx
│   │   ├── services/undergraduate/page.tsx
│   │   ├── services/postgraduate/page.tsx
│   │   ├── success-stories/page.tsx
│   │   ├── team/page.tsx
│   │   └── universities/page.tsx
│   ├── api/
│   │   ├── assessment/route.ts
│   │   ├── contact/route.ts
│   │   ├── instagram/route.ts
│   │   ├── newsletter/route.ts
│   │   └── revalidate/route.ts    # Sanity webhook endpoint
│   └── studio/[[...tool]]/page.tsx # Embedded Sanity Studio
├── components/
│   ├── home/                      # Homepage-specific sections
│   │   ├── hero.tsx               # Main hero with country pills
│   │   ├── trust-bar.tsx          # University trust logos
│   │   ├── why-educoach.tsx       # Icon card grid (clickable via href)
│   │   ├── founder-spotlight.tsx  # Founder photo + bio + quote
│   │   ├── how-we-work.tsx        # Steps timeline
│   │   ├── success-stories.tsx    # Horizontal scroll testimonials
│   │   ├── destinations.tsx       # Country flags grid
│   │   ├── services-section.tsx   # Services cards
│   │   ├── experts.tsx            # Team member cards (photos, no book button)
│   │   ├── events-section.tsx     # Upcoming events cards
│   │   ├── blogs-section.tsx      # Recent blog cards
│   │   └── faq-section.tsx        # FAQ accordion
│   ├── page-hero.tsx              # Reusable page hero with breadcrumbs + rich text
│   ├── rich-text.tsx              # @portabletext/react renderer with Tailwind
│   ├── cta-band.tsx               # CTA section (CMS-toggleable per page)
│   ├── team-modal.tsx             # TeamGrid + TeamModal (photo grid + dialog popup)
│   ├── site-header.tsx            # Responsive nav (mobile hamburger <lg, reduced padding at lg, full at xl)
│   ├── site-footer.tsx            # Footer with responsive CTA band
│   ├── section-heading.tsx        # Reusable eyebrow + title + description
│   ├── reveal.tsx                 # Framer Motion reveal animations
│   ├── cta-button.tsx             # Button component with variants (gold, outline, etc.)
│   ├── icon.tsx                   # Dynamic Lucide icon by name
│   ├── contact-form.tsx           # Contact form with Zod validation
│   ├── assessment-form.tsx        # Assessment booking form (or iframe embed)
│   ├── newsletter-form.tsx        # Email newsletter signup
│   ├── instagram-feed.tsx         # Instagram API feed
│   ├── animated-counter.tsx       # Counting animation for stats
│   ├── story-timeline.tsx         # Timeline component
│   ├── blogs-grid.tsx             # Blog cards grid
│   ├── stories-grid.tsx           # Success stories grid
│   ├── universities-grid.tsx      # Universities listing grid
│   ├── sticky-actions.tsx         # Floating WhatsApp/call buttons
│   ├── logo.tsx                   # Site logo component
│   ├── theme-toggle.tsx           # Dark/light mode toggle
│   └── analytics.tsx              # GA4/GTM script injection
├── sanity/
│   ├── schemas/
│   │   ├── index.ts               # Schema registry (16 types)
│   │   ├── richText.ts            # Shared rich text block type
│   │   ├── siteSettings.ts        # Global settings (groups: general, homepage, founder, nav, logos, social, analytics, seo)
│   │   ├── pageContent.ts         # Per-page CMS content (hero, sections, CTA, items, lists, perks, richBody)
│   │   ├── country.ts             # Country guides (+ richOverview, richVisaInfo)
│   │   ├── service.ts             # Services (+ richLongDesc)
│   │   ├── blog.ts                # Blog posts
│   │   ├── successStory.ts        # Success stories with photo
│   │   ├── teamMember.ts          # Team members (photo, secondaryPhoto, social links)
│   │   ├── event.ts               # Events with registrationUrl
│   │   ├── university.ts          # Partner universities with logo
│   │   ├── faq.ts                 # FAQ entries
│   │   ├── resource.ts            # Downloadable resources
│   │   ├── step.ts                # How-we-work steps
│   │   ├── caseStudy.ts           # Case studies (+ richChallenge/Approach/Outcome)
│   │   ├── acceptance.ts          # University acceptances
│   │   └── programme.ts           # Programme pages (jumpstart, sprint, career-pivot)
│   ├── lib/
│   │   ├── client.ts              # Sanity client (useCdn: false)
│   │   ├── queries.ts             # All GROQ queries
│   │   └── image.ts               # urlFor() image URL builder
│   └── env.ts                     # Environment variable exports
├── lib/
│   ├── types.ts                   # All TypeScript types
│   ├── data.ts                    # Data fetcher functions (sanityFetch wrapper with 60s ISR)
│   └── utils.ts                   # section() helper, cn() class merger
├── public/
│   └── images/
│       └── placeholder.png        # Fallback placeholder image (400x400)
└── .claude/
    └── launch.json                # Dev server config: pnpm dev on port 3000
```

---

## Sanity Schema Types (16 total)

| Type | Document/Object | Key Fields |
|------|----------------|------------|
| `richText` | Object (shared) | blocks (normal, h3, h4, blockquote), lists, marks (bold/italic/underline/link), images |
| `siteSettings` | Document (singleton) | company info, stats, whyCards, hero content, founder, milestones, nav, logos, analytics, SEO |
| `pageContent` | Document | slug, hero fields, sections[], CTA fields, ctaVisible, items[], lists, perks, richBody |
| `country` | Document | slug, name, flag, tagline, overview/richOverview, universities, visa/richVisaInfo |
| `service` | Document | serviceId, icon, title, shortDesc, longDesc/richLongDesc, features[] |
| `blog` | Document | slug, title, category, body (portable text), author ref, heroImage |
| `successStory` | Document | name, university, country ref, course, scholarship, quote, photo |
| `teamMember` | Document | name, role, experience, specialisation, countries, bio, photo, secondaryPhoto, social links |
| `event` | Document | title, date, mode, city, spots, registrationUrl |
| `university` | Document | name, country ref, ranking, type, city, website, logo |
| `faq` | Document | question, answer, order |
| `resource` | Document | title, type, description, file/externalUrl |
| `step` | Document | title, shortDesc, longDesc, order |
| `caseStudy` | Document | slug, studentName, university, challenge/richChallenge, approach/richApproach, outcome/richOutcome |
| `acceptance` | Document | studentName, university, country, course, level, scholarship, year, photo |
| `programme` | Document | slug, title, hero, sections, benefits, phases, cards, stats, levels, timeline |

---

## Data Fetching Pattern

All data flows through `lib/data.ts`:

```tsx
// Wrapper with 60-second ISR
async function sanityFetch<T>(query: string, params?): Promise<T> {
  return client.fetch<T>(query, params ?? {}, { next: { revalidate: 60 } })
}

// Exported functions: getSiteSettings, getCountries, getCountryBySlug,
// getServices, getBlogs, getBlogBySlug, getSuccessStories, getTeamMembers,
// getEvents, getUniversities, getFaqs, getResources, getSteps,
// getCaseStudies, getAcceptances, getPageContent, getProgramme,
// getStoriesByCountry
```

---

## Key Patterns

### Page Content (Section Headings)
Pages use `getPageContent(slug)` to load CMS-managed headings, hero, and CTA content. The `section()` utility looks up sections by key:
```tsx
const page = await getPageContent('about')
const s = (key: string) => section(page?.sections, key)
// Usage: s('team').title, s('values').description
```

### Rich Text Fallback
All rich text fields have plain text fallbacks for backward compatibility:
```tsx
{country.richOverview?.length ? <RichText value={country.richOverview} /> : <p>{country.overview}</p>}
```

### Image Rendering
Images use `urlFor()` from `@sanity/image-url`:
```tsx
import { urlFor } from '@/sanity/lib/image'
// Usage: urlFor(member.photo).width(400).height(400).url()
```
Always check `photo?.asset?._ref` before rendering to avoid errors on missing images.

### CTA Band Visibility
Every page with a CTABand wraps it in a visibility check:
```tsx
{page?.ctaVisible !== false && <CTABand title={page?.ctaTitle} subtitle={page?.ctaSubtitle} />}
```

### Responsive Breakpoints
- Mobile: < 640px (sm)
- Tablet: 640-1023px (md at 768)
- Desktop nav: 1024px+ (lg) — reduced padding, smaller text
- Full desktop: 1280px+ (xl) — full nav padding and text

---

## What's Been Completed (v2.0)

1. Rich text editor support — richText schema + portable text renderer
2. CMS image rendering — photos load via urlFor() across all components
3. Responsive header — works at 768px (hamburger), 1024px (compact nav), 1280px+ (full)
4. Footer CTA responsive — proper padding/margins on mobile
5. CTA band CMS-editable — toggleable per page, title/subtitle from CMS
6. Hero description full width — removed max-width constraints, rich text support
7. Clickable cards — whyCards have optional href, events have registrationUrl
8. Team page overhaul — photo grid with modal popup (native dialog)
9. CMS revalidation fixed — useCdn: false + webhook endpoint
10. "Book Session" button removed from team sections

---

## What's Pending

### Immediate (v2.1)
- **Widget-based page system** — See NEW_PLAN.md for full architecture
- **Individual service pages** — Each service needs its own dedicated page (primary driver for widget system)
- **Sanity webhook setup** — User needs to configure webhook in Sanity dashboard pointing to `/api/revalidate`

### Future
- Widget-driven programme pages
- CMS live preview (Sanity Presentation layer)
- A/B testing on widgets
- Widget visibility rules (date-based, device-based)

---

## Git Configuration

- **Name:** Rohit
- **Email:** spammingrohit@gmail.com
- **Attribution:** `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`
- **No .git folder** — files were copied without git history; pushed via GitHub Desktop

---

## User Context

- **Rohit Verma** — building the EduCoach website
- Two-machine workflow: development on one machine, production on another
- Needs versioned changelogs for file transfers between machines
- Prefers gold box behind dark text for highlights (not gradient-clip — was invisible)
- Book Assessment form should be CMS-managed iframe embed (not hardcoded React form)
- Prefers terse responses, no trailing summaries
- Favors bundled PRs over many small ones for refactors

---

## Known Issues / Gotchas

1. **lucide-react v1.17.0** — `Linkedin` icon export was removed. Use custom SVG instead.
2. **@sanity/image-url** — default export deprecated; use named export `createImageUrlBuilder`
3. **Next.js 16 revalidateTag** — requires 2 args, so we use `revalidatePath('/', 'layout')` instead
4. **Tailwind v4** — uses CSS-first config, not `tailwind.config.ts`
5. **Image domains** — `cdn.sanity.io` must be in `next.config.mjs` `images.remotePatterns`
6. **Homepage fetches 9 data sources** — all in `Promise.all()` for parallel loading

---

## Quick Start Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (port 3000)
pnpm build            # Production build
pnpm start            # Start production server
```

Dev server launch config: `.claude/launch.json` → `educoach-dev` (pnpm dev, port 3000)

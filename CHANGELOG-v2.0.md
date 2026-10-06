# v2.0 — CMS & UI Fixes (Items 1–9)

**Date:** 2026-10-01
**Build:** Passes (0 errors, 44 routes)

---

## Summary of Changes

### Item 1 — Rich Text Descriptions
- **NEW** `sanity/schemas/richText.ts` — Shared rich text schema (blocks, lists, bold/italic/underline, links, images)
- **NEW** `components/rich-text.tsx` — Portable text renderer with Tailwind styles
- **MODIFIED** `sanity/schemas/index.ts` — Registered richText schema type
- **MODIFIED** `sanity/schemas/pageContent.ts` — Added `heroRichDescription`, `ctaVisible`, `richBody` fields
- **MODIFIED** `sanity/schemas/country.ts` — Added `richOverview`, `richVisaInfo` fields
- **MODIFIED** `sanity/schemas/service.ts` — Added `richLongDesc` field
- **MODIFIED** `sanity/schemas/caseStudy.ts` — Added `richChallenge`, `richApproach`, `richOutcome` fields
- **MODIFIED** `sanity/schemas/siteSettings.ts` — Added `href` to whyCards, `richBio` + `photo` to founder

### Item 2 — Fix Images Not Loading
- **MODIFIED** `lib/types.ts` — Added `photo`, `secondaryPhoto`, social links, rich text fields to all relevant types
- **MODIFIED** `sanity/lib/queries.ts` — Added image + rich text fields to GROQ queries
- **MODIFIED** `components/home/founder-spotlight.tsx` — Renders CMS photo via urlFor(), rich bio support
- **MODIFIED** `components/home/success-stories.tsx` — Renders CMS photo on story cards
- **NEW** `public/images/placeholder.png` — Fallback placeholder image

### Item 3 — Responsive Header Fix
- **MODIFIED** `components/site-header.tsx` — Reduced nav padding/font at lg breakpoint, xl restores originals; CTA button shows at lg+ only; dropdown narrower at lg; nav overflow handled

### Item 4 — Footer Box Breaking
- **MODIFIED** `components/site-footer.tsx` — Reduced CTA band negative margin on mobile; responsive padding; proper text wrapping; full-width stacked buttons on mobile

### Item 5 — CTA Band CMS-Editable
- **MODIFIED** `sanity/schemas/pageContent.ts` — Added `ctaVisible` boolean (default true)
- **MODIFIED** 14 page files — CTABand wrapped in `page?.ctaVisible !== false` conditional

### Item 6 — Hero Description Full Width + Rich Text
- **MODIFIED** `components/page-hero.tsx` — Removed `max-w-3xl`/`max-w-2xl` constraints; added `richDescription` prop; renders RichText when available

### Item 8 — Clickable Cards with Links
- **MODIFIED** `sanity/schemas/siteSettings.ts` — Added optional `href` to whyCards
- **MODIFIED** `components/home/why-educoach.tsx` — Cards wrapped in `<Link>` when href is set
- **MODIFIED** `components/home/events-section.tsx` — Reserve Seat uses `registrationUrl` when available

### Item 9 — Team Page Overhaul
- **NEW** `components/team-modal.tsx` — Photo grid (2/3/4 cols) + native dialog modal with photo, bio, social links, CTA
- **MODIFIED** `app/(site)/team/page.tsx` — Rewritten to use TeamGrid component
- **MODIFIED** `sanity/schemas/teamMember.ts` — Added `secondaryPhoto`, `twitter`, `instagram` fields

### CMS Revalidation Fix
- **MODIFIED** `sanity/lib/client.ts` — Changed `useCdn: true` to `useCdn: false`
- **NEW** `app/api/revalidate/route.ts` — On-demand ISR webhook for Sanity
- **MODIFIED** `lib/data.ts` — Removed tag arguments from sanityFetch calls

### Rich Text on Content Pages
- **MODIFIED** `app/(site)/countries/[slug]/page.tsx` — Overview + visa info use RichText when available
- **MODIFIED** `app/(site)/services/page.tsx` — Service longDesc uses RichText when available
- **MODIFIED** `app/(site)/case-studies/page.tsx` — Challenge/approach/outcome use RichText when available

### Pages Updated with CTA Visibility + Hero Rich Description
- `app/(site)/about/page.tsx`
- `app/(site)/acceptances/page.tsx`
- `app/(site)/blogs/page.tsx`
- `app/(site)/book-assessment/page.tsx`
- `app/(site)/case-studies/page.tsx`
- `app/(site)/contact/page.tsx`
- `app/(site)/countries/page.tsx`
- `app/(site)/events/page.tsx`
- `app/(site)/how-we-work/page.tsx`
- `app/(site)/methodology/page.tsx`
- `app/(site)/resources/page.tsx`
- `app/(site)/services/page.tsx`
- `app/(site)/success-stories/page.tsx`
- `app/(site)/team/page.tsx`
- `app/(site)/universities/page.tsx`

---

## New Dependencies
- `@portabletext/react` ^8.0.1 (rich text renderer)
- `@sanity/image-url` (image URL builder — may have already been present)

## Setup Required on Production
1. **Sanity Webhook:** Go to sanity.io dashboard > API > Webhooks. Create webhook pointing to `https://yourdomain.com/api/revalidate` with secret matching `SANITY_REVALIDATE_SECRET` env var
2. **Environment Variable:** Add `SANITY_REVALIDATE_SECRET` to production `.env`
3. Run `pnpm install` to pick up new dependencies

## Deferred to Future Phase
- Item 7 — Hero image banner (part of widget system)
- Items 10-11 — Widget-driven pages + CMS live preview

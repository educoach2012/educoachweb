# EduCoach Project Cache

**Version:** v2.3 | **Updated:** 2026-10-08

## Stack
Next.js 16.3.0 (App Router, Turbopack), React 19, TypeScript 5.7, Tailwind v4, Sanity v3 (embedded at `/studio`), pnpm.
Sanity: `i8j6p507`, dataset: `production`, useCdn: false, ISR 60s.
Git: github.com/educoach2012/educoachweb | Vercel: educoachweb.vercel.app

## Gotchas
- Next.js 16: `params` is a Promise, use `revalidatePath('/', 'layout')` not `revalidateTag()`
- lucide-react 1.17.0 removed `Linkedin` — use custom SVG
- Production files on separate machine — versioned changelogs required

## Key Patterns
- `PageHero`: eyebrow, title (required), description, richDescription, crumbs
- `CTABand`: returns null when both title/subtitle empty
- `urlFor()` from `sanity/lib/image.ts` for CMS images
- `section()` util for homepage section lookups
- Nav: button toggle for dropdown parents (desktop), accordion (mobile)

## Version History
- v2.0: Rich text, CMS images, responsive fixes, team modal, CTA toggle, clickable cards
- v2.1: CTA default-off, service detail pages
- v2.2: Contact/hero fully CMS-driven, submenu fix
- v2.3: Dynamic pages — catch-all `[slug]` route with 12 layout templates

## Dynamic Pages
- `[slug]` route renders any CMS-created pageContent with a layout template
- 12 layouts: content, countries, services, blog, success-stories, events, universities, resources, acceptances, case-studies, team, how-we-work
- Content source: "own" (default) = `dynamicItem` docs linked to page; "existing" = reuse typed content
- `dynamicItem` schema: generic doc with title, subtitle, desc, image, date, tags, quote, person, org, badge, features, order
- Sanity sidebar: Page Content → [page] → Page Settings + Page Items
- `DynamicItemsGrid` renders own-content items in a generic card grid
- Nav is manual (add pages in Site Settings → Main Nav)

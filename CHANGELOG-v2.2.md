# v2.2 — Phase 1: Contact CMS, Hero CMS, Submenu Fix

**Date:** 2026-10-08
**Build:** Passes (0 errors)
**Previous:** v2.1.0 (CTA default-off + service detail pages)

---

## Issue 1 — Contact Page Fully CMS-Driven

- Added `mapEmbedUrl` field to `siteSettings.ts` (general group)
- Contact page now reads ALL data from CMS — no hardcoded fallbacks
- Map iframe only renders when `mapEmbedUrl` is set in Studio
- Hero text (eyebrow, title, description) reads from pageContent with no fallbacks

### Files changed
- `sanity/schemas/siteSettings.ts` — added `mapEmbedUrl` field
- `app/(site)/contact/page.tsx` — removed hardcoded fallbacks, map reads from CMS
- `lib/types.ts` — added `mapEmbedUrl` to SiteSettings

### CMS action needed
- Set `mapEmbedUrl` in Site Settings → General (use OpenStreetMap or Google Maps embed URL)
- Ensure `/contact` pageContent has heroTitle, heroDescription set

---

## Issue 2 — Homepage Hero Image & Ticker from CMS

- Added `heroImage` (image) and `heroCountryTickerLabel` (string) to `siteSettings.ts` (homepage group)
- Hero image reads from CMS, falls back to `/hero-student.png` only if not set
- Badge, heading, subtitle, country ticker label — all CMS-driven, no hardcoded fallbacks
- Elements render nothing when their CMS fields are empty

### Files changed
- `sanity/schemas/siteSettings.ts` — added `heroImage`, `heroCountryTickerLabel`
- `components/home/hero.tsx` — removed all hardcoded fallbacks, added `heroImageUrl` and `countryTickerLabel` props
- `app/(site)/page.tsx` — passes new props from settings, added urlFor import
- `lib/types.ts` — added `heroImage`, `heroCountryTickerLabel` to SiteSettings

### CMS action needed
- Upload hero image in Site Settings → Homepage → Hero Image
- Set "Hero Country Ticker Label" (e.g. "Admissions across 30+ countries")
- Ensure heroBadge, heroHeadingLines, heroSubtitle are set

---

## Issue 4 — Submenu Click Behavior Fixed

- Desktop: parent nav items with children are now `<button>` (not `<Link>`) — click toggles dropdown, never navigates
- Desktop: dropdown also opens on hover (existing behavior preserved)
- Desktop: chevron rotates when dropdown is open
- Desktop: clicking a child link closes the dropdown
- Mobile: parent items with children use accordion toggle — tap expands/collapses children
- Mobile: simple items remain as direct links
- Removed `overflow-hidden` from nav (was clipping the dropdown)

### Files changed
- `components/site-header.tsx` — desktop button toggle, mobile accordion, removed overflow-hidden

---

## All Files Changed (v2.2)

1. `sanity/schemas/siteSettings.ts`
2. `app/(site)/contact/page.tsx`
3. `components/home/hero.tsx`
4. `app/(site)/page.tsx`
5. `lib/types.ts`
6. `components/site-header.tsx`

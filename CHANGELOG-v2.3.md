# Changelog v2.3 — Dynamic Pages with Own Content

**Date:** 2026-10-09

## Summary
Dynamic pages now support **own content** — each page gets its own content bucket in the Sanity sidebar. No longer forced to reuse existing content types. Choose a layout, add items directly under that page, and they render in the chosen layout pattern.

## New Files
- `sanity/schemas/dynamicItem.ts` — Generic content document with flexible fields (title, subtitle, description, image, date, tags, quote, person, organisation, badge, features, etc.) + `page` reference to parent pageContent
- `components/dynamic-layout.tsx` — Layout renderer with 12 typed templates + generic `DynamicItemsGrid` for own content
- `app/(site)/[slug]/page.tsx` — Catch-all dynamic route with `generateStaticParams`, `generateMetadata`, layout dispatch

## Modified Files
- `sanity/schemas/pageContent.ts` — Added `contentSource` radio (own/existing), `contentType` now hidden unless "existing" is selected
- `sanity/schemas/index.ts` — Registered `dynamicItem` schema
- `sanity.config.ts` — Custom sidebar structure: Page Content → [page name] → Page Settings + Page Items (filtered dynamicItems). Added `dynamicItem-for-page` initial value template so new items auto-link to parent page
- `sanity/lib/queries.ts` — Added `dynamicItemsByPageQuery`
- `lib/types.ts` — Added `DynamicItem` type, `contentSource` and `_id` to `PageContent`
- `lib/data.ts` — Added `getDynamicItemsByPage()` function

## How to Create a Dynamic Page with Own Content
1. In Sanity Studio, go to **Page Content** in the sidebar
2. Create a new page, set the **slug** (e.g. `testimonials`)
3. Choose a **Layout** (e.g. `blog` for a post grid)
4. **Content Source** defaults to "Own content"
5. Click into **Page Items** under that page → add items with title, description, image, etc.
6. Items render in the chosen layout's visual pattern
7. To reuse existing content (e.g. show all Blog Posts), switch Content Source to "Existing content type"
8. To add the page to navigation, go to **Site Settings → Main Nav** and add it manually

# Widget-Based Page Builder — Implementation Plan

## Overview

Replace the current hardcoded page layouts with a **widget-based composition system** where every page is built from an ordered array of reusable, CMS-configurable widgets. Each widget maps to an existing component (or a new one) and carries its own data. The CMS editor drags widgets into a page, configures each one, and the frontend renders them in order.

---

## Architecture

### Core Concept

```
Page Document (Sanity)
  └─ widgets[] (ordered array)
       ├─ Widget: hero         → <PageHero />
       ├─ Widget: richText     → <RichTextBlock />
       ├─ Widget: cardGrid     → <CardGrid />
       ├─ Widget: ctaBand      → <CTABand />
       ├─ Widget: teamGrid     → <TeamGrid />
       └─ ... any widget type
```

A single **page renderer** iterates through the `widgets[]` array and renders the matching component for each widget type. No page-specific layout files needed for standard pages.

### Key Principles

1. **Each widget is self-contained** — its schema defines all the data it needs
2. **Widgets are reusable** — the same widget type can appear on any page, multiple times
3. **Order is CMS-controlled** — drag to reorder in Sanity Studio
4. **Data widgets pull from collections** — some widgets (e.g. teamGrid, storiesCarousel) fetch their data from existing Sanity collections rather than inline data
5. **Backward compatible** — existing pages keep working during migration; widget system is opt-in per page

---

## Phase 1: Widget Schema & Registry

### 1.1 — New Sanity Schema: `widget` (object type)

File: `sanity/schemas/widget.ts`

A discriminated union of widget types using Sanity's `object` type with conditional fields. Each widget has a `_type` discriminator and type-specific fields.

```
Widget Types:
├── hero              — eyebrow, title, description, richDescription, image, crumbs[]
├── richText          — body (richText block content)
├── sectionHeading    — eyebrow, title, description, alignment
├── cardGrid          — cards[]{icon, title, desc, href, image}, columns (2|3|4)
├── iconCardGrid      — cards[]{icon, title, desc, href}, columns (2|3|4)
├── ctaBand           — title, subtitle, primaryButton{label, href}, secondaryButton{label, href}
├── statsBar          — stats[]{value, suffix, label}
├── teamGrid          — source: "all" | "featured" | "manual", manualMembers[] (refs)
├── storiesCarousel   — source: "all" | "featured" | "byCountry", country (ref), limit
├── eventsGrid        — source: "upcoming" | "all" | "manual", limit
├── servicesGrid      — source: "all" | "manual", layout: "cards" | "detailed"
├── countriesGrid     — source: "all" | "manual", layout: "flags" | "cards"
├── faqAccordion      — source: "all" | "manual", manualFaqs[] (refs or inline)
├── blogsGrid         — source: "recent" | "featured" | "manual", limit
├── founderSpotlight  — (pulls from siteSettings.founder, no extra fields)
├── trustBar          — (pulls from siteSettings.trustedUniversities)
├── instagramFeed     — (pulls from siteSettings.instagramHandle)
├── contactForm       — formTitle, formDescription
├── assessmentForm    — (pulls iframe URL from siteSettings.assessmentFormUrl)
├── imageBlock        — image, alt, caption, fullWidth (bool)
├── imageBanner       — image, alt, overlayText, height ("sm"|"md"|"lg"|"full")
├── embedBlock        — embedUrl, height, title (for iframes)
├── timeline          — items[]{date, title, description}
├── comparisonTable   — leftTitle, rightTitle, leftItems[], rightItems[]
├── testimonialGrid   — testimonials[]{quote, name, role, photo} or source: "stories"
├── universitiesGrid  — source: "all" | "byCountry", country (ref), layout
├── howWeWork         — source: "steps" (pulls from steps collection)
├── caseStudiesGrid   — source: "all" | "featured", limit
├── resourcesList     — source: "all" | "byType", type filter
├── spacer            — height ("sm"|"md"|"lg"|"xl")
├── divider           — style ("line"|"dots"|"gradient")
└── customHtml        — code (raw HTML/embed code), sandboxed
```

### 1.2 — Widget Registry (Frontend)

File: `lib/widget-registry.tsx`

Maps widget `_type` strings to React components. Each entry defines:
- The component to render
- A data fetcher (for collection-based widgets that need server-side data)
- Display name (for error boundaries)

```tsx
const widgetRegistry: Record<string, WidgetRegistryEntry> = {
  hero:             { component: WidgetHero },
  richText:         { component: WidgetRichText },
  cardGrid:         { component: WidgetCardGrid },
  teamGrid:         { component: WidgetTeamGrid, fetcher: fetchTeamData },
  storiesCarousel:  { component: WidgetStories, fetcher: fetchStoriesData },
  ctaBand:          { component: WidgetCtaBand },
  // ...
}
```

### 1.3 — Page Renderer Component

File: `components/widget-renderer.tsx`

```tsx
export async function WidgetRenderer({ widgets }: { widgets: Widget[] }) {
  return (
    <>
      {widgets.map((widget, i) => {
        const entry = widgetRegistry[widget._type]
        if (!entry) return null
        // fetch collection data if needed
        const data = entry.fetcher ? await entry.fetcher(widget) : null
        return <entry.component key={widget._key} widget={widget} data={data} />
      })}
    </>
  )
}
```

---

## Phase 2: Sanity Schema — `widgetPage`

### 2.1 — New Document Type: `widgetPage`

File: `sanity/schemas/widgetPage.ts`

```
Fields:
  - slug (string, required, unique) — URL path
  - metaTitle (string)
  - metaDescription (text)
  - widgets[] (array of widget objects — the core)
```

This replaces `pageContent` for pages that opt in. The existing `pageContent` documents continue working for pages not yet migrated.

### 2.2 — Dynamic Page Route

File: `app/(site)/[...slug]/page.tsx` (catch-all)

This route:
1. Looks up a `widgetPage` by the slug
2. If found, renders `<WidgetRenderer widgets={page.widgets} />`
3. If not found, falls through to `notFound()`

Existing explicit routes (e.g. `app/(site)/about/page.tsx`) take priority over the catch-all, so migration is gradual — move one page at a time by:
1. Creating a `widgetPage` document in Sanity
2. Deleting the hardcoded route file

### 2.3 — Service Detail Pages (the primary use case)

Currently services only have a listing page (`/services`). With the widget system, each service gets its own page:

1. Add a `slug` field to the `service` schema
2. Create a `widgetPage` for each service (e.g. slug: `services/career-counselling`)
3. Compose each service page from widgets:
   - `hero` — service title, short description, icon
   - `richText` — the full service description (richLongDesc)
   - `cardGrid` — features/benefits
   - `testimonialGrid` — filtered success stories
   - `ctaBand` — book assessment CTA
   - Any custom blocks the service needs

Alternatively, create a **service template** — a `widgetPage` variant that auto-populates some widgets from the service document, so you don't duplicate data.

---

## Phase 3: Widget Components

Each widget component wraps an existing component or creates a new one.

### Mapping to Existing Components

| Widget Type       | Existing Component              | Changes Needed                    |
|-------------------|---------------------------------|-----------------------------------|
| hero              | `components/page-hero.tsx`      | Accept widget props               |
| richText          | `components/rich-text.tsx`      | Wrap with section padding         |
| ctaBand           | `components/cta-band.tsx`       | Already ready                     |
| teamGrid          | `components/team-modal.tsx`     | Already ready (TeamGrid export)   |
| storiesCarousel   | `components/home/success-stories.tsx` | Already ready              |
| eventsGrid        | `components/home/events-section.tsx`  | Already ready              |
| servicesGrid      | `components/home/services-section.tsx`| Already ready              |
| countriesGrid     | `components/home/destinations.tsx`    | Already ready              |
| faqAccordion      | `components/home/faq-section.tsx`     | Already ready              |
| blogsGrid         | `components/home/blogs-section.tsx`   | Already ready              |
| founderSpotlight  | `components/home/founder-spotlight.tsx`| Already ready              |
| trustBar          | `components/home/trust-bar.tsx`       | Already ready              |
| instagramFeed     | `components/instagram-feed.tsx`       | Already ready              |
| howWeWork         | `components/home/how-we-work.tsx`     | Already ready              |
| contactForm       | `components/contact-form.tsx`         | Already ready              |
| assessmentForm    | `components/assessment-form.tsx`      | Already ready              |
| statsBar          | `components/animated-counter.tsx`     | Wrap with section           |
| sectionHeading    | `components/section-heading.tsx`      | Wrap with section           |
| cardGrid          | NEW                                   | Generic card grid           |
| iconCardGrid      | Adapt `why-educoach.tsx`              | Generalize                  |
| imageBlock        | NEW                                   | Simple image with caption   |
| imageBanner       | NEW                                   | Full-width hero image       |
| embedBlock        | NEW                                   | Iframe embed                |
| timeline          | `components/story-timeline.tsx`       | Already ready              |
| comparisonTable   | NEW                                   | Two-column comparison       |
| testimonialGrid   | NEW                                   | Quote cards grid            |
| spacer            | NEW (trivial)                         | `<div style={{height}}/>`   |
| divider           | NEW (trivial)                         | `<hr>` with styles          |
| customHtml        | NEW                                   | Sandboxed dangerouslySet    |

### New Components to Build

1. **`components/widgets/card-grid.tsx`** — Responsive grid of cards with icon/image, title, description, optional link. Configurable columns (2/3/4).
2. **`components/widgets/image-block.tsx`** — CMS image with optional caption, full-width toggle.
3. **`components/widgets/image-banner.tsx`** — Full-width hero banner image with optional overlay text.
4. **`components/widgets/embed-block.tsx`** — Sandboxed iframe for external embeds (YouTube, Google Forms, Calendly, etc.)
5. **`components/widgets/comparison-table.tsx`** — Side-by-side comparison lists (used on programme pages).
6. **`components/widgets/testimonial-grid.tsx`** — Quote cards in a grid layout.
7. **`components/widgets/spacer.tsx`** — Configurable vertical spacing.
8. **`components/widgets/divider.tsx`** — Decorative section divider.

---

## Phase 4: Studio UX

### 4.1 — Widget Previews in Studio

Each widget type gets a custom preview in the Sanity array editor showing:
- Widget type icon + label
- Key content (e.g. hero title, CTA text, number of cards)
- Visual thumbnail where applicable

### 4.2 — Widget Templates

Pre-configured widget bundles for common page patterns:

- **Service Page Template**: hero + richText + cardGrid (features) + testimonialGrid + ctaBand
- **Programme Page Template**: hero + statsBar + timeline + comparisonTable + cardGrid + ctaBand
- **Landing Page Template**: hero + trustBar + cardGrid + storiesCarousel + ctaBand
- **Content Page Template**: hero + richText + ctaBand

These are convenience presets in Sanity Studio — the editor can add/remove/reorder after applying a template.

### 4.3 — Widget Palette

Group widgets by category in the Studio array "Add item" dialog:

- **Content**: richText, imageBlock, imageBanner, embedBlock, customHtml
- **Layout**: sectionHeading, spacer, divider, hero
- **Cards & Grids**: cardGrid, iconCardGrid, comparisonTable
- **Collections**: teamGrid, storiesCarousel, eventsGrid, servicesGrid, countriesGrid, blogsGrid, faqAccordion, caseStudiesGrid, resourcesList, universitiesGrid
- **Spotlight**: founderSpotlight, trustBar, statsBar, howWeWork, instagramFeed
- **Forms**: contactForm, assessmentForm
- **CTA**: ctaBand

---

## Phase 5: Migration

### Step-by-step per page:

1. Create a `widgetPage` document in Sanity with the page's slug
2. Add widgets that replicate the current page layout
3. Verify the widget-rendered page matches the hardcoded version
4. Delete the hardcoded `app/(site)/[page]/page.tsx` file
5. The catch-all `[...slug]` route now serves that page

### Migration Order:

1. **Service detail pages** (NEW — don't exist yet, the primary ask)
2. **Programme pages** (3 pages — `jumpstart`, `sprint`, `career-pivot`)
3. **Content pages** (about, how-we-work, methodology) — most benefit from rich text widgets
4. **Listing pages** (services, countries, blogs, etc.) — keep hardcoded but refactor to use widget renderer internally
5. **Homepage** — last, as it's the most complex; migrate section by section

### Homepage Migration Strategy

The homepage currently imports 12 components and fetches from 9 data sources. Migrate by:
1. Creating a `widgetPage` with slug `home`
2. Each current homepage section becomes a widget
3. The existing `app/(site)/page.tsx` checks for a `widgetPage` with slug `home` — if found, uses widget renderer; otherwise falls back to current hardcoded layout
4. This allows gradual migration — add one widget at a time

---

## Phase 6: Advanced Features (Future)

1. **Widget visibility rules** — show/hide based on date range (seasonal promos), device (mobile vs desktop)
2. **A/B testing** — multiple widget variants with traffic splitting
3. **Widget-level analytics** — track impressions and clicks per widget
4. **Shared widget instances** — a single widget document referenced across multiple pages (e.g. the same CTA band everywhere)
5. **Nested layouts** — a "columns" widget containing child widgets (2-col, 3-col layouts)
6. **Live preview** — Sanity's presentation layer showing real-time widget changes

---

## Execution Plan

| Phase | Scope | Estimated Effort |
|-------|-------|-----------------|
| Phase 1 | Widget schema + registry + renderer | 1 session |
| Phase 2 | widgetPage schema + catch-all route | 1 session |
| Phase 3 | Widget components (wrap existing + build new) | 2 sessions |
| Phase 4 | Studio UX (previews, templates, palette) | 1 session |
| Phase 5 | Migration (service pages first, then others) | 2-3 sessions |
| Phase 6 | Advanced features | Future |

**Total: ~7-8 sessions for full implementation**

### Immediate Priority: Service Detail Pages

To unblock custom service pages quickly, we can implement a minimal version:
1. Add `slug` to service schema
2. Create the widget schema with just 5-6 widget types (hero, richText, cardGrid, ctaBand, imageBlock, embedBlock)
3. Build the renderer + catch-all route
4. Create widget pages for each service

This gives you custom service pages in ~2 sessions while the broader system continues building.

---

## Files to Create/Modify

### New Files
- `sanity/schemas/widget.ts` — Widget type definitions
- `sanity/schemas/widgetPage.ts` — Widget page document type
- `lib/widget-registry.tsx` — Widget component registry
- `components/widget-renderer.tsx` — Page-level renderer
- `components/widgets/card-grid.tsx`
- `components/widgets/image-block.tsx`
- `components/widgets/image-banner.tsx`
- `components/widgets/embed-block.tsx`
- `components/widgets/comparison-table.tsx`
- `components/widgets/testimonial-grid.tsx`
- `components/widgets/spacer.tsx`
- `components/widgets/divider.tsx`
- `app/(site)/[...slug]/page.tsx` — Catch-all dynamic route

### Modified Files
- `sanity/schemas/index.ts` — Register widget + widgetPage schemas
- `sanity/schemas/service.ts` — Add slug field
- `sanity/lib/queries.ts` — Add widgetPage queries
- `lib/data.ts` — Add getWidgetPage() fetcher
- `lib/types.ts` — Add Widget and WidgetPage types

# EduCoach Website — Post-Audit Roadmap

Based on the Crease Design Works audit report (July 2026) and current site state.

---

## Phase 4A — Analytics & SEO Infrastructure (Priority: CRITICAL)

- [x] ~~Site live on Vercel with custom domain~~
- [x] **A9** — Google Analytics (GA4) + Google Tag Manager *(v1.1.0)*
  - GTM container ID and GA4 measurement ID as CMS fields in Site Settings
  - GTM head/body snippets injected via `components/analytics.tsx`
  - GA4 fallback when GTM not set; no tracking scripts in `/studio`
- [x] **A10** — CMS-Managed SEO *(v1.1.0)*
  - SEO fields (title, description, OG image) on Site Settings for global defaults
  - Per-page SEO overrides on Country and Blog schemas
  - Dynamic pages use CMS SEO fields with auto-generated fallbacks
  - Analytics & SEO tabs in Sanity Studio for clean content editing

## Phase 4B — Homepage & Brand Story (Priority: HIGH)

- [x] **A1** — Hero stat above the fold *(v1.2.0)* — CMS-driven stat badge + data-driven floating cards
- [x] **A6** — Founder spotlight section on homepage *(v1.2.0)* — photo, quote, credentials, bio
- [x] **A3** — Visual timeline for About page *(v1.2.0)* — 6-milestone alternating timeline replacing plain paragraphs

## Phase 4C — Content Architecture (Priority: HIGH)

- [x] **A2** — Methodology page (`/methodology`) — Psycho-Aptitude Analysis framework *(v1.3.0)*
- [x] **A4** — Split UG/PG admissions into `/services/undergraduate` and `/services/postgraduate` *(v1.3.0)*
- [x] **A5** — Life-stage landing pages: `/programmes/jumpstart`, `/programmes/sprint`, `/programmes/career-pivot` *(v1.3.0)*
- [x] **A7** — Case studies with named outcomes — Sanity schema + `/case-studies` page *(v1.3.0)*
- [x] **A8** — Acceptances wall — Sanity schema + `/acceptances` page with year grouping *(v1.3.0)*

## Phase 5 — Interactive Tools & Lead Generation (Priority: MEDIUM)

- [ ] **B1** — Cost & ROI Calculator (country/program/budget inputs → estimated costs + scholarship potential)
- [ ] **B2** — Reality Check Diagnostic (structured form → PDF snapshot)
- [ ] **B5** — Post-diagnostic email nurture sequence (3-step drip)
- [ ] **B6** — Anti-AI Admissions Desk (thought leadership blog category)

## Phase 6 — Product Features (Priority: FUTURE)

- [ ] **B3** — Parent Confidence Dashboard (private portal with progress tracking)
- [ ] **B4** — Ask an Alum (bookable 15-min chats with alumni)

---

## Version Log

| Version | Date | Summary |
|---------|------|---------|
| 1.0.0 | 2026-09-22 | Site live on Vercel, all Phase 1-3 complete |
| 1.0.1 | 2026-09-22 | Null-guard Sanity fetches for empty CMS deployment |
| 1.1.0 | 2026-09-24 | Phase 4A: GA4/GTM analytics + CMS-managed SEO fields |
| 1.2.0 | 2026-09-24 | Phase 4B: Hero stat, founder spotlight, about page timeline |
| 1.3.0 | 2026-09-24 | Phase 4C: Methodology page, UG/PG pages, life-stage programmes, case studies, acceptances wall |

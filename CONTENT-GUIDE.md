# EduCoach Website — Content Management Guide

This guide covers how the content team can log in, edit content, manage SEO, configure analytics, preview changes, and publish updates to the live EduCoach website.

---

## 1. Accessing the CMS

The website uses **Sanity Studio**, an embedded content editor that lives at:

**https://educoach.in/studio**

(Replace `educoach.in` with your actual domain if different.)

### How to log in

1. Go to the Studio URL above
2. Click **Log in with Google** (or the provider configured for your Sanity project)
3. Use the email address that has been added as a team member on the Sanity project

> **Need access?** Ask the project admin to invite you at [sanity.io/manage](https://sanity.io/manage) → Team → Invite Member.

---

## 2. Content Types Overview

Once logged in, you'll see a sidebar with these content types:

| Content Type | What it controls | How many? |
|---|---|---|
| **Site Settings** | Company info, contact, stats, logo, analytics IDs, global SEO defaults | 1 (singleton) |
| **Country** | Study destination pages (UK, USA, Canada, etc.) | One per country |
| **Service** | Service offerings (profile building, test prep, etc.) | Multiple |
| **Blog Post** | Blog articles | Multiple |
| **Success Story** | Student testimonials | Multiple |
| **Team Member** | Counsellor profiles | Multiple |
| **Event** | Workshops, webinars, masterclasses | Multiple |
| **University** | Partner university listings | Multiple |
| **FAQ** | Frequently asked questions on the homepage | Multiple |
| **Resource** | Downloadable guides, checklists, templates | Multiple |
| **How We Work Step** | The step-by-step counselling process | Multiple (ordered) |

---

## 3. First-Time Setup (do this before anything else!)

### Site Settings

This singleton controls information used across every page on the site. Click **Site Settings** in the sidebar.

**Main fields:**
- **Company Name**: "EduCoach Services"
- **Phone / Phone Href**: Display number and `tel:` link (e.g., `+91 98765 43210` and `tel:+919876543210`)
- **WhatsApp**: Number in international format without `+` (e.g., `919876543210`)
- **WhatsApp Message**: Pre-filled message for the chat button
- **Email**: Contact email shown on the site
- **Address**: Office address shown in the footer and contact page
- **Mission / Vision**: Text blocks for the About page
- **Stats**: Add items with `value` (number), `suffix` (e.g., `+`, `%`), and `label` (e.g., "Students placed"). The first stat also appears as a highlight badge in the homepage hero.
- **Values**: Company values shown on the About page (title + description)
- **Logo / Logo Dark**: Upload your logo for light and dark themes
- **Assessment Form URL** (optional): If set, the Book Assessment page shows this as an iframe instead of the built-in form

**Analytics & Tracking tab:**
- **Google Tag Manager ID**: Your GTM container ID (e.g., `GTM-XXXXXXX`)
- **Google Analytics 4 Measurement ID**: Your GA4 ID (e.g., `G-XXXXXXXXXX`)
- If you use GTM, only set the GTM ID — configure GA4 as a tag inside GTM
- If you don't use GTM, just set the GA4 ID for basic page view tracking
- Leave both blank to disable tracking entirely

**SEO Defaults tab:**
- **Default SEO Title**: Fallback title for search engines on pages without their own (keep under 60 characters)
- **Default SEO Description**: Fallback meta description (keep under 160 characters)
- **Default OG Image**: Fallback social sharing image (1200x630px recommended)

Click **Publish** when done.

---

## 4. Editing Content

### Adding a Country

1. Click **Country** → **Create new**
2. Fill in:
   - **Name**: e.g., "United Kingdom"
   - **Slug**: Click "Generate" — it creates `united-kingdom`. This becomes the URL: `/countries/united-kingdom`
   - **Flag**: Paste the flag emoji (e.g., flag for GB)
   - **Tagline**: Short one-liner for cards
   - **University Count**: e.g., "50+"
   - **Overview**: Longer description for the country detail page
   - **Why Study Here**: Add bullet points
   - **Top Universities**: Add entries with name, ranking, and city
   - **Intakes / Average Cost / Visa Info**: Sidebar details on the country page
   - **Order**: Lower number = appears first in the grid
3. **SEO tab** (optional): Override the auto-generated SEO title and description for this country's page
4. Click **Publish**

### Adding a Blog Post

1. Click **Blog Post** → **Create new**
2. Fill in:
   - **Title**: The headline
   - **Slug**: Click "Generate"
   - **Category**: e.g., "Scholarships", "Test Prep", "Country Guide"
   - **Published Date**: When the post should show as published
   - **Author**: Select a Team Member (create them first if needed)
   - **Hero Image**: The banner image
   - **Body**: Rich text editor — you can add paragraphs, headings, lists, images, and links
   - **Featured**: Toggle on to highlight this post
   - **Reading Time**: Estimated minutes to read
3. **SEO tab** (optional): Override the auto-generated SEO title and description for this blog post
4. Click **Publish**

### Adding a Team Member

1. Click **Team Member** → **Create new**
2. Fill in name, role, experience, specialisation, countries they handle, bio, photo, LinkedIn URL
3. Set **Order** to control the display sequence
4. Click **Publish**

### Adding an Event

1. Click **Event** → **Create new**
2. Fill in title, date/time, mode (Online/In-person/Hybrid), city, available spots, description
3. Optionally add a **Registration URL** for external sign-up
4. Click **Publish**

> Events automatically sort into "Upcoming" and "Past" based on the date.

### Adding a Success Story

1. Click **Success Story** → **Create new**
2. Fill in student name, university, country (select from your countries), course, scholarship details, year, quote, and photo
3. Toggle **Featured** to highlight on the homepage
4. Click **Publish**

### Other Content Types

- **Service**: Title, icon name, short/long descriptions, feature bullet points, order
- **University**: Name, country reference, ranking, type (Public/Private), city, website, logo
- **FAQ**: Question and answer text, order number
- **Resource**: Title, description, type (Guide/Tool/Checklist/Template), upload a file or add an external URL
- **How We Work Step**: Title, short and long descriptions, order number (1-8)

---

## 5. SEO Management

### How SEO works on the site

Every page has an SEO title and description that appear in Google search results and when shared on social media.

**The priority order is:**
1. **Per-page CMS override** (if you filled in the SEO tab on a Country or Blog post)
2. **Auto-generated** from the content (e.g., "Study in United Kingdom" for a country page)
3. **Global default** from Site Settings → SEO Defaults tab

### SEO best practices

| Field | Best practice |
|---|---|
| **SEO Title** | Under 60 characters. Include the primary keyword near the start. |
| **SEO Description** | 120–160 characters. Write a compelling summary that makes people click. |
| **OG Image** | 1200x630px. The site auto-generates branded OG images, but you can override with a custom one. |

### Where SEO fields are available

| Content Type | Has SEO tab? | Auto-generated fallback |
|---|---|---|
| Site Settings | Yes (global defaults) | — |
| Country | Yes | "Study in [Country Name]" |
| Blog Post | Yes | "[Blog Title] — expert advice from EduCoach..." |
| All other pages | No (static pages) | Hardcoded in the page code |

### What's automatic (no action needed)

- **Sitemap** (`/sitemap.xml`) — auto-generated with all pages, countries, and blog posts
- **Robots.txt** (`/robots.txt`) — configured to allow search engines, block `/studio` and `/api/`
- **Structured data** (JSON-LD) — auto-generated for the homepage (Organization + FAQ), blog posts (Article), and events (Event)
- **OG images** — auto-generated branded images for the homepage, every country page, and every blog post
- **Canonical URLs** — auto-set by Next.js

---

## 6. Analytics & Tracking

### Setting up Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com) → Create a GA4 property for your site
2. Copy the **Measurement ID** (starts with `G-`)
3. In Sanity Studio → Site Settings → **Analytics & Tracking** tab → paste into **GA4 Measurement ID**
4. Publish

Page views are tracked automatically. To track form submissions and custom events, configure them in Google Analytics or GTM.

### Setting up Google Tag Manager (recommended for advanced tracking)

1. Go to [tagmanager.google.com](https://tagmanager.google.com) → Create a container
2. Copy the **Container ID** (starts with `GTM-`)
3. In Sanity Studio → Site Settings → **Analytics & Tracking** tab → paste into **GTM ID**
4. Publish
5. Configure all your tags (GA4, Facebook Pixel, conversion tracking, etc.) inside GTM

> When GTM is set, the site loads GTM only. GA4 should be configured as a tag inside GTM — don't set both GTM and GA4 IDs simultaneously.

### What's tracked

- All page views (automatic)
- Contact form submissions (configure as events in GA4/GTM)
- Assessment form submissions (configure as events in GA4/GTM)
- Newsletter sign-ups (configure as events in GA4/GTM)

---

## 7. Working with Images

- **Upload**: Drag and drop into any image field, or click to browse
- **Formats**: JPG, PNG, WebP all work. Prefer WebP for smaller file sizes
- **Sizes**: Upload at high resolution — the site automatically optimises and resizes via Sanity's image CDN
- **Hotspot/Crop**: After uploading, click the image to set a focal point. This ensures the important part stays visible at all crop sizes

---

## 8. Publishing & Going Live

### How publishing works

- When you edit content and click **Publish**, the change is saved to Sanity's servers immediately
- The live website refreshes content **every 60 seconds** (ISR — Incremental Static Regeneration)
- So after publishing, your change will appear on the live site **within 1 minute**

### Draft vs Published

- Content you're still editing stays as a **Draft** (shown with a yellow indicator)
- Only **Published** content appears on the live website
- You can safely edit drafts without affecting what visitors see
- When ready, click **Publish** to push the draft live

### Unpublishing

- To remove content from the site, click the **...** menu on a document → **Unpublish**
- The document stays in Sanity (you can re-publish later) but disappears from the website

### Deleting

- To permanently remove content: **...** menu → **Delete**
- This cannot be undone

---

## 9. Content Tips

### Ordering content

Many types have an **Order** field. Lower numbers appear first. Use increments of 10 (10, 20, 30...) so you can insert items between existing ones later.

### Slugs

Slugs determine the URL of a page. Once published:
- `/countries/uk` comes from a country with slug `uk`
- `/blogs/scholarship-guide-2026` comes from a blog with slug `scholarship-guide-2026`

**Do not change a slug after publishing** — it will break any existing links or bookmarks to that page. If you must change it, set up a redirect.

### Rich text (blog body, event descriptions)

The rich text editor supports:
- **Bold**, *italic*, and links
- Headings (H2, H3 — don't use H1, the page title handles that)
- Bullet and numbered lists
- Images (drag and drop into the editor)
- Block quotes

### Stats format

Stats on the homepage hero, trust bar, and About page use three fields:
- **Value**: The number (e.g., `2500`)
- **Suffix**: Text after the number (e.g., `+`)
- **Label**: Description below (e.g., "Students Placed")

This renders as: **2,500+** / Students Placed

The **first stat** in the list also appears as a prominent badge in the homepage hero section, so place your most impressive number first.

### Homepage sections (code-managed)

These sections on the homepage use placeholder content that the development team can update:

| Section | What to update | Where |
|---|---|---|
| **Founder Spotlight** | Founder name, photo, quote, bio, credential tags | `components/home/founder-spotlight.tsx` |
| **About Timeline** | Milestone years, titles, and descriptions | `components/story-timeline.tsx` |

> These are currently hardcoded with placeholder text. Provide the real content to the development team for an update, or they can be migrated to Sanity CMS fields in a future phase.

---

## 10. Common Tasks — Quick Reference

| I want to... | Do this |
|---|---|
| Update the phone number | Site Settings → Phone + Phone Href → Publish |
| Add a new blog post | Blog Post → Create new → Fill fields → Publish |
| Change a counsellor's photo | Team Member → Select person → Replace photo → Publish |
| Add a new country | Country → Create new → Fill all fields → Publish |
| Remove an old event | Event → Select it → ... → Unpublish (or Delete) |
| Reorder the FAQ list | FAQ → Open each item → Change Order numbers → Publish each |
| Switch to an external assessment form | Site Settings → Assessment Form URL → Paste the URL → Publish |
| Upload a new resource/guide | Resource → Create new → Upload file or add URL → Publish |
| Set up Google Analytics | Site Settings → Analytics tab → Paste GA4 ID → Publish |
| Override SEO for a blog post | Blog Post → Select post → SEO tab → Fill title/description → Publish |
| Override SEO for a country | Country → Select country → SEO tab → Fill title/description → Publish |
| Change the default OG image | Site Settings → SEO Defaults tab → Upload new image → Publish |

---

## 11. Troubleshooting

| Problem | Solution |
|---|---|
| Can't log in to Studio | Ask the project admin to invite your email at sanity.io/manage |
| Changes not showing on the site | Wait 60 seconds and hard-refresh (Ctrl+Shift+R). Check that you clicked Publish, not just saved a draft |
| Image looks cropped wrong | Edit the image field → Adjust the hotspot/crop circle |
| Slug "Generate" button greyed out | Fill in the Title field first — the slug auto-generates from it |
| Blog post not showing in the list | Check that it has a Published Date set and the post is Published (not draft) |
| Analytics not tracking | Check Site Settings → Analytics tab. Verify the ID format (GTM-XXXXXXX or G-XXXXXXXXXX). Changes take up to 1 minute to go live. |
| SEO title not showing in Google | Google re-crawls pages on its own schedule. Use Google Search Console to request a re-index for urgent changes. |
| OG image not updating on social media | Social platforms cache images. Use Facebook Sharing Debugger or Twitter Card Validator to force a refresh. |

---

## 12. Who to Contact

| Issue | Contact |
|---|---|
| Content questions | Content lead |
| CMS access / permissions | Project admin (sanity.io/manage) |
| Website bugs or feature requests | Development team |
| Email delivery issues (forms) | Check Resend dashboard (resend.com) |
| Analytics / tracking setup | Development team or marketing lead |
| SEO strategy | Marketing lead |

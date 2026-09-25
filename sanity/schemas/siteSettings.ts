import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: icons['cog'],
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'logos', title: 'Logos & Branding' },
    { name: 'analytics', title: 'Analytics & Tracking' },
    { name: 'seo', title: 'SEO Defaults' },
  ],
  fields: [
    // — General —
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'EduCoach Services',
      group: 'general',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'phoneHref',
      title: 'Phone Link (tel:)',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Country code + number, no spaces (e.g. 919876543210)',
      group: 'general',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Default WhatsApp Message',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'text',
      rows: 2,
      group: 'general',
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 3,
      group: 'general',
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      rows: 3,
      group: 'general',
    }),
    defineField({
      name: 'foundedYear',
      title: 'Founded Year',
      type: 'number',
      group: 'general',
    }),
    defineField({
      name: 'story',
      title: 'Company Story',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item is a paragraph in the About page story section',
      group: 'general',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'number' },
            { name: 'suffix', title: 'Suffix', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: {
            select: { value: 'value', suffix: 'suffix', label: 'label' },
            prepare({ value, suffix, label }) {
              return { title: `${value ?? ''}${suffix ?? ''} — ${label ?? ''}` }
            },
          },
        },
      ],
      group: 'general',
    }),
    defineField({
      name: 'values',
      title: 'Company Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'desc', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
      group: 'general',
    }),
    defineField({
      name: 'assessmentFormUrl',
      title: 'Assessment Form Embed URL',
      type: 'url',
      description: 'External form URL (Typeform, Google Forms, Tally, etc.) displayed in an iframe on the Book Assessment page',
      group: 'general',
    }),
    defineField({
      name: 'notificationEmail',
      title: 'Form Notification Email',
      type: 'string',
      description: 'Email address that receives contact and newsletter form submissions',
      group: 'general',
    }),

    // — Navigation —
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      description: 'Header menu items. Add top-level links or dropdowns with children. Drag to reorder.',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Menu Item',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'href', title: 'URL', type: 'string', validation: (r) => r.required(), description: 'Relative path (e.g. /about) or full URL' }),
            defineField({
              name: 'children',
              title: 'Dropdown Items',
              description: 'Leave empty for a simple link. Add items to create a dropdown menu.',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'navChild',
                  fields: [
                    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
                    defineField({ name: 'href', title: 'URL', type: 'string', validation: (r) => r.required() }),
                    defineField({ name: 'desc', title: 'Description', type: 'string', description: 'Short description shown in the dropdown' }),
                  ],
                  preview: {
                    select: { title: 'title', subtitle: 'href' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'title', href: 'href', children: 'children' },
            prepare({ title, href, children }) {
              const count = children?.length ?? 0
              return {
                title: title ?? '',
                subtitle: count > 0 ? `${href} — ${count} dropdown item${count > 1 ? 's' : ''}` : href,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerNav',
      title: 'Footer Link Columns',
      description: 'Footer navigation organised in columns. Each column has a heading and links.',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({ name: 'heading', title: 'Column Heading', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'footerLink',
                  fields: [
                    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
                    defineField({ name: 'href', title: 'URL', type: 'string', validation: (r) => r.required() }),
                  ],
                  preview: { select: { title: 'title', subtitle: 'href' } },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'heading', links: 'links' },
            prepare({ title, links }) {
              return { title: title ?? '', subtitle: `${links?.length ?? 0} links` }
            },
          },
        },
      ],
    }),

    // — Logos & Branding —
    defineField({
      name: 'headerLogo',
      title: 'Header Logo',
      type: 'image',
      description: 'Logo shown in the site header. Supports PNG, SVG, WebP. Recommended height: 36–48px.',
      options: { hotspot: true, accept: 'image/png,image/svg+xml,image/webp,image/jpeg' },
      group: 'logos',
    }),
    defineField({
      name: 'footerLogo',
      title: 'Footer Logo',
      type: 'image',
      description: 'Logo shown in the site footer. Can be different from header (e.g. white version for dark footer). Supports PNG, SVG, WebP.',
      options: { hotspot: true, accept: 'image/png,image/svg+xml,image/webp,image/jpeg' },
      group: 'logos',
    }),
    defineField({
      name: 'iconLogo',
      title: 'Icon / Favicon',
      type: 'image',
      description: 'Small square icon used as a favicon and app icon. Recommended: 512x512px PNG.',
      options: { hotspot: true, accept: 'image/png,image/svg+xml,image/webp,image/x-icon' },
      group: 'logos',
    }),
    // Keep old fields hidden for backwards compat during migration
    defineField({ name: 'logo', title: 'Site Logo (legacy)', type: 'image', options: { hotspot: true }, hidden: true }),
    defineField({ name: 'logoDark', title: 'Site Logo Dark (legacy)', type: 'image', options: { hotspot: true }, hidden: true }),

    // — Analytics —
    defineField({
      name: 'gtmId',
      title: 'Google Tag Manager ID',
      type: 'string',
      description: 'Container ID (e.g. GTM-XXXXXXX)',
      group: 'analytics',
    }),
    defineField({
      name: 'ga4Id',
      title: 'Google Analytics 4 Measurement ID',
      type: 'string',
      description: 'Measurement ID (e.g. G-XXXXXXXXXX)',
      group: 'analytics',
    }),

    // — SEO —
    defineField({
      name: 'seoTitle',
      title: 'Default SEO Title',
      type: 'string',
      description: 'Fallback title for pages without their own. Keep under 60 characters.',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 3,
      description: 'Fallback meta description for pages without their own. Keep under 160 characters.',
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'Default OG Image',
      type: 'image',
      description: 'Fallback social sharing image (1200x630 recommended)',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})

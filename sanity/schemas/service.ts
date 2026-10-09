import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: icons['rocket'],
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'page', title: 'Page Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required(), group: 'basic' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
      description: 'URL path — e.g. "career-counselling" becomes /services/career-counselling',
      group: 'basic',
    }),
    defineField({ name: 'serviceId', title: 'Anchor ID (legacy)', type: 'string', description: 'Used for hash links on the services listing page', group: 'basic' }),
    defineField({ name: 'icon', title: 'Icon Name', type: 'string', description: 'Lucide icon name, e.g. Compass, Sparkles, GraduationCap', group: 'basic' }),
    defineField({ name: 'shortDesc', title: 'Short Description', type: 'text', rows: 2, group: 'basic' }),
    defineField({ name: 'longDesc', title: 'Long Description (plain)', type: 'text', rows: 5, group: 'basic' }),
    defineField({ name: 'richLongDesc', title: 'Rich Long Description', type: 'richText', description: 'Formatted description — overrides plain text if set', group: 'basic' }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'basic',
    }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number', group: 'basic' }),

    // Page content fields
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, group: 'page' }),
    defineField({ name: 'pageBody', title: 'Page Body', type: 'richText', description: 'Full page content shown on the individual service page', group: 'page' }),
    defineField({
      name: 'highlights',
      title: 'Highlights / Key Points',
      type: 'array',
      description: 'Sidebar highlights shown on the service page',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'value', title: 'Value', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
      group: 'page',
    }),
    defineField({ name: 'ctaTitle', title: 'CTA Title', type: 'string', group: 'page' }),
    defineField({ name: 'ctaSubtitle', title: 'CTA Subtitle', type: 'text', rows: 2, group: 'page' }),

    // SEO
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', group: 'seo' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2, group: 'seo' }),
  ],
  orderings: [{ title: 'Sort Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'shortDesc', media: 'heroImage' },
  },
})

import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'dynamicItem',
  title: 'Dynamic Item',
  type: 'document',
  icon: icons['compose'],
  fields: [
    defineField({
      name: 'page',
      title: 'Parent Page',
      type: 'reference',
      to: [{ type: 'pageContent' }],
      validation: (r) => r.required(),
      description: 'The dynamic page this item belongs to',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'richBody',
      title: 'Rich Body',
      type: 'richText',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'url',
      title: 'External URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'lucide icon name (e.g. "globe", "book-open")',
    }),
    defineField({
      name: 'person',
      title: 'Person Name',
      type: 'string',
      description: 'Student name, author, speaker, etc.',
    }),
    defineField({
      name: 'organisation',
      title: 'Organisation',
      type: 'string',
      description: 'University, company, institution, etc.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'badge',
      title: 'Badge / Label',
      type: 'string',
      description: 'Type label, mode, category badge shown on the card',
    }),
    defineField({
      name: 'stat',
      title: 'Stat / Number',
      type: 'string',
      description: 'A number or stat to display (e.g. "42 universities", "2024")',
    }),
    defineField({
      name: 'quote',
      title: 'Quote / Testimonial',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'Feature List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  orderings: [
    { title: 'Sort Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Date (Newest)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
    { title: 'Title', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'image' },
  },
})

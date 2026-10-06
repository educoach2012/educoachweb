import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'programme',
  title: 'Programme',
  type: 'document',
  icon: icons['rocket'],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 3 }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'key', title: 'Section Key', type: 'string', description: 'Internal identifier (e.g. overview, ideal-for, results)' }),
          defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title', subtitle: 'key' } },
      }],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits / Included Items',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'phases',
      title: 'Phases',
      type: 'array',
      description: 'For Sprint-style phased programmes',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Phase Title', type: 'string' }),
          defineField({ name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({
      name: 'cards',
      title: 'Info Cards',
      description: 'Ideal-for cards, audience cards, etc.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Value', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
    }),
    defineField({
      name: 'levels',
      title: 'Programme Levels',
      description: 'For postgraduate: Masters vs MBA vs PhD comparison',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'duration', title: 'Duration', type: 'string' }),
          defineField({ name: 'countries', title: 'Top Countries', type: 'string' }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      description: 'For undergraduate: planning timeline entries',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'date', title: 'Date / Period', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'string' }),
        ],
        preview: { select: { title: 'date', subtitle: 'desc' } },
      }],
    }),
    defineField({ name: 'ctaLabel', title: 'CTA Button Label', type: 'string' }),
    defineField({
      name: 'crumbs',
      title: 'Breadcrumbs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'href', title: 'URL', type: 'string' }),
        ],
      }],
    }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})

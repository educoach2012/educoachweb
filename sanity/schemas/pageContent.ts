import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  icon: icons['document'],
  fields: [
    defineField({ name: 'slug', title: 'Page Slug', type: 'string', description: 'Route path without leading slash (e.g. about, team, blogs)', validation: (r) => r.required() }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 3 }),
    defineField({
      name: 'sections',
      title: 'Section Headings',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'key', title: 'Section Key', type: 'string', description: 'Internal ID (e.g. journey, values, results)' }),
          defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title', subtitle: 'key' } },
      }],
    }),
    defineField({ name: 'ctaTitle', title: 'CTA Title', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'CTA Subtitle', type: 'text', rows: 2 }),
    defineField({
      name: 'items',
      title: 'Content Items',
      description: 'Generic cards, pillars, or feature items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 3 }),
          defineField({ name: 'detail', title: 'Detail / Sub-text', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title', subtitle: 'icon' } },
      }],
    }),
    defineField({
      name: 'listItems',
      title: 'List Items',
      description: 'Simple text list (comparison bullets, benefits, etc.)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'listItems2',
      title: 'List Items (Second List)',
      description: 'Second comparison list or alternative list',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'listTitle', title: 'List Title', type: 'string' }),
    defineField({ name: 'listTitle2', title: 'Second List Title', type: 'string' }),
    defineField({
      name: 'perks',
      title: 'Perks / Highlights',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({
      name: 'contentParagraphs',
      title: 'Content Paragraphs',
      description: 'Arbitrary text paragraphs for page body content',
      type: 'array',
      of: [{ type: 'text' }],
    }),
  ],
  preview: {
    select: { title: 'slug', subtitle: 'heroTitle' },
    prepare({ title, subtitle }) {
      return { title: `/${title ?? ''}`, subtitle: subtitle ?? '' }
    },
  },
})

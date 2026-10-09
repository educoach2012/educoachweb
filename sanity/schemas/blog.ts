import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  icon: icons['document-text'],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'readingTime', title: 'Reading Time (minutes)', type: 'number' }),
    defineField({ name: 'publishedDate', title: 'Published Date', type: 'date' }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'teamMember' }] }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', description: 'Override for search engines. Keep under 60 characters.', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, description: 'Override meta description. Keep under 160 characters.', group: 'seo' }),
  ],
  groups: [
    { name: 'seo', title: 'SEO' },
  ],
  orderings: [{ title: 'Published', name: 'published', by: [{ field: 'publishedDate', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'heroImage' },
  },
})

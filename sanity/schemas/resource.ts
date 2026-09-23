import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  icon: icons['document'],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'type', title: 'Type', type: 'string', options: { list: ['Guide', 'Tool', 'Checklist', 'Template'] } }),
    defineField({ name: 'file', title: 'File', type: 'file', description: 'Downloadable file (PDF, etc.)' }),
    defineField({ name: 'externalUrl', title: 'External URL', type: 'url', description: 'Alternative to file upload' }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  orderings: [{ title: 'Sort Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'type' },
  },
})

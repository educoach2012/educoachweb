import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'country',
  title: 'Country',
  type: 'document',
  icon: icons['earth-globe'],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'flag', title: 'Flag Emoji', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'universityCount', title: 'University Count Label', type: 'string', description: 'e.g. 150+' }),
    defineField({ name: 'overview', title: 'Overview', type: 'text', rows: 5 }),
    defineField({
      name: 'whyStudyHere',
      title: 'Why Study Here',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'topUniversities',
      title: 'Top Universities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'University Name', type: 'string' },
            { name: 'ranking', title: 'Ranking', type: 'string' },
            { name: 'city', title: 'City', type: 'string' },
          ],
        },
      ],
    }),
    defineField({ name: 'intakes', title: 'Intakes', type: 'string' }),
    defineField({ name: 'averageCost', title: 'Average Cost', type: 'string' }),
    defineField({ name: 'visaInfo', title: 'Visa Information', type: 'text', rows: 4 }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  orderings: [{ title: 'Sort Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'tagline', media: 'flag' },
  },
})

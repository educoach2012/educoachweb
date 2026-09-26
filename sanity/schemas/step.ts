import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'step',
  title: 'How We Work Step',
  type: 'document',
  icon: icons['activity'],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'shortDesc', title: 'Short Description', type: 'string' }),
    defineField({ name: 'longDesc', title: 'Long Description', type: 'text', rows: 4 }),
    defineField({ name: 'order', title: 'Step Number', type: 'number' }),
  ],
  orderings: [{ title: 'Step Number', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'shortDesc', order: 'order' },
    prepare({ title, subtitle, order }) {
      return { title: `${order ?? '?'}. ${title}`, subtitle }
    },
  },
})

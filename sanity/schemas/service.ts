import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: icons['rocket'],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'serviceId', title: 'Anchor ID', type: 'string', description: 'Used for hash links, e.g. "career" for /services#career' }),
    defineField({ name: 'icon', title: 'Icon Name', type: 'string', description: 'Lucide icon name, e.g. Compass, Sparkles, GraduationCap' }),
    defineField({ name: 'shortDesc', title: 'Short Description', type: 'text', rows: 2 }),
    defineField({ name: 'longDesc', title: 'Long Description', type: 'text', rows: 5 }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  orderings: [{ title: 'Sort Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'shortDesc' },
  },
})

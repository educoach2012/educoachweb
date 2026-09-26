import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'acceptance',
  title: 'Acceptance',
  type: 'document',
  icon: icons['checkmark-circle'],
  fields: [
    defineField({ name: 'studentName', title: 'Student Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'university', title: 'University', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'country', title: 'Country', type: 'reference', to: [{ type: 'country' }] }),
    defineField({ name: 'countryName', title: 'Country Name (fallback)', type: 'string' }),
    defineField({ name: 'course', title: 'Course / Programme', type: 'string' }),
    defineField({ name: 'level', title: 'Level', type: 'string', options: { list: ['Undergraduate', 'Postgraduate', 'MBA', 'PhD'] } }),
    defineField({ name: 'scholarship', title: 'Scholarship', type: 'string', description: 'e.g. "Full tuition", "50% scholarship", or leave blank' }),
    defineField({ name: 'year', title: 'Intake Year', type: 'number' }),
    defineField({ name: 'photo', title: 'Student Photo', type: 'image', options: { hotspot: true } }),
  ],
  orderings: [{ title: 'Year', name: 'year', by: [{ field: 'year', direction: 'desc' }] }],
  preview: {
    select: { title: 'studentName', subtitle: 'university' },
  },
})

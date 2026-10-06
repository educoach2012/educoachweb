import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'successStory',
  title: 'Success Story',
  type: 'document',
  icon: icons['star'],
  fields: [
    defineField({ name: 'name', title: 'Student Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'university', title: 'University', type: 'string' }),
    defineField({ name: 'country', title: 'Country', type: 'reference', to: [{ type: 'country' }] }),
    defineField({ name: 'countryName', title: 'Country Name (display)', type: 'string', description: 'Fallback if not using reference' }),
    defineField({ name: 'course', title: 'Course', type: 'string' }),
    defineField({ name: 'scholarship', title: 'Scholarship Amount', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'quote', title: 'Testimonial Quote', type: 'text', rows: 3 }),
    defineField({ name: 'photo', title: 'Student Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'university', media: 'photo' },
  },
})

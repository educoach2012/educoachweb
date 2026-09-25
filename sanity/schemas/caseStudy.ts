import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: icons['case'],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required(), description: 'e.g. "How we helped Priya secure a full scholarship at LSE"' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'studentName', title: 'Student Name', type: 'string' }),
    defineField({ name: 'university', title: 'University', type: 'string' }),
    defineField({ name: 'country', title: 'Country', type: 'reference', to: [{ type: 'country' }] }),
    defineField({ name: 'course', title: 'Course / Programme', type: 'string' }),
    defineField({ name: 'level', title: 'Level', type: 'string', options: { list: ['Undergraduate', 'Postgraduate', 'MBA', 'PhD'] } }),
    defineField({ name: 'scholarshipValue', title: 'Scholarship Value', type: 'string', description: 'e.g. "₹45L (100% tuition)" or "£15,000/year"' }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'challenge', title: 'The Challenge', type: 'text', rows: 4, description: 'What was the student facing before EduCoach?' }),
    defineField({ name: 'approach', title: 'Our Approach', type: 'text', rows: 4, description: 'How did EduCoach help?' }),
    defineField({ name: 'outcome', title: 'The Outcome', type: 'text', rows: 4, description: 'What was the final result?' }),
    defineField({ name: 'quote', title: 'Student Quote', type: 'text', rows: 3 }),
    defineField({ name: 'photo', title: 'Student Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  orderings: [{ title: 'Sort Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'studentName', subtitle: 'university' },
  },
})

import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'university',
  title: 'University',
  type: 'document',
  icon: icons['book'],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'country', title: 'Country', type: 'reference', to: [{ type: 'country' }] }),
    defineField({ name: 'countryName', title: 'Country Name (display)', type: 'string' }),
    defineField({ name: 'ranking', title: 'Ranking', type: 'string' }),
    defineField({ name: 'type', title: 'Type', type: 'string', options: { list: ['Public', 'Private'] } }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'countryName', media: 'logo' },
  },
})

import { defineType, defineField } from 'sanity'
import { icons } from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: icons['cog'],
  fields: [
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoDark',
      title: 'Site Logo (Dark Mode)',
      type: 'image',
      description: 'Optional logo variant for dark backgrounds',
      options: { hotspot: true },
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'EduCoach Services',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'phoneHref',
      title: 'Phone Link (tel:)',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Country code + number, no spaces (e.g. 919876543210)',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Default WhatsApp Message',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'foundedYear',
      title: 'Founded Year',
      type: 'number',
    }),
    defineField({
      name: 'story',
      title: 'Company Story',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item is a paragraph in the About page story section',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'number' },
            { name: 'suffix', title: 'Suffix', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'values',
      title: 'Company Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'desc', title: 'Description', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'assessmentFormUrl',
      title: 'Assessment Form Embed URL',
      type: 'url',
      description: 'External form URL (Typeform, Google Forms, Tally, etc.) displayed in an iframe on the Book Assessment page',
    }),
    defineField({
      name: 'notificationEmail',
      title: 'Form Notification Email',
      type: 'string',
      description: 'Email address that receives contact and newsletter form submissions',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})

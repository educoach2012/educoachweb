import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { apiVersion, dataset, projectId } from './sanity/env'

const siteUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://educoach.in'

function resolvePreviewUrl(doc: Record<string, unknown>): string | undefined {
  const type = doc._type as string
  switch (type) {
    case 'siteSettings':
      return siteUrl
    case 'country': {
      const slug = (doc.slug as { current?: string })?.current
      return slug ? `${siteUrl}/countries/${slug}` : undefined
    }
    case 'blog': {
      const slug = (doc.slug as { current?: string })?.current
      return slug ? `${siteUrl}/blogs/${slug}` : undefined
    }
    case 'caseStudy':
      return `${siteUrl}/case-studies`
    case 'acceptance':
      return `${siteUrl}/acceptances`
    case 'service':
      return `${siteUrl}/services`
    case 'successStory':
      return `${siteUrl}/success-stories`
    case 'teamMember':
      return `${siteUrl}/team`
    case 'event':
      return `${siteUrl}/events`
    case 'university':
      return `${siteUrl}/universities`
    case 'faq':
      return siteUrl
    case 'resource':
      return `${siteUrl}/resources`
    case 'step':
      return `${siteUrl}/how-we-work`
    default:
      return undefined
  }
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'siteSettings'
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    productionUrl: async (prev, context) => {
      const url = resolvePreviewUrl(context.document)
      return url ?? prev
    },
  },
})

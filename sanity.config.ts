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
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'dynamicItem-for-page',
        title: 'Dynamic Item for Page',
        schemaType: 'dynamicItem',
        parameters: [{ name: 'pageId', type: 'string' }],
        value: (params: { pageId: string }) => ({
          page: { _type: 'reference', _ref: params.pageId },
        }),
      },
    ],
  },
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !['siteSettings', 'dynamicItem', 'pageContent'].includes(item.getId() ?? '')
            ),
            S.divider(),
            S.listItem()
              .title('Page Content')
              .icon(() => '📄')
              .child(
                S.documentTypeList('pageContent')
                  .title('Pages')
                  .child((documentId) =>
                    S.list()
                      .title('Page')
                      .items([
                        S.listItem()
                          .title('Page Settings')
                          .icon(() => '⚙️')
                          .child(
                            S.document()
                              .schemaType('pageContent')
                              .documentId(documentId)
                          ),
                        S.listItem()
                          .title('Page Items')
                          .icon(() => '📋')
                          .child(
                            S.documentList()
                              .title('Items')
                              .schemaType('dynamicItem')
                              .filter('_type == "dynamicItem" && page._ref == $pageId')
                              .params({ pageId: documentId })
                              .initialValueTemplates([
                                S.initialValueTemplateItem('dynamicItem-for-page', { pageId: documentId }),
                              ])
                          ),
                      ])
                  )
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

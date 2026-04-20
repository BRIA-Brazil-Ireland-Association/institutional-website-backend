import type { CollectionConfig } from 'payload'
export const InfoHub: CollectionConfig = {
  slug: 'info-hub',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'category', type: 'select', options: ['immigration', 'housing', 'transport', 'education', 'work'], required: true },
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'content', type: 'richText', localized: true, required: true },
    { name: 'attachments', type: 'array', fields: [{ name: 'url', type: 'text' }] }
  ]
}

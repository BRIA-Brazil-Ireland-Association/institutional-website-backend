import type { CollectionConfig } from 'payload'
export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'logo', type: 'text' },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'website', type: 'text' },
    { name: 'category', type: 'select', options: ['official', 'community', 'sponsor', 'education'], required: true }
  ]
}

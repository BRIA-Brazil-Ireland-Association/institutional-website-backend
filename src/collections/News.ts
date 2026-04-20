import type { CollectionConfig } from 'payload'
export const News: CollectionConfig = {
  slug: 'news',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'content', type: 'richText', localized: true, required: true },
    { name: 'featuredImage', type: 'text' },
    { name: 'publishedAt', type: 'date', required: true }
  ]
}

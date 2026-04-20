import type { CollectionConfig } from 'payload'
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'hero', type: 'group', fields: [
      { name: 'eyebrow', type: 'text', localized: true },
      { name: 'headline', type: 'text', localized: true, required: true },
      { name: 'description', type: 'textarea', localized: true },
      { name: 'ctaLabel', type: 'text', localized: true },
      { name: 'ctaHref', type: 'text' }
    ]},
    { name: 'sections', type: 'array', fields: [
      { name: 'title', type: 'text', localized: true, required: true },
      { name: 'content', type: 'richText', localized: true }
    ]}
  ]
}

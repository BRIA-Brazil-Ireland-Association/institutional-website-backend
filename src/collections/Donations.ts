import type { CollectionConfig } from 'payload'
export const Donations: CollectionConfig = {
  slug: 'donations',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'stripeProductId', type: 'text', required: true },
    { name: 'stripePriceId', type: 'text', required: true },
    { name: 'active', type: 'checkbox', defaultValue: true }
  ]
}

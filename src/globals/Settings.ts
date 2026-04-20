import type { GlobalConfig } from 'payload'
export const Settings: GlobalConfig = {
  slug: 'settings',
  fields: [
    { name: 'siteName', type: 'text', localized: true, required: true },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'defaultSeoTitle', type: 'text', localized: true },
    { name: 'defaultSeoDescription', type: 'textarea', localized: true }
  ]
}

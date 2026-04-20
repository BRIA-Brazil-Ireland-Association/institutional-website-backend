import type { GlobalConfig } from 'payload'
export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    { name: 'contactEmail', type: 'email' },
    { name: 'copyright', type: 'text', localized: true },
    { name: 'socialLinks', type: 'array', fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' }
    ]}
  ]
}

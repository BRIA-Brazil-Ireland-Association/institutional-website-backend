export const locales = ['en', 'pt-BR'] as const
export type AppLocale = (typeof locales)[number]
export const defaultLocale: AppLocale = 'en'
export function isLocale(value: string): value is AppLocale { return locales.includes(value as AppLocale) }

export const copy = {
  en: {
    nav: { about: 'About', events: 'Events', partners: 'Partners', infoHub: 'Information Hub', contact: 'Contact' },
    hero: {
      eyebrow: 'Brazil Ireland Association',
      headline: 'Connecting Brazilians to opportunities in Ireland',
      description: 'Institutional support, community events, trusted partners and practical guidance.',
      primaryCta: 'Explore information hub',
      secondaryCta: 'Become a partner'
    }
  },
  'pt-BR': {
    nav: { about: 'Sobre', events: 'Eventos', partners: 'Parceiros', infoHub: 'Central de Informações', contact: 'Contato' },
    hero: {
      eyebrow: 'Brazil Ireland Association',
      headline: 'Conectando brasileiros a oportunidades na Irlanda',
      description: 'Apoio institucional, eventos da comunidade, parceiros confiáveis e orientação prática.',
      primaryCta: 'Explorar hub de informação',
      secondaryCta: 'Tornar-se parceiro'
    }
  }
} as const

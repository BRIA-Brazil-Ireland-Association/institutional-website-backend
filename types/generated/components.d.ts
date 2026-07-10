import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAboutBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_about_banners';
  info: {
    displayName: 'aboutBanner';
    icon: 'bulletList';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', true>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    sectionTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedEventsBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_events_banners';
  info: {
    displayName: 'eventsBanner';
    icon: 'bulletList';
  };
  attributes: {
    banner: Schema.Attribute.Component<'shared.about-banner', false>;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    displayName: 'footer';
    icon: 'bulletList';
  };
  attributes: {
    communityLinks: Schema.Attribute.Component<'shared.link', true>;
    communityTitle: Schema.Attribute.String;
    contactTitle: Schema.Attribute.String;
    informationLinks: Schema.Attribute.Component<'shared.link', true>;
    informationTitle: Schema.Attribute.String;
    navigationLinks: Schema.Attribute.Component<'shared.link', true>;
    navigationTitle: Schema.Attribute.String;
    socialMediaTitle: Schema.Attribute.String;
  };
}

export interface SharedHeroBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_banners';
  info: {
    displayName: 'HeroBanner';
    icon: 'chartBubble';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    kpis: Schema.Attribute.Component<'shared.kpi', true>;
    label: Schema.Attribute.String;
    subtitle: Schema.Attribute.RichText;
    title: Schema.Attribute.RichText;
  };
}

export interface SharedImageLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_links';
  info: {
    displayName: 'imageLink';
    icon: 'crown';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    url: Schema.Attribute.String;
  };
}

export interface SharedKpi extends Struct.ComponentSchema {
  collectionName: 'components_shared_kpis';
  info: {
    displayName: 'Kpi';
    icon: 'check';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
    icon: 'bulletList';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_menu_items';
  info: {
    displayName: 'menuItem';
    icon: 'bulletList';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedParnersBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_parners_banners';
  info: {
    displayName: 'partnersBanner';
    icon: 'bulletList';
  };
  attributes: {
    partners: Schema.Attribute.Component<'shared.image-link', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTeamBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_team_banners';
  info: {
    displayName: 'teamBanner';
    icon: 'bulletList';
  };
  attributes: {
    banner: Schema.Attribute.Component<'shared.about-banner', false>;
    squad: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.about-banner': SharedAboutBanner;
      'shared.events-banner': SharedEventsBanner;
      'shared.footer': SharedFooter;
      'shared.hero-banner': SharedHeroBanner;
      'shared.image-link': SharedImageLink;
      'shared.kpi': SharedKpi;
      'shared.link': SharedLink;
      'shared.media': SharedMedia;
      'shared.menu-item': SharedMenuItem;
      'shared.parners-banner': SharedParnersBanner;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.team-banner': SharedTeamBanner;
    }
  }
}

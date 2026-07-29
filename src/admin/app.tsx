import type { StrapiApp } from '@strapi/strapi/admin';
import { ArrowClockwise } from '@strapi/icons';

export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    app.addMenuLink({
      to: 'revalidate-frontend-cache',
      icon: ArrowClockwise,
      intlLabel: {
        id: 'revalidate-frontend-cache.plugin.name',
        defaultMessage: 'Cache do frontend',
      },
      Component: async () => {
        const { default: RevalidateFrontendCachePage } = await import(
          './pages/RevalidateFrontendCache'
        );
        return RevalidateFrontendCachePage;
      },
      permissions: [],
    });
  },
};

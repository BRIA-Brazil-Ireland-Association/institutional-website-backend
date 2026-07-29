import type { Context } from 'koa';

export default {
  async revalidate(ctx: Context) {
    const targetUrl = process.env.REVALIDADE_FRONTEND_CACHE_ROUTE;

    if (!targetUrl) {
      return ctx.badRequest('REVALIDADE_FRONTEND_CACHE_ROUTE não está configurada no .env.');
    }

    const { default: fetch } = await import('node-fetch');

    try {
      const response = await fetch(targetUrl);

      if (!response.ok) {
        return ctx.internalServerError('O frontend recusou a requisição de revalidação.');
      }

      ctx.body = { ok: true };
    } catch (error) {
      strapi.log.error('Falha ao revalidar o cache do frontend', error);
      return ctx.internalServerError('Não foi possível contatar o frontend para revalidar o cache.');
    }
  },
};

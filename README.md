# BRIA Backend

Backend-only repository for BRIA, prepared as a headless CMS and integration layer for the institutional website.

## Responsibilities
- Payload CMS admin
- REST API and GraphQL API
- localized content in `en` and `pt-BR`
- Stripe checkout and webhook endpoints
- PostgreSQL connection via environment variables
- Vercel-friendly Next.js runtime

## Main routes
- CMS admin: `/cms/admin`
- Payload REST: `/cms/api`
- Payload GraphQL: `/cms/api/graphql`
- GraphQL Playground: `/cms/api/graphql-playground`
- Health check: `/api/health`
- Stripe checkout: `/api/stripe/checkout`
- Stripe products: `/api/stripe/products`
- Stripe webhook: `/api/stripe/webhook`

## Local setup
1. Copy `.env.example` to `.env`
2. Fill in PostgreSQL and Stripe values
3. Install dependencies
4. Start PostgreSQL
5. Run the app

```bash
npm install
docker-compose up -d postgres
npm run dev
```

## Docker
```bash
docker-compose up -d --build
```

## Required env vars
- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SERVER_URL`
- `SERVER_ACTIONS_ALLOWED_ORIGINS`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Example request
```bash
curl "http://localhost:3000/cms/api/pages?where[slug][equals]=home&locale=pt-BR"
```

## Example multilingual response
```json
{
  "docs": [
    {
      "slug": "home",
      "title": "Bem-vindo à BRIA",
      "hero": {
        "headline": "Conectando brasileiros à vida profissional na Irlanda"
      }
    }
  ]
}
```

## Stripe checkout example
```bash
curl -X POST "http://localhost:3000/api/stripe/checkout" \
  -H "Content-Type: application/json" \
  -d '{"priceId":"price_123","quantity":1,"locale":"en"}'
```

## Delivery notes
This repository is the backend counterpart of the BRIA split architecture.
The frontend should live in a separate repository and consume this API through the CMS and Stripe endpoints documented here.

## Status de execução local

| Serviço | URL | Status |
|---|---|---|
| **institutional-website-frontend** | http://localhost:3000 | ✅ 200 (redireciona para `/en`) |
| **institutional-website-backend** | http://localhost:3001 | ✅ `{"ok":true}` em `/api/health` |

### O que foi feito

- Criados os arquivos `.env` para ambos os projetos (backend na **porta 3001**, frontend na **3000**)
- `NEXT_PUBLIC_CMS_URL` do frontend aponta para `http://localhost:3001/cms/api`
- Dependências instaladas com `npm install`
- Ambos iniciados com `npm run dev`

> **Atenção:** O backend precisa do PostgreSQL rodando via Docker. Quando o Docker/Rancher Desktop estiver ativo, execute:
>
> ```bash
> docker compose up -d postgres
> ```
>
> O Payload CMS admin estará disponível em http://localhost:3001/cms/admin após o banco estar acessível.

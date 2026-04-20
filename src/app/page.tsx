const cmsBase = '/cms'

export default function HomePage() {
  return (
    <main className="shell">
      <span className="eyebrow">BRIA Backend</span>
      <h1>CMS, API and Stripe boilerplate</h1>
      <p>
        This repository is the backend-only BRIA foundation. It is responsible for Payload CMS, localized content,
        Stripe integration and server-friendly routes for Vercel deployments.
      </p>

      <div className="grid">
        <section className="card">
          <h2>Key endpoints</h2>
          <div className="link-list">
            <a href={`${cmsBase}/admin`}>Payload admin</a>
            <a href={`${cmsBase}/api/pages?where[slug][equals]=home&locale=en`}>REST example: pages in EN</a>
            <a href={`${cmsBase}/api/pages?where[slug][equals]=home&locale=pt-BR`}>REST example: pages in PT-BR</a>
            <a href={`${cmsBase}/api/graphql`}>GraphQL endpoint</a>
            <a href="/api/health">Health check</a>
          </div>
        </section>

        <section className="card">
          <h2>Environment</h2>
          <ul>
            <li><code className="mono">DATABASE_URL</code> for PostgreSQL</li>
            <li><code className="mono">PAYLOAD_SECRET</code> for CMS/auth security</li>
            <li><code className="mono">NEXT_PUBLIC_SERVER_URL</code> for absolute callback URLs</li>
            <li><code className="mono">STRIPE_SECRET_KEY</code> and <code className="mono">STRIPE_WEBHOOK_SECRET</code></li>
          </ul>
        </section>
      </div>

      <section className="card">
        <h2>Stripe routes</h2>
        <ul>
          <li><code className="mono">POST /api/stripe/checkout</code> creates a checkout session</li>
          <li><code className="mono">GET /api/stripe/products</code> lists active Stripe products</li>
          <li><code className="mono">POST /api/stripe/webhook</code> validates webhook signatures</li>
        </ul>
      </section>
    </main>
  )
}

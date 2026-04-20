const allowedOrigins = (() => {
  const configuredOrigins = (process.env.SERVER_ACTIONS_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
  const serverHost = serverUrl ? new URL(serverUrl).host : null

  return Array.from(new Set(['localhost:3000', ...(serverHost ? [serverHost] : []), ...configuredOrigins]))
})()

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins,
    },
  },
}
export default nextConfig

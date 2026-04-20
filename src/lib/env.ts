function requireEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is required`)
  }

  return value
}

export function getPayloadSecret() {
  return requireEnv('PAYLOAD_SECRET')
}

export function getDatabaseUrl() {
  return requireEnv('DATABASE_URL')
}

export function getServerOrigin() {
  const origin = requireEnv('NEXT_PUBLIC_SERVER_URL')

  return new URL(origin).origin
}

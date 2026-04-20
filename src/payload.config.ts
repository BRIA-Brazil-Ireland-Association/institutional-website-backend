import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Pages } from './collections/Pages'
import { News } from './collections/News'
import { Partners } from './collections/Partners'
import { Events } from './collections/Events'
import { InfoHub } from './collections/InfoHub'
import { Donations } from './collections/Donations'
import { Users } from './collections/Users'
import { Settings } from './globals/Settings'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'
import { getDatabaseUrl, getPayloadSecret } from './lib/env'

export default buildConfig({
  secret: getPayloadSecret(),
  routes: {
    admin: '/cms/admin',
    api: '/cms/api',
    graphQL: '/cms/api/graphql',
    graphQLPlayground: '/cms/api/graphql-playground',
  },
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(process.cwd(), 'src') },
  },
  editor: lexicalEditor(),
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Português (Brasil)', code: 'pt-BR' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  db: postgresAdapter({
    pool: { connectionString: getDatabaseUrl() },
  }),
  collections: [Users, Pages, News, Partners, Events, InfoHub, Donations],
  globals: [Settings, Navigation, Footer],
  graphQL: { disable: false },
  typescript: {
    outputFile: path.resolve(process.cwd(), 'src/payload-types.ts'),
  },
})

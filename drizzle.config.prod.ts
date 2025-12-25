import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({
  path: './.env.prod',
})

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.NUXT_TURSO_CONNECTION_URL!,
    authToken: process.env.NUXT_TURSO_AUTH_TOKEN!,
  },
})

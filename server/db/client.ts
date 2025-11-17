import { resolve } from 'node:path'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const runtimeConfig = useRuntimeConfig()

const connection = import.meta.dev
  ? {
      url: `file:${resolve(process.cwd(), './.data/wordle.db')}`,
    }
  : {
      url: runtimeConfig.TURSO_CONNECTION_URL,
      authToken: runtimeConfig.TURSO_AUTH_TOKEN,
    }

export const db = drizzle(
  {
    connection,
    schema,
  },
)

import { resolve } from 'node:path'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const connection = {
  url: `file:${resolve(process.cwd(), './.data/wordle.db')}`,
}

export const db = drizzle(
  {
    connection,
    schema,
  },
)

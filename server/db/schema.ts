import type { RoomType } from '#shared/schemas'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const rooms = sqliteTable('rooms',
  {
    id: text('id').primaryKey().$defaultFn(() => nanoid()),
    type: text('type', { enum: ['daily', 'private'] as const satisfies RoomType[] })
      .notNull(),
    word: text('word').notNull(),
    createdAt: integer('createdAt', { mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date()),
    expiresAt: integer('expiresAt', { mode: 'timestamp' }),
  },
)

export type InsertRoom = typeof rooms.$inferInsert
export type SelectRoom = typeof rooms.$inferSelect

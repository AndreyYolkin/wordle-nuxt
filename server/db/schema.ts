/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RoomType } from '#shared/schemas'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const rooms = sqliteTable('rooms',
  {
    // id: primary string,
    // type: room type,
    // word: word to guess,
    // createdAt: timestamp,
    // expiresAt: timestamp,
  },
)

export type InsertRoom = typeof rooms.$inferInsert
export type SelectRoom = typeof rooms.$inferSelect

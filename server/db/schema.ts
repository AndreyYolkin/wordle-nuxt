import type { RoomType } from '#shared/schemas'
import type { OAuthProvider } from '~~/shared/types'
import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'
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

export const users = sqliteTable('users',
  {
    id: text('id').primaryKey().$defaultFn(() => nanoid()),
    username: text('username').notNull(),
    displayName: text('displayName'),
    createdAt: integer('createdAt', { mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date()),
  },
)

export const userIdentities = sqliteTable('user_identities',
  {
    id: text('id').primaryKey().$defaultFn(() => nanoid()),
    userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    provider: text('provider', { enum: ['github'] as const satisfies OAuthProvider[] }).notNull(),
    providerId: text('providerId').notNull(),
    createdAt: integer('createdAt', { mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date()),
  },
)

export const userRooms = sqliteTable('user_rooms',
  {
    id: text('id').primaryKey().$defaultFn(() => nanoid()),
    userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    roomId: text('roomId').notNull().references(() => rooms.id, { onDelete: 'cascade' }),
    attempts: integer('attempts').notNull(),
    completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
    createdAt: integer('createdAt', { mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  table => [
    unique('uq_user_rooms_user_room').on(table.userId, table.roomId),
  ],
)

export type InsertRoom = typeof rooms.$inferInsert
export type SelectRoom = typeof rooms.$inferSelect

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertUserIdentity = typeof userIdentities.$inferInsert
export type SelectUserIdentity = typeof userIdentities.$inferSelect

export type InsertUserRoom = typeof userRooms.$inferInsert
export type SelectUserRoom = typeof userRooms.$inferSelect

import type { InsertRoom } from '../schema'
import { and, eq } from 'drizzle-orm'
import { db } from '../client'
import { rooms } from '../schema'

export const roomsRepo = {
  async createRoom (data: InsertRoom) {
    return db.insert(rooms).values(data).returning().get()
  },

  async getRoomById (id: string) {
    return db.select().from(rooms).where(eq(rooms.id, id)).get()
  },

  async findRoomByDate (date: Date) {
    return db
      .select()
      .from(rooms)
      .where(and(eq(rooms.createdAt, date), eq(rooms.type, 'daily')))
      .get()
  },
}

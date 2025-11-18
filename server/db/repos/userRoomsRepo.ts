import type { InsertUserRoom } from '../schema'
import { eq } from 'drizzle-orm'
import { db } from '../client'
import { rooms, userRooms } from '../schema'

export const userRoomsRepo = {
  async createUserRoomStats (data: InsertUserRoom) {
    return db.insert(userRooms).values(data).onConflictDoNothing().returning().get()
  },

  async getUserCompletionStats (userId: string) {
    const stats = await db
      .select({
        completed: userRooms.completed,
        createdAt: rooms.createdAt,
      })
      .from(userRooms)
      .innerJoin(rooms, eq(userRooms.roomId, rooms.id))
      .where(eq(userRooms.userId, userId))
      .all()

    const total = stats.length
    const completed = stats.filter(s => s.completed).length

    return {
      total,
      completed,
      successRate: total > 0 ? (completed / total) * 100 : 0,
    }
  },
}

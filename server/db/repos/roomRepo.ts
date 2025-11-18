/* eslint-disable @typescript-eslint/no-unused-vars */
import type { InsertRoom } from '../schema'
import { and, eq } from 'drizzle-orm'
import { db } from '../client'
import { rooms } from '../schema'

export const roomsRepo = {
  async createRoom (data: InsertRoom) {
    // TODO: insert room into db
  },

  async getRoomById (id: string) {
    // TODO: select room where id = id
  },

  async findRoomByDate (date: Date) {
    // TODO: find a room where createdAt = date and type = 'daily'
  },
}

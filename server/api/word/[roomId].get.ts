import { DateTime } from 'luxon'
import * as v from 'valibot'
import { getRoomSchema } from '~~/shared/schemas'
import { getTZTime } from '~~/shared/utils/timezone'
import { roomsRepo } from '../../db/repos/roomRepo'

export default defineEventHandler(async event => {
  handleCors(event, {
    origin: '*',
  })
  const { roomId } = await getValidatedRouterParams(event, d => v.parse(getRoomSchema, d))

  const room = await roomsRepo.getRoomById(roomId)

  if (!room) {
    throw createError({
      statusCode: 404,
      message: 'Room not found',
    })
  }

  if (room.expiresAt) {
    const now = getTZTime()
    const expiresAt = DateTime.fromJSDate(room.expiresAt)
    if (now.diff(expiresAt).milliseconds > 0) {
      throw createError({
        statusCode: 410,
        message: 'Room has expired',
      })
    }
  }

  return {
    id: room.id,
    word: room.word,
    date: room.createdAt,
    expiresAt: room.expiresAt,
  }
})

import * as v from 'valibot'
import { roomsRepo } from '../../db/repos/roomRepo'

const requestSchema = v.object({
  roomId: v.pipe(v.string()),
})

export default defineEventHandler(async event => {
  handleCors(event, {
    origin: '*',
  })
  const { roomId } = await getValidatedRouterParams(event, d => v.parse(requestSchema, d))

  const room = await roomsRepo.getRoomById(roomId)

  if (!room) {
    throw createError({
      statusCode: 404,
      message: 'Room not found',
    })
  }

  if (room.expiresAt && new Date() > room.expiresAt) {
    throw createError({
      statusCode: 410,
      message: 'Room has expired',
    })
  }

  return {
    id: room.id,
    word: room.word,
    date: room.createdAt,
    expiresAt: room.expiresAt,
  }
})

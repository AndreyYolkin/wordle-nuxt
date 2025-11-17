import type { CreateStats } from '#shared/schemas'
import { createStatsSchema } from '#shared/schemas'
import * as v from 'valibot'

import { userRoomsRepo } from '../db/repos/userRoomsRepo'

export default defineEventHandler(async event => {
  handleCors(event, {
    origin: '*',
  })
  const session = await getUserSession(event)

  if (!session?.user) {
    throw createError({
      statusCode: 401,
    })
  }

  let body: CreateStats
  try {
    body = await readValidatedBody(event, d => v.parse(createStatsSchema, d))
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'INVALID_STATS_DATA',
    })
  }

  try {
    await userRoomsRepo.createUserRoomStats({
      userId: session.user.id,
      roomId: body.roomId,
      attempts: body.attempts,
      completed: body.completed,
    })

    return
  } catch (error) {
    console.error('Failed to save statistics:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'STATS_SAVE_FAILED',
    })
  }
})

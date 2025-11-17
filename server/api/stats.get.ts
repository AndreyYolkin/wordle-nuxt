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

  try {
    const userId = session.user.id

    const stats = await userRoomsRepo.getUserCompletionStats(userId)

    return {
      stats,
    }
  } catch (error) {
    console.error('Failed to fetch statistics:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'STATS_FETCH_FAILED',
    })
  }
})

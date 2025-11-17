import { getSecondsUntilNextDay, getTodaysIndex, getWarsawDateKey } from '#shared/utils/timezone'
import { getWordByIndex } from '#shared/utils/word'
import { roomsRepo } from '../../db/repos/roomRepo'

export default defineCachedEventHandler(async event => {
  handleCors(event, {
    origin: '*',
  })
  const dateKey = getStartOfDay().toJSDate()
  const wordIndex = getTodaysIndex()
  const word = getWordByIndex(wordIndex)

  const todayRoom = await roomsRepo.findRoomByDate(dateKey)

  let roomId = todayRoom?.id

  if (!todayRoom) {
    const tomorrow = getTomorrowStartOfDay().toJSDate()

    const room = (await roomsRepo.createRoom({
      type: 'daily',
      word,
      createdAt: dateKey,
      expiresAt: tomorrow,
    }))

    roomId = room.id
  }

  const data = {
    id: roomId!,
    date: dateKey,
    word,
  }
  const seconds = Math.max(1, getSecondsUntilNextDay())
  setHeader(event, 'Cache-Control', `public, max-age=0, s-maxage=${seconds}`)

  return data
}, {
  getKey: () => `word-${getWarsawDateKey()}`,
  maxAge: 86_400,
})

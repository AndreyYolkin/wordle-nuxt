import { getSecondsUntilNextDay, getTodaysIndex, getWarsawDateKey } from '#shared/utils/timezone'
import { getWordByIndex } from '#shared/utils/word'

export default defineCachedEventHandler(async event => {
  handleCors(event, {
    origin: '*',
  })
  const dateKey = getStartOfDay().toJSDate()
  const wordIndex = getTodaysIndex()
  const word = getWordByIndex(wordIndex)

  // TODO: search for daily room, otherwise create new one

  // TODO: add roomId to data
  const data = {
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

import { createPrivateRoomSchema } from '#shared/schemas'
import { getRandomWord, hasWord, normalizeWord } from '#shared/utils/word'
import { DateTime } from 'luxon'
import * as v from 'valibot'
import { roomsRepo } from '../db/repos/roomRepo'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, d => v.parse(createPrivateRoomSchema, d))

  const { word: customWord, duration } = body

  let finalWord: string

  if (customWord) {
    const normalizedWord = normalizeWord(customWord)

    if (!hasWord(normalizedWord, customWord)) {
      throw createError({
        statusCode: 400,
        message: 'Word is not in the dictionary',
      })
    }

    finalWord = normalizedWord
  } else {
    finalWord = getRandomWord()
  }

  const now = new Date()
  const expiresAt = DateTime.fromJSDate(now).plus({ hours: duration }).toJSDate()

  const room = await roomsRepo.createRoom({
    type: 'private',
    word: finalWord,
    createdAt: now,
    expiresAt,
  })

  return {
    id: room.id,
    word: finalWord,
    expiresAt: room.expiresAt,
    type: 'private',
    shareUrl: `/room/${room.id}`,
  }
})

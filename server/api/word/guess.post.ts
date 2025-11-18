import type { CreateGuess } from '#shared/schemas'
import { DEFAULT_LOCALE } from '#shared/constants'
import { createGuessSchema } from '#shared/schemas'
import { evaluateGuess } from '#shared/utils/guess'
import { hasWord, normalizeWord } from '#shared/utils/word'
import * as v from 'valibot'

export default defineEventHandler(async event => {
  handleCors(event, {
    origin: '*',
  })
  let body: CreateGuess
  try {
    body = await readValidatedBody(event, d => v.parse(createGuessSchema, d))
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'INVALID_GUESS_DATA',
    })
  }

  const { word } = body
  const normalizedWord = normalizeWord(word, DEFAULT_LOCALE)
  const isInDictionary = hasWord(normalizedWord, word)

  if (!isInDictionary) {
    throw createError({
      statusCode: 400,
      statusMessage: 'WORD_NOT_IN_DICTIONARY',
    })
  }

  // TODO retrieve word by roomId
  const wordIndex = getTodaysIndex()
  const dailyWord = getWordByIndex(wordIndex)

  const evaluation = evaluateGuess(normalizedWord, dailyWord)

  return {
    evaluation,
    isValid: evaluation.every(e => e === 'correct'),
  }
})

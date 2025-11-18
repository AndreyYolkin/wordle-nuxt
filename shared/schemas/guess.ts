import * as v from 'valibot'
import { LETTERS_COUNT } from '../constants'

export const createGuessSchema = v.object({
  // TODO add roomId
  word: v.pipe(v.string(), v.length(LETTERS_COUNT)),
})

export type CreateGuess = v.InferOutput<typeof createGuessSchema>

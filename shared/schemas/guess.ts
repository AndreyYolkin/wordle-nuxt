import * as v from 'valibot'
import { LETTERS_COUNT } from '../constants'

export const createGuessSchema = v.object({
  word: v.pipe(v.string(), v.length(LETTERS_COUNT)),
  roomId: v.string(),
})

export type CreateGuess = v.InferOutput<typeof createGuessSchema>

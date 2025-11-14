import { LETTERS_COUNT } from '#shared/constants'
import * as v from 'valibot'

const schema = v.object({
  word: v.optional(v.pipe(v.string(), v.length(LETTERS_COUNT))),
  type: v.optional(v.picklist(['private'], 'private')),
  duration: v.optional(v.pipe(v.number(), v.minValue(1), v.maxValue(24 * 7)), 24),
})

export default defineEventHandler(async event => {})

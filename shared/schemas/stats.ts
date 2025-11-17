import * as v from 'valibot'

export const createStatsSchema = v.object({
  roomId: v.string(),
  attempts: v.number(),
  completed: v.boolean(),
})

export type CreateStats = v.InferInput<typeof createStatsSchema>

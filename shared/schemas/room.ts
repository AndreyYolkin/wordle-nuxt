import * as v from 'valibot'
import { LETTERS_COUNT } from '../constants'

export const roomTypeSchema = v.picklist(['private', 'daily'])

export const createPrivateRoomSchema = v.object({
  word: v.optional(v.pipe(v.string(), v.length(LETTERS_COUNT))),
  type: v.literal('private'),
  duration: v.optional(v.pipe(v.number(), v.minValue(1), v.maxValue(24 * 7)), 24),
})

export const getRoomSchema = v.object({
  roomId: v.string(),
})

export type RoomType = v.InferOutput<typeof roomTypeSchema>

export type CreatePrivateRoom = v.InferInput<typeof createPrivateRoomSchema>

export type GetRoom = v.InferInput<typeof getRoomSchema>

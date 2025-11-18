/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CreateStats } from '#shared/schemas'
import { createStatsSchema } from '#shared/schemas'
import * as v from 'valibot'

import { userRoomsRepo } from '../db/repos/userRoomsRepo'

export default defineEventHandler(async event => {
  handleCors(event, {
    origin: '*',
  })
  const session = await getUserSession(event)
  // TODO: receive stats from body

  // TODO write stats to db
})

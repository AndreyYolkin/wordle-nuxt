/* eslint-disable @typescript-eslint/no-unused-vars */
import { userRoomsRepo } from '../db/repos/userRoomsRepo'

export default defineEventHandler(async event => {
  handleCors(event, {
    origin: '*',
  })
  const session = await getUserSession(event)
  // TODO: get stats from db
})

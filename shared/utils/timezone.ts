import { DateTime } from 'luxon'
import { TIMEZONE } from '../constants'
import { WORD_COUNT } from './word'

export const getWarsawNow = (): DateTime => DateTime.now().setZone(TIMEZONE)

export const getTodaysIndex = (): number => getWarsawNow().startOf('day').toSeconds() % WORD_COUNT

export const getWarsawDateKey = (): Date => getWarsawNow().toJSDate()

export function getTimeUntilNextDay (): { isOver: boolean, hours: number, minutes: number, seconds: number } {
  const now = getWarsawNow()
  const tomorrow = now.plus({ days: 1 }).startOf('day')
  const diff = tomorrow.diff(now, ['hours', 'minutes', 'seconds'])
  const isOver = diff.hours < 0 || diff.minutes < 0 || diff.seconds < 0

  return {
    isOver,
    hours: Math.max(0, Math.floor(diff.hours)),
    minutes: Math.max(0, Math.floor(diff.minutes)),
    seconds: Math.max(0, Math.floor(diff.seconds)),
  }
}

import { DateTime } from 'luxon'
import { TIMEZONE } from '../constants'
import { WORD_COUNT } from './word'

export const getTZTime = (): DateTime => DateTime.now().setZone(TIMEZONE)

export const getStartOfDay = (): DateTime => getTZTime().startOf('day')

export const getTomorrowStartOfDay = (): DateTime => getTZTime().plus({ days: 1 }).startOf('day')

export const getTodaysIndex = (): number => getTZTime().startOf('day').toSeconds() % WORD_COUNT

export const getWarsawDateKey = (): Date => getTZTime().toJSDate()

export function getSecondsUntilNextDay (): number {
  const now = getTZTime()
  const tomorrow = now.plus({ days: 1 }).startOf('day')
  const diff = tomorrow.diff(now, ['seconds'])
  return Math.max(0, Math.floor(diff.seconds))
}

export function getTimeUntilNextDay (): { isOver: boolean, hours: number, minutes: number, seconds: number } {
  const now = getTZTime()
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

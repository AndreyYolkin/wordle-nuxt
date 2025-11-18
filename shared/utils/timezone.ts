import { DateTime } from 'luxon'
import { TIMEZONE } from '../constants'
import { WORD_COUNT } from './word'

export const getTZTime = (): DateTime<true> => DateTime.now().setZone(TIMEZONE) as DateTime<true>

export const getStartOfDay = () => getTZTime().startOf('day')

export const getTomorrowStartOfDay = () => getTZTime().plus({ days: 1 }).startOf('day')

export const getTodaysIndex = () => getTZTime().startOf('day').toSeconds() % WORD_COUNT

export const getWarsawDateKey = () => getTZTime().toJSDate()

export function getSecondsUntilNextDay () {
  const now = getTZTime()
  const tomorrow = now.plus({ days: 1 }).startOf('day')
  const diff = tomorrow.diff(now, ['seconds'])
  return Math.max(0, Math.floor(diff.seconds))
}

export function getTimeUntilNextDay () {
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

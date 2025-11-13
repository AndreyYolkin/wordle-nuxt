import type { TileState } from '#shared/types'
import { DEFAULT_LOCALE } from '../constants'
import { normalizeWord } from './word'

export function evaluateGuess (guess: string, solution: string, locale = DEFAULT_LOCALE): TileState[] {
  const g = normalizeWord(guess, locale)
  const s = normalizeWord(solution, locale)
  const len = s.length
  const res: TileState[] = Array.from({ length: len }, () => 'absent')
  const counts: Record<string, number> = {}
  
  for (let i = 0; i < len; i++) {
    const si = s.charAt(i)
    counts[si] = (counts[si] ?? 0) + 1
  }

  for (let i = 0; i < len; i++) {
    const gi = g.charAt(i)
    const si = s.charAt(i)
    if (gi === si) {
      res[i] = 'correct'
      counts[gi] = (counts[gi] ?? 0) - 1
    }
  }
  
  for (let i = 0; i < len; i++) {
    if (res[i] === 'correct') {continue}
    const gi = g.charAt(i)
    if ((counts[gi] ?? 0) > 0) {
      res[i] = 'present'
      counts[gi] = (counts[gi] ?? 0) - 1
    } else {
      res[i] = 'absent'
    }
  }
  
  return res
}
import type { TileState } from '#shared/types'
import { DEFAULT_LOCALE } from '~~/shared/constants'

export function updateKeyboardState (
  currentKeyboard: Record<string, TileState>,
  guess: string,
  evals: TileState[],
  locale = DEFAULT_LOCALE): Record<string, TileState> {
  const rank = (st: TileState | undefined) =>
    ({ unknown: 0, absent: 1, present: 2, correct: 3 }[st ?? 'unknown'])

  const len = Math.min(guess.length, evals.length)
  const newKeyboard = { ...currentKeyboard }

  for (let i = 0; i < len; i++) {
    const k = guess.charAt(i).toLocaleUpperCase(locale)
    const prev = newKeyboard[k]
    const curr: TileState = evals[i] ?? 'unknown'
    if (!prev || rank(curr) > rank(prev)) {
      newKeyboard[k] = curr
    }
  }

  return newKeyboard
}

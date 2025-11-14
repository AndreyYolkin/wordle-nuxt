import type { GameState, TileState } from '#shared/types'
import { DEFAULT_LOCALE } from '#shared/constants'
import { evaluateGuess } from '#shared/utils/guess'
import { hasWord, isValidRussianLetter, normalizeWord, validateWordLength } from '#shared/utils/word'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { updateKeyboardState } from '../utils/keyboardUtils'

export interface UseWordleGameOptions {
  solution: string
  maxRows?: number
}

export interface UseWordleGameReturn {
  guesses: Ref<string[]>
  evaluations: Ref<TileState[][]>
  current: Ref<string>
  gameState: Ref<GameState>
  keyboard: Ref<Record<string, TileState>>
  cols: number
  rows: number
  submitGuess: () => void
  backspace: () => void
  addLetter: (ch: string) => void
  pressKey: (k: string) => void
}

const locale = DEFAULT_LOCALE

export function useWordleGame (options: UseWordleGameOptions): UseWordleGameReturn {
  const { solution, maxRows = 6 } = options

  const rows = maxRows
  const cols = LETTERS_COUNT

  const guesses = ref<string[]>([])
  const evaluations = ref<TileState[][]>([])
  const current = ref('')
  const gameState = ref<GameState>('playing')
  const keyboard = ref<Record<string, TileState>>({})

  const ERROR_TYPES = {
    INVALID_GAME_STATE: 'Игра завершена',
    INVALID_WORD_LENGTH: `Введите слово из ${cols} букв`,
    WORD_NOT_IN_DICTIONARY: 'Слово не найдено в словаре',
  } as const

  type ErrorType = keyof typeof ERROR_TYPES

  function validateGuess (): { isValid: boolean, error?: ErrorType } {
    if (gameState.value !== 'playing') {
      return { isValid: false, error: 'INVALID_GAME_STATE' }
    }

    if (!validateWordLength(current.value, cols)) {
      return { isValid: false, error: 'INVALID_WORD_LENGTH' }
    }

    if (!isWordInDictionary(current.value)) {
      return { isValid: false, error: 'WORD_NOT_IN_DICTIONARY' }
    }

    return { isValid: true }
  }

  function isWordInDictionary (word: string): boolean {
    const normalizedGuess = normalizeWord(word, locale)
    return hasWord(normalizedGuess, normalizedGuess)
  }
  function handleValidationError (errorKey: ErrorType) {
    current.value = ''
    toast.error(ERROR_TYPES[errorKey], {
      description: errorKey === 'INVALID_GAME_STATE' ? 'Начните новую игру, чтобы продолжить' : 'Попробуйте другое слово',
    })
  }

  function processValidGuess () {
    const evals = evaluateGuess(current.value, solution)
    guesses.value.push(current.value)
    evaluations.value.push(evals)
    keyboard.value = updateKeyboardState(keyboard.value, current.value, evals, locale)

    const normalizedGuess = normalizeWord(current.value, locale)
    const normalizedSolution = normalizeWord(solution, locale)

    if (normalizedGuess === normalizedSolution) {
      gameState.value = 'won'
    } else if (guesses.value.length >= rows) {
      gameState.value = 'lost'
    }
    current.value = ''
  }

  function submitGuess () {
    const validation = validateGuess()
    if (!validation.isValid) {
      if (validation.error) {
        handleValidationError(validation.error)
      }
      return
    }

    processValidGuess()
  }

  function backspace () {
    if (gameState.value !== 'playing') {
      return
    }
    current.value = current.value.slice(0, -1)
  }

  function addLetter (ch: string) {
    if (gameState.value !== 'playing') {
      return
    }
    if (current.value.length >= cols) {
      return
    }
    if (!isValidRussianLetter(ch)) {
      return
    }
    current.value += ch.toLocaleLowerCase(locale)
  }

  function pressKey (k: string) {
    addLetter(k)
  }

  return {
    guesses,
    evaluations,
    current,
    gameState,
    keyboard,
    cols,
    rows,
    submitGuess,
    backspace,
    addLetter,
    pressKey,
  }
}

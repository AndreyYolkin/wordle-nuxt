import type { GameState, TileState } from '#shared/types'
import { DEFAULT_LOCALE, LETTERS_COUNT } from '#shared/constants'
import { hasWord, isValidRussianLetter, validateWordLength } from '#shared/utils/word'
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

  function validateGuess (): { isValid: boolean, error?: ErrorType, evaluation: TileState[] } {
    if (gameState.value !== 'playing') {
      return { isValid: false, error: 'INVALID_GAME_STATE', evaluation: [] }
    }

    if (!validateWordLength(current.value, cols)) {
      return { isValid: false, error: 'INVALID_WORD_LENGTH', evaluation: [] }
    }

    if (!hasWord(current.value, normalizeWord(current.value))) {
      return { isValid: false, error: 'WORD_NOT_IN_DICTIONARY', evaluation: [] }
    }

    const evaluation = evaluateGuess(current.value, solution)

    return { isValid: evaluation.every(t => t === 'correct'), evaluation }
  }

  function handleValidationError (errorKey: ErrorType) {
    current.value = ''
    toast.error(ERROR_TYPES[errorKey], {
      description: errorKey === 'INVALID_GAME_STATE' ? 'Начните новую игру, чтобы продолжить' : 'Попробуйте другое слово',
    })
  }

  async function submitGuess () {
    const validation = await validateGuess()
    if (!validation.isValid && validation.error) {
      handleValidationError(validation.error)
    }

    if (validation.evaluation.length > 0) {
      guesses.value.push(current.value)
      evaluations.value.push(validation.evaluation)
      keyboard.value = updateKeyboardState(keyboard.value, current.value, validation.evaluation, locale)

      if (validation.isValid) {
        gameState.value = 'won'
      } else if (guesses.value.length >= rows) {
        gameState.value = 'lost'
      }
    }
    current.value = ''
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

import WORDS from '#shared/data/words.json'
import { DEFAULT_LOCALE } from '../constants'

export const WORD_COUNT = WORDS.length

export const getWordByIndex = (index: number): string => WORDS.at(index % WORD_COUNT)!

export const hasWord = (word: string, rawWord: string): boolean => WORDS.includes(word) || WORDS.includes(rawWord)

export function normalizeWord (s: string, locale = DEFAULT_LOCALE): string {
  return s.toLocaleLowerCase(locale).replace('ё', 'е')
}

export const isValidRussianLetter = (ch: string): boolean => /^[а-яА-ЯёЁ]$/.test(ch)

export function validateWordLength (word: string, expectedLength: number): boolean {
  return word.length === expectedLength
}

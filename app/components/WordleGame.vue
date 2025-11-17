<template>
  <div class="w-full max-w-3xl mx-auto flex flex-col items-center gap-4">
    <div class="text-center">
      <h1 class="text-2xl font-bold">Wordle</h1>
      <p v-if="dateKey" class="text-sm text-gray-600"><NuxtTime :datetime="dateKey" locale="ru-RU" /></p>
    </div>

    <WordleGrid
      :cols="cols"
      :current="current"
      :evaluations="evaluations"
      :guesses="guesses"
      :rows="rows"
    />

    <WordleKeyboard :keyboard="keyboard" @backspace="backspace" @enter="submitGuess" @key="pressKey" />

    <div v-if="gameState !== 'playing'" class="mt-2 text-center">
      <p v-if="gameState === 'won'" class="text-green-600 font-semibold">Правильно! Вы угадали слово.</p>
      <p v-else class="text-red-600 font-semibold">Попытки закончились. Слово: <span class="uppercase">{{ solution }}</span></p>
      <CountdownTimer />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useWordleGame } from '#imports'
  import { onBeforeUnmount, onMounted } from 'vue'
  import CountdownTimer from './CountdownTimer.vue'
  import WordleGrid from './WordleGrid.vue'
  import WordleKeyboard from './WordleKeyboard.vue'

  const props = defineProps<{ solution: string, dateKey?: string, roomId: string }>()

  const {
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
  } = useWordleGame({ roomId: props.roomId })

  function handleKeydown (e: KeyboardEvent) {
    if (e.ctrlKey || e.metaKey) return
    if (e.key === 'Enter') {
      e.preventDefault()
      submitGuess()
      return
    }
    if (e.key === 'Backspace') {
      e.preventDefault()
      backspace()
      return
    }
    if (e.key.length === 1) addLetter(e.key)
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
</script>

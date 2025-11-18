<template>
  <div class="w-full max-w-3xl mx-auto flex flex-col items-center gap-4">
    <div class="flex w-full items-center justify-between">
      <h1 class="text-xl font-bold">Слово дня</h1>
    </div>

    <WordleGame v-if="data" :date-key="data.date" :solution="data.word" />
  </div>
</template>

<script setup lang="ts">
  const { data } = await useFetch('/api/word/daily')

  useHead({
    title: 'Grawordle | Слово дня',
  })
</script>

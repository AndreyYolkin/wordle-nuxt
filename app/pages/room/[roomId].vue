<template>
  <div class="w-full max-w-3xl mx-auto flex flex-col items-center gap-4">
    <div class="flex w-full items-center justify-between">
      <h1 class="text-xl font-bold">Комната #{{ roomId }}</h1>
    </div>

    <WordleGame v-if="data" :date-key="data.date" :room-id="data.id" :solution="data.word" />
  </div>
</template>

<script setup lang="ts">
  const { params: { roomId } } = useRoute()

  const { data } = await useFetch<{ date: string, id: string, word: string }>(`/api/word/${roomId}`)

  useHead({
    title: `Grawordle | Комната #${roomId}`,
  })
</script>

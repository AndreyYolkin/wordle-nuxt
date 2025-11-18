<template>
  <div class="rounded-md h-8 bg-slate-100 text-slate-600 px-2 flex gap-2 items-center">
    <span class="text-gray-600">Винрейт:</span>
    <span class="font-bold text-orange-600">{{ successRate.toFixed(2) }}%</span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ successRate: number }>()
</script>
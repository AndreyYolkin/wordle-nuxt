<template>
  <div class="text-center text-sm text-gray-600 mt-2">
    <p>Следующее слово через:</p>
    <p class="font-mono font-semibold">{{ formattedTime }}</p>
  </div>
</template>

<script setup lang="ts">
  import { getTimeUntilNextDay } from '#shared/utils/timezone'
  import { computed, onBeforeUnmount, onMounted, onUnmounted, ref, watchEffect } from 'vue'

  const timeUntilNextDay = ref(getTimeUntilNextDay())
  let animationFrameId: number | null = null
  let lastUpdateTime = 0

  const pad = (num: number) => num.toString().padStart(2, '0')

  const formattedTime = computed(() => {
    const { hours, minutes, seconds } = timeUntilNextDay.value
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  })

  function updateTimer(timestamp: number) {
    if (timestamp - lastUpdateTime >= 1000) {
      timeUntilNextDay.value = getTimeUntilNextDay()
      lastUpdateTime = timestamp
      
      if (timeUntilNextDay.value.isOver) {
        clearCountdown()
        return
      }
    }
    
    if (animationFrameId !== null) {
      animationFrameId = requestAnimationFrame(updateTimer)
    }
  }

  function clearCountdown() {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  function startCountdown() {
    if (animationFrameId === null) {
      lastUpdateTime = performance.now()
      animationFrameId = requestAnimationFrame(updateTimer)
    }
  }

  onMounted(() => {
    startCountdown()
  })

  onUnmounted(clearCountdown)
  onBeforeUnmount(clearCountdown)
  
  watchEffect((onCleanup) => {
    onCleanup(clearCountdown)
  })
</script>
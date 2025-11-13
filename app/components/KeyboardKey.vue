<template>
  <button
    class="px-2 py-2 rounded font-semibold uppercase text-sm sm:text-base select-none"
    :class="[widthClass, stateClass]"
    @click="$emit('click')"
  >
    {{ displayLabel }}
  </button>
</template>

<script setup lang="ts">
  import type { TileState } from '#shared/types'
  const props = defineProps<{ label: string, state?: TileState, wide?: boolean }>()
  defineEmits<{ (e: 'click'): void }>()

  const displayLabel = computed(() => props.label.toLocaleUpperCase('ru-RU'))
  const widthClass = computed(() => (props.wide ? 'min-w-16' : 'min-w-10'))
  const stateClass = computed(() => {
    switch (props.state ?? 'unknown') {
      case 'correct': {
        return 'bg-green-500 text-white'
      }
      case 'present': {
        return 'bg-yellow-500 text-white'
      }
      case 'absent': {
        return 'bg-gray-500 text-white'
      }
      default: {
        return 'bg-gray-200 text-gray-900'
      }
    }
  })
</script>

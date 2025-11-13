<template>
  <div
    class="w-12 h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center font-bold uppercase select-none"
    :class="stateClass"
  >
    {{ letter }}
  </div>
</template>

<script setup lang="ts">
  import type { TileState } from '#shared/types'
  const props = defineProps<{ letter: string, state: TileState }>()

  const stateClass = computed(() => {
    switch (props.state) {
      case 'correct': { return 'bg-green-500 text-white border-green-500'
      }
      case 'present': { return 'bg-yellow-500 text-white border-yellow-500'
      }
      case 'absent': { return 'bg-gray-500 text-white border-gray-500'
      }
      default: { return 'border-gray-400 bg-white text-gray-900'
      }
    }
  })
</script>

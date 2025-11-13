<template>
  <div class="flex flex-col gap-2 mt-2">
    <div class="flex gap-2 justify-center">
      <KeyboardKey
        v-for="k in kbRow1"
        :key="k"
        :label="k"
        :state="keyboard[k]"
        @click="emit('key', k)"
      />
    </div>
    <div class="flex gap-2 justify-center">
      <KeyboardKey
        v-for="k in kbRow2"
        :key="k"
        :label="k"
        :state="keyboard[k]"
        @click="emit('key', k)"
      />
    </div>
    <div class="flex gap-2 justify-center">
      <KeyboardKey label="ENTER" wide @click="emit('enter')" />
      <KeyboardKey
        v-for="k in kbRow3"
        :key="k"
        :label="k"
        :state="keyboard[k]"
        @click="emit('key', k)"
      />
      <KeyboardKey label="⌫" wide @click="emit('backspace')" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { TileState } from '#shared/types'
  import KeyboardKey from './KeyboardKey.vue'
  defineProps<{ keyboard: Record<string, TileState> }>()
  const emit = defineEmits<{ (e: 'key', k: string): void; (e: 'enter' | 'backspace'): void }>()

  const kbRow1 = 'ËЙЦУКЕНГШЩЗ'.split('')
  const kbRow2 = 'ФЫВАПРОЛДЖЭ'.split('')
  const kbRow3 = 'ЯЧСМИТЬБЮ'.split('')
</script>
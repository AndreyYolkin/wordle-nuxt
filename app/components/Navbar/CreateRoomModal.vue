<template>
  <div v-if="open" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="handleBackdropClick">
    <div class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
      <NavbarCreateRoom @close="$emit('close')" />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ open: boolean }>()
  const emit = defineEmits<{ close: [] }>()

  function handleBackdropClick (event: MouseEvent) {
    if (event.target === event.currentTarget) {
      emit('close')
    }
  }
</script>

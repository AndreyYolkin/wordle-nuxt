<template>
  <div v-if="open" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
      <CreateRoom @close="$emit('close')" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import CreateRoom from '../CreateRoom.vue'
  defineProps<{ open: boolean }>()
  defineEmits(['close'])
</script>

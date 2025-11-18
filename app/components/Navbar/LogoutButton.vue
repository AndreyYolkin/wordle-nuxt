<template>
  <button
    class="inline-flex items-center px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-medium transition-colors"
    type="button"
    @click="onLogout()"
  >
    Logout
  </button>
</template>

<script setup lang="ts">
  defineProps<{ onLogout: () => void }>()
</script>
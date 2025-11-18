<template>
  <button
    class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black hover:bg-zinc-800 text-white text-sm font-medium shadow transition-colors"
    type="button"
    @click="openInPopup('/github')"
  >
    <svg aria-hidden="true" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.89 3.17 9.04 7.57 10.51.55.1.75-.24.75-.53 0-.26-.01-1.13-.01-2.05-3.08.67-3.73-1.31-3.73-1.31-.5-1.28-1.22-1.62-1.22-1.62-.99-.68.08-.67.08-.67 1.09.08 1.66 1.12 1.66 1.12.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.46-.28-5.05-1.23-5.05-5.47 0-1.21.43-2.2 1.13-2.98-.11-.28-.49-1.42.11-2.95 0 0 .93-.3 3.06 1.14.88-.24 1.82-.36 2.76-.36.94 0 1.88.12 2.76.36 2.13-1.44 3.06-1.14 3.06-1.14.6 1.53.22 2.67.11 2.95.7.78 1.13 1.77 1.13 2.98 0 4.25-2.6 5.18-5.07 5.45.39.34.73 1 .73 2.02 0 1.46-.01 2.64-.01 3 .01.29.2.64.75.53 4.4-1.47 7.57-5.62 7.57-10.51C23.1 5.33 18.27.5 12 .5z" />
    </svg>
    <span>Sign in with GitHub</span>
  </button>
</template>

<script setup lang="ts">
  const { openInPopup } = useUserSession()
</script>
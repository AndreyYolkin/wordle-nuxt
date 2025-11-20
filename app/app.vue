<template>
  <div class="min-h-screen flex flex-col items-center justify-start p-6 gap-6 bg-dark text-white">
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Toaster />
  </div>
</template>

<script setup lang="ts">
  useHead({
    htmlAttrs: {
      class: 'dark',
    },
  })
</script>

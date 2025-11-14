<template>
  <div class="min-h-screen flex flex-col items-center justify-start p-6 gap-6 bg-slate-50 dark:bg-slate-900">
    <NuxtRouteAnnouncer />
    <!-- <Auth /> -->
    <NuxtPage />
    <Toaster />
  </div>
</template>

<script setup lang="ts">
  import { Toaster } from 'vue-sonner'
  import 'vue-sonner/style.css'
</script>

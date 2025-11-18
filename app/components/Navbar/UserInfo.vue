<template>
  <div v-if="user" class="flex items-center px-2 py-1 gap-2 rounded-md bg-slate-100 text-slate-600">
    <div v-if="!user!.avatar" class="size-6 rounded-full bg-slate-300 flex items-center justify-center text-xs font-semibold text-slate-800">
      {{ user.displayName.charAt(0) }}
    </div>
    <img v-else alt="User avatar" class="size-6 rounded-full" :src="user.avatar">
    <span class="text-sm">{{ user.displayName }}</span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ user: any }>()
</script>

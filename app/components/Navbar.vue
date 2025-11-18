<template>
  <div class="flex items-center pa-4 justify-center gap-4 bg-white/90 backdrop-blur-md shadow-md max-w-3xl w-full rounded-xl">
    <!-- TODO: add auth state -->
    <NavbarCreateRoomButton @open="showCreateRoom = true" />
  </div>

  <NavbarCreateRoomModal :open="showCreateRoom" @close="showCreateRoom = false" />
</template>

<script setup lang="ts">
  // TODO: get user session

  const showCreateRoom = ref(false)
</script>

<template>
  <div class="flex items-center pa-4 justify-center gap-4 bg-white/90 backdrop-blur-md shadow-md max-w-3xl w-full rounded-xl">
    <AuthState>
      <NavbarSignInButton v-if="!loggedIn" />
      <template v-else>
        <NavbarUserInfo v-if="user" :user="user" />
        <NavbarLogoutButton :on-logout="clear" />
        <!-- TODO: Add stats -->
      </template>

      <template #placeholder>
        <p>Loading...</p>
      </template>
    </AuthState>
    <NavbarCreateRoomButton @open="showCreateRoom = true" />
  </div>

  <NavbarCreateRoomModal :open="showCreateRoom" @close="showCreateRoom = false" />
</template>

<script setup lang="ts">
  // TODO: fetch stats
  const { user, clear, loggedIn } = useUserSession()

  const showCreateRoom = ref(false)
</script>

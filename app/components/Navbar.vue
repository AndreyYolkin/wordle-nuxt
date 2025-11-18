<template>
  <div class="flex items-center pa-4 justify-center gap-4 bg-white/90 backdrop-blur-md shadow-md max-w-3xl w-full rounded-xl">
    <AuthState>
      <NavbarSignInButton v-if="!loggedIn" />
      <template v-else>
        <NavbarUserInfo v-if="user" :user="user" />
        <NavbarStats v-if="data" :success-rate="data.stats.successRate" />
        <NavbarLogoutButton :on-logout="clear" />
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
  const { user, clear, loggedIn } = useUserSession()
  const { data, refresh } = useFetch('/api/stats', {
    immediate: loggedIn.value,
    watch: false,
  })

  const showCreateRoom = ref(false)

  watch(loggedIn, newValue => {
    if (newValue) {
      refresh()
    }
  })
</script>

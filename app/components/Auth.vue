<template>
  <AuthState>
    <div class="flex items-center pa-4 justify-center gap-4 bg-white/90 backdrop-blur-md shadow-md max-w-3xl w-full rounded-xl">
      <button v-if="!loggedIn" @click="openInPopup('/github')">Login</button>
      <template v-else>
        <div v-if="user" class="flex items-center px-2 py-1 gap-2 rounded-md bg-slate-100 text-slate-600">
          <div v-if="!user!.avatar" class="size-6 rounded-full bg-slate-300 flex items-center justify-center text-xs font-semibold text-slate-800">
            {{ user.displayName.charAt(0) }}
          </div>
          <img v-else alt="User avatar" class="size-6 rounded-full" :src="user.avatar">
          <span class="text-sm">{{ user.displayName }}</span>
        </div>
        <div v-if="data" class="rounded-md bg-slate-100 text-slate-600 px-2 py-1">
          <div class="flex gap-2">
            <div class="flex justify-between gap-2 items-center text-sm">
              <span class="text-gray-600">Винрейт:</span>
              <span class="font-bold text-orange-600">{{ data.stats.successRate.toFixed(2) }}%</span>
            </div>
          </div>
        </div>
        <button
          class="inline-flex items-center px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-medium transition-colors"
          type="button"
          @click="showCreateRoom = true"
        >
          Создать комнату
        </button>
        <button
          class="inline-flex items-center px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-medium transition-colors"
          type="button"
          @click="clear"
        >
          Logout
        </button>
      </template>
    </div>

    <template #placeholder>
      <p>Loading...</p>
    </template>
  </AuthState>

  <div v-if="showCreateRoom" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
      <CreateRoom @close="showCreateRoom = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import CreateRoom from './CreateRoom.vue'

  const { user, openInPopup, clear, loggedIn } = useUserSession()
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

<template>
  <div class="flex flex-col gap-3 p-4 bg-white rounded-lg">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-semibold text-slate-800">Создать комнату</h3>
      <button class="text-gray-400 hover:text-gray-600" @click="$emit('close')">
        ✕
      </button>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium text-slate-600">Тип комнаты</label>
      <div class="flex gap-2">
        <button
          :class="[
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            roomType === 'random'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          ]"
          @click="roomType = 'random'"
        >
          Случайное слово
        </button>
        <button
          :class="[
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            roomType === 'custom'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          ]"
          @click="roomType = 'custom'"
        >
          Свое слово
        </button>
      </div>
    </div>

    <div v-if="roomType === 'custom'" class="flex flex-col gap-2">
      <label class="text-sm font-medium text-slate-600">Ваше слово (5 букв)</label>
      <input
        v-model="customWord"
        class="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        maxlength="5"
        placeholder="Введите слово"
        type="text"
      >
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium text-slate-600">Время жизни комнаты (часы)</label>
      <input
        v-model.number="duration"
        class="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        max="168"
        min="1"
        type="number"
      >
    </div>

    <button
      :class="[
        'px-4 py-2 rounded-md text-sm font-medium transition-colors',
        isCreating || (roomType === 'custom' && (!customWord || customWord.length !== 5))
          ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      ]"
      :disabled="isCreating || (roomType === 'custom' && (!customWord || customWord.length !== 5))"
      @click="createRoom"
    >
      {{ isCreating ? 'Создание...' : 'Создать комнату' }}
    </button>

    <div v-if="createdRoom" class="p-3 bg-green-50 border border-green-200 rounded-md">
      <p class="text-sm text-green-800 font-medium">Комната создана!</p>
      <p class="text-xs text-green-600 mt-1">ID: {{ createdRoom.id }}</p>
      <p class="text-xs text-green-600">Слово: {{ createdRoom.word }}</p>
      <p class="text-xs text-green-600">Действует до: {{ new Date(createdRoom.expiresAt).toLocaleString() }}</p>
      <a class="text-xs text-blue-600 underline mt-2 block" :href="createdRoom.shareUrl">Перейти к комнате</a>
    </div>

    <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-md">
      <p class="text-sm text-red-800 font-medium">Ошибка: {{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const roomType = ref<'random' | 'custom'>('random')
  const customWord = ref('')
  const duration = ref(24)
  const isCreating = ref(false)
  const createdRoom = ref<any>(null)
  const error = ref<string>('')

  defineEmits(['close'])

  async function createRoom () {
    isCreating.value = true
    error.value = ''
    createdRoom.value = null

    try {
      const body: any = {
        type: 'private',
        duration: duration.value,
      }

      if (roomType.value === 'custom' && customWord.value) {
        body.word = customWord.value
      }

      const response = await $fetch('/api/room/create', {
        method: 'POST',
        body,
      })

      createdRoom.value = response
    } catch (error_: any) {
      error.value = error_.data?.message || error_.message || 'Ошибка при создании комнаты'
    } finally {
      isCreating.value = false
    }
  }
</script>

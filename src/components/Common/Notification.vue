<template>
  <div v-if="notification" class="flex items-center justify-between absolute top-4 right-4 z-50 max-w-xs border px-4 py-3 rounded shadow-md w-auto" :class="notification.color === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'" role="alert">
    <span class="whitespace-nowrap">{{ notification.text }}.</span>
    <span class="cursor-pointer" @click="onClick">
      <svg class="fill-current h-6 w-6" :class="notification.color === 'success' ? 'text-green-400' : 'text-red-400'" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <title>Close</title>
        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'

/* Setup */
const notificationStore = useNotificationStore()

/* Computed */
const notification = computed(() => {
  return notificationStore.notification
})

function onClick() {
  notificationStore.resetNotification()
}
</script>

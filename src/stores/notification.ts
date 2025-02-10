import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Notification } from '@/types/types';

export const useNotificationStore = defineStore('notification', () => {

  const notification = ref<Notification | null>(null);

  const setNotification = (data: Notification, time: number) => {
    notification.value = data
    setTimeout(() => {
      notification.value = null
    }, time)
  };

  const resetNotification = () => {
    notification.value = null
  };

  return { notification, setNotification, resetNotification };
});
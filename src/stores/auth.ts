import { defineStore } from 'pinia';
import { ref } from 'vue';
import { UserType } from '@/types/types';
import { users } from '@/data/mockData';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const userType = ref<UserType | null>(null);
  const currentUserId = ref<string | null>(null);

  const localUsers = users;

  const login = (username: string, password: string) => {
    const user = localUsers.find((u) => u.username === username && u.password === password && !u.isDeleted);

    if (user) {
      isLoggedIn.value = true;
      userType.value = user.role;
      currentUserId.value = user.id;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', user.role);
      localStorage.setItem('currentUserId', user.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    isLoggedIn.value = false;
    userType.value = null;
    currentUserId.value = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('currentUserId');
  };

  return { isLoggedIn, userType, login, logout };
});

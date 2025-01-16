import { defineStore } from 'pinia';
import { ref } from 'vue';
import { UserType } from '@/types/types';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const userType = ref<UserType | null>(null); // "P" (Professor) ou "S" (Student)

  const users = [
    { username: 'professor', password: '1234', role: 'P' as UserType },
    { username: 'aluno', password: '1234', role: 'S' as UserType },
  ];

  const login = (username: string, password: string) => {
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      isLoggedIn.value = true;
      userType.value = user.role;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', user.role);
      return true;
    }
    return false;
  };

  const logout = () => {
    isLoggedIn.value = false;
    userType.value = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
  };

  return { isLoggedIn, userType, login, logout };
});

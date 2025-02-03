<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const navLinks = computed(() => [
  { text: 'Home', to: '/', show: !showed() },
  { text: 'About', to: '/about', show: !showed() },
  //{ text: 'Login', to: '/login', show: !auth.isLoggedIn },
  { text: 'Professor', to: '/professor', show: showed('P') },
  { text: 'Cadastrar Professor', to: '/professor/create-professor', show: showed('P') },
  { text: 'Cadastrar Aluno', to: '/professor/create-student', show: showed('P') },
  { text: 'Cadastrar Escola', to: '/professor/create-school', show: showed('P') },
  { text: 'Cadastrar Quiz', to: '/professor/create-quiz', show: showed('P') },
  { text: 'Histórico Quiz', to: '/professor/quiz-historic', show: showed('P') },
  { text: 'Student', to: '/student', show: showed('S') },
  { text: 'Quiz', to: '/quiz', show: showed('S') },
  { text: 'Logout', to: '/', show: showed(), action: 'logout' },
]);

const handleDivClick = (link: { to: string; action?: string }) => {
  if (link.action === 'logout') {
    auth.logout();
  }
  router.push(link.to);
};

const showed = (userType?: string) => {
  if (userType) {
    return auth.isLoggedIn && auth.userType === userType;
  }
  return auth.isLoggedIn;
};

const isActiveLink = (to: string) => {
  return route.path === to;
};
</script>

<template>
  <nav class="w-full text-center mt-8 lg:text-left lg:mt-4 lg:py-4">
    <div
      v-for="(link, index) in navLinks"
      :key="index"
      @click="handleDivClick(link)"
    >
      <div 
        v-if="link.show"
        :class="[
          'px-4 py-2 my-1 text-green-700 transition duration-300 ease-in-out hover:bg-green-100 hover:text-green-900 cursor-pointer rounded-lg',
          isActiveLink(link.to) ? 'bg-green-200 font-semibold' : ''
        ]"
      >
        <span class="text-sm lg:text-base">{{ link.text }}</span>
      </div>
    </div>
  </nav>
</template>
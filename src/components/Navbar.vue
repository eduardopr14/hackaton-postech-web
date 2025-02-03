<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

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
</script>

<template>
  <nav class="w-full text-center mt-8 text-xs lg:text-left lg:mt-4 lg:ml-[-1rem] lg:text-base lg:py-4">
    <div
      v-for="(link, index) in navLinks"
      :key="index"
      class="inline-block border-l border-black first-of-type:border-0"
      @click="handleDivClick(link)"
    >
      <div 
        v-if="link.show"
        class="px-4 text-green-700 transition duration-400 hover:bg-green-100 cursor-pointer" 
      >
        <span>{{ link.text }}</span>
      </div>
    </div>
  </nav>
</template>

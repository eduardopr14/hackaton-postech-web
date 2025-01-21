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

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const auth = useAuthStore();
    const router = useRouter();

    const navLinks = computed(() => [
      { text: 'Home', to: '/', show: true },
      { text: 'About', to: '/about', show: true },
      //{ text: 'Login', to: '/login', show: !auth.isLoggedIn },
      { text: 'Professor', to: '/professor', show: auth.isLoggedIn && auth.userType === 'P' },
      { text: 'Student', to: '/student', show: auth.isLoggedIn && auth.userType === 'S' },
      { text: 'Quiz', to: '/quiz', show: auth.isLoggedIn && auth.userType === 'S' },
      { text: 'Logout', to: '/', show: auth.isLoggedIn, action: 'logout' },
    ]);

    const handleDivClick = (link: { to: string; action?: string }) => {
      if (link.action === 'logout') {
        auth.logout();
      }
      router.push(link.to);
    };

    return { navLinks, handleDivClick };
  },
});
</script>

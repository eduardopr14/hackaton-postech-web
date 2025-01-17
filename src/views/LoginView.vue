<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-2xl w-80">
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <input
            id="username"
            v-model="username"
            placeholder="Username"
            required
            class="mt-1 p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500  focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Password"
            required
            class="mt-1 p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500  focus:outline-none"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:bg-[#2dac5c]"
        >
          Entrar
        </button>
      </form>
      <p v-if="errorMessage" class="mt-4 text-red-500 text-center text-sm">{{ errorMessage }}</p>
      <router-link
        to="/forgot-password"
        class="block mt-4 pb-4 border-b text-sm text-center text-green-500 hover:underline focus:outline-none focus:underline"
      >
        Esqueceu a senha?
      </router-link>
      <router-link
        to="/register"
        class="block mt-6 py-2 px-4 bg-gray-100 text-center text-green-500 font-semibold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:bg-[#d9d9db]"
      >
        Criar conta
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const auth = useAuthStore();
    const router = useRouter();

    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const handleLogin = () => {
      const success = auth.login(username.value, password.value);

      if (success) {
        if (auth.userType === 'P') {
          router.push('/professor');
        } else if (auth.userType === 'S') {
          router.push('/student');
        }
      } else {
        errorMessage.value = 'Usuário ou senha inválidos!';
      }
    };

    return { username, password, handleLogin, errorMessage };
  },
});
</script>

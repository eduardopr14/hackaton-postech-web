<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Usuário:</label>
        <input id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Senha:</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <button type="submit">Entrar</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
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

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="!auth.isLoggedIn" to="/login">Login</router-link>
    <router-link v-if="auth.isLoggedIn && auth.userType === 'P'" to="/professor">
      Professor
    </router-link>
    <router-link v-if="auth.isLoggedIn && auth.userType === 'S'" to="/student">
      Student
    </router-link>
    <button v-if="auth.isLoggedIn" @click="auth.logout">Logout</button>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  setup() {
    const auth = useAuthStore();
    return { auth };
  },
});
</script>

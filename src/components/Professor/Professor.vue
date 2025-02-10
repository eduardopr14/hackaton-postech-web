<script setup lang="ts">
import DefaultView from '@/views/DefaultView.vue';
import { useCrudStore } from '@/stores/crud';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const crudStore = useCrudStore();
const route = useRoute();

const userId = computed(() => crudStore.getUserLogged());
const getUserInfo = (userId: string | null) => {
  return crudStore.getUserInfo(userId);
}

const isBaseRoute = computed(() => route.path === '/professor');
</script>

<template>
  <DefaultView>
    <router-view></router-view>

    <div v-if="isBaseRoute" class="flex justify-center items-center p-6 bg-blue-50 rounded-xl shadow-lg">
      <div class="flex items-center space-x-4">

        <i class="fas fa-smile text-yellow-500 text-4xl animate-bounce"></i>
        
        <p class="text-xl text-gray-800 font-semibold">
          Seja bem-vindo ao Quizzes, 
          <span class="text-blue-500 font-bold">{{ getUserInfo(userId)?.name }}</span>!
        </p>
      </div>
    </div>
  </DefaultView>
</template>

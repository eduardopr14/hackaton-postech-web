<template>
  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col items-center">
      <h1 class="font-bold text-gray-400 text-8xl pt-7">404</h1>

      <h6 class="pt-4 text-center text-primary-400 md:text-2xl">
        Erro
      </h6>

      <p class="mb-8 text-sm text-center text-gray-600">
        Página não existe
      </p>

      <button
        @click="back()"
        class="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:bg-red-600"
      >
        Voltar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

/* Setup */
const router = useRouter()

/* Data */
const modal = ref(true)

/* Methods */
const back = () => {
  router.back()
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

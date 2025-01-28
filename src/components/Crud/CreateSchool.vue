<script setup lang="ts">
import { ref } from 'vue';
import { useCrudStore } from '@/stores/crud';
import { useNotificationStore } from '@/stores/notification';
import { useRouter } from 'vue-router';

const name = ref('');
const numberOfClasses = ref(0);

const crudStore = useCrudStore();
const notificationStore = useNotificationStore();
const router = useRouter();

const handleSubmit = () => {
  if (name.value && numberOfClasses.value > 0) {
    const classIds = Array.from({ length: numberOfClasses.value }, (_, index) => (index + 1).toString());

    const newSchool = crudStore.addSchool(name.value, classIds);
    console.log('Escola criada', newSchool);
    notificationStore.setNotification({ text: "Criado com sucesso", color: "success" }, 3000);
    router.push('/professor');
  } else {
    notificationStore.setNotification({ text: "Por favor, preencha todos os campos", color: "error" }, 3000);
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <p class="text-lg font-semibold">Cadastrar Escola</p>
    <div class="bg-white p-8 rounded-lg w-80">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <input
            v-model="name"
            id="name"
            type="text"
            placeholder="Nome da Escola"
            required
            class="mt-1 p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
          />
        </div>
        
        <div class="mb-4">
          <input
            v-model.number="numberOfClasses"
            id="numberOfClasses"
            type="number"
            min="1"
            placeholder="Número de Classes"
            required
            class="mt-1 p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:bg-[#2dac5c]"
        >
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCrudStore } from '@/stores/crud';
import { useNotificationStore } from '@/stores/notification';
import { useRouter } from 'vue-router';
import BaseSelect from '@/components/Common/BaseSelect.vue';

const username = ref('');
const password = ref('');
const name = ref('');
const schoolIds = ref<string[]>([]);

const crudStore = useCrudStore();
const notificationStore = useNotificationStore();
const router = useRouter();

const handleSubmit = () => {
  if (username.value && password.value && name.value && schoolIds.value.length > 0) {
    const newProfessor = crudStore.createProfessor(username.value, password.value, schoolIds.value, name.value);
    console.log('Professor criado', newProfessor);
    notificationStore.setNotification({ text: "Criado com sucesso", color: "success" }, 3000);
    router.push('/professor');
  } else {
    notificationStore.setNotification({ text: "Por favor, preencha todos os campos", color: "error" }, 3000);
  }
};

const schools = computed(() => crudStore.getSchools());
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <p class="text-lg font-semibold">Cadastrar Professor</p>
    <div class="bg-white p-8 rounded-lg w-80">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <input
            v-model="username"
            id="username"
            type="text"
            placeholder="Nome de Usuário"
            required
            class="mt-1 p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Senha"
            required
            class="mt-1 p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <input
            v-model="name"
            id="name"
            type="text"
            placeholder="Nome"
            required
            class="mt-1 p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
          />
        </div>
        <BaseSelect
          class="mb-4"
          v-model="schoolIds"
          :items="schools"
          item-text="name"
          item-value="schoolId"
          placeholder="Selecione a(s) escola(s)"
          multiple
          useSearch
        />
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

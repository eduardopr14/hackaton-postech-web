<template>
  <div class="flex flex-col items-center lg:items-start">
    <h1 class="font-medium text-3xl lg:text-4xl mb-4">{{ messageStore.mainText }}</h1>
    <h3 class="text-lg text-gray-600">{{ messageStore.subText }}</h3>
  </div>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/stores/messages';

// Acessando a store de mensagens
const messageStore = useMessageStore();

//messageStore.setMainText('Nova Mensagem Principal!')
//messageStore.setSubText('Este é um novo texto secundário.')
</script>

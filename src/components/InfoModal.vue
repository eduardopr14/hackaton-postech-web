<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Histórico do Quiz</h2>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-800 focus:outline-none">
          X
        </button>
      </div>

      <div v-if="quizInfo.info.length > 0">
        <div v-for="(item, index) in paginatedInfo" :key="index">
          <p><strong>{{ item.questionAnswered }}</strong></p>
          <ul class="space-y-2 my-4">
            <li v-for="answer in item.answers" :key="answer.letter" class="flex items-center space-x-2">
              <component
                :is="getSvgComponent(answer.letter)"
                :class="{
                  'border-2': true,
                  'border-green-500': answer.letter === item.correctAnswer, 
                  'border-red-500': answer.letter === item.givenAnswer && answer.letter !== item.correctAnswer, 
                  'border-gray-400': answer.letter !== item.givenAnswer && answer.letter !== item.correctAnswer, 
                  'rounded': true, 
                  'p-[3px]': true, 
                  'transition': true
                }"
                class="w-6 h-6"
                v-if="answer.text"
              />
              <span class="text-sm">{{ answer.text }}</span>
            </li>
          </ul>
          <p><strong>Resposta dada:</strong> {{ item.givenAnswer }}</p>
          <p><strong>Resposta correta:</strong> {{ item.correctAnswer }}</p>
          <p><strong>Acertou?</strong> {{ item.isItRight ? 'Sim' : 'Não' }}</p>
          <hr class="my-4 border-gray-300" />
        </div>

        <div class="flex justify-center mt-4 space-x-4">
          <button
            @click="changePage(-1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Anterior
          </button>
          <span class="text-sm mt-[10px]">Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            @click="changePage(1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-600">Não há informações de histórico para este quiz.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useHistoricStore } from '@/stores/historic';
import IconA from '@/components/icons/IconA.vue';
import IconB from '@/components/icons/IconB.vue';
import IconC from '@/components/icons/IconC.vue';
import IconD from '@/components/icons/IconD.vue';
import IconE from '@/components/icons/IconE.vue';

export default defineComponent({
  props: {
    quizId: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const historic = useHistoricStore();
    const currentPage = ref(1);
    const itemsPerPage = 1;
    const quizInfo = computed(() => historic.getInfo(props.quizId));
    const totalPages = computed(() => Math.ceil(quizInfo.value.info.length / itemsPerPage));

    const paginatedInfo = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      return quizInfo.value.info.slice(startIndex, startIndex + itemsPerPage);
    });

    const changePage = (direction: number) => {
      currentPage.value = Math.min(Math.max(1, currentPage.value + direction), totalPages.value);
    };

    const closeModal = () => {
      emit('close');
    };

    const getSvgComponent = (letter: string) => {
      switch (letter) {
        case 'A':
          return IconA;
        case 'B':
          return IconB;
        case 'C':
          return IconC;
        case 'D':
          return IconD;
        case 'E':
          return IconE;
        default:
          return null;
      }
    };

    return { quizInfo, currentPage, totalPages, paginatedInfo, changePage, closeModal, getSvgComponent };
  }
});
</script>

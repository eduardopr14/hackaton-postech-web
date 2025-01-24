<template>
  <div>
    <div v-if="!quiz.selectedQuizIndex">
      <h1 class="text-2xl font-bold mb-6">Escolha um Quiz</h1>
      <ul class="space-y-4">
        <li
          v-for="quizItem in quiz.quizzes"
          :key="quizItem.id"
          class="p-4 border rounded shadow cursor-pointer hover:bg-gray-100 transition relative"
          @click="!historic.isQuizCompleted(quizItem.id) && quiz.selectQuiz(quizItem.id)"
          :class="{
            'cursor-not-allowed border-blue-400': historic.isQuizCompleted(quizItem.id),
          }"
        >
          <h2 class="text-lg font-semibold">{{ quizItem.title }}</h2>
          <p class="text-sm text-gray-600">{{ quizItem.description }}</p>
          <span v-if="historic.isQuizCompleted(quizItem.id)" class="text-xs text-gray-500">
            Concluído - {{ historic.getQuizScore(quizItem.id) }}
          </span>

          <button
            v-if="historic.isQuizCompleted(quizItem.id)"
            @click="openModal(quizItem.id)"
            class="absolute top-1/2 right-[-33px] transform -translate-y-1/2 p-1 bg-green-600 text-white rounded-r-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </li>
      </ul>
    </div>

    <InfoModal
      v-if="isModalOpen"
      :quizId="selectedQuizId"
      @close="closeModal"
    />
    
    <div v-if="quiz.selectedQuizIndex">
      <Quiz />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuizStore } from '@/stores/quiz';
import { useHistoricStore } from '@/stores/historic';
import Quiz from '@/components/Quiz.vue';
import InfoModal from '@/components/InfoModal.vue';

export default defineComponent({
  components: { Quiz, InfoModal },
  setup() {
    const quiz = useQuizStore();
    const historic = useHistoricStore();
    const isModalOpen = ref(false); 
    const selectedQuizId = ref<number | null>(null);

    const openModal = (quizId: number) => {
      selectedQuizId.value = quizId;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    return { quiz, historic, isModalOpen, selectedQuizId, openModal, closeModal };
  },
});
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuizStore } from '@/stores/quiz';
import { useHistoricStore } from '@/stores/historic';
import { useCrudStore } from '@/stores/crud';
import { QuizItem } from '@/types/types';
import Quiz from '@/components/Quiz/Quiz.vue';
import InfoModal from '@/components/InfoModal.vue';
import QuizList from '@/components/Quiz/QuizList.vue';
import QuizFilterButton from '@/components/Quiz/QuizFilterButton.vue';

const quiz = useQuizStore();
const historic = useHistoricStore();
const crudStore = useCrudStore();
const isModalOpen = ref(false);
const selectedQuizId = ref<number | null>(null);
const selectedFilter = ref('all');

const userId = computed(() => crudStore.getUserLogged());

const getCompletedQuizzesList = (userId: string | null) => {
  return historic.getCompletedQuizzesList(userId);
};

const filterQuizzesByCompletion = (completed: boolean): QuizItem[] => {
  const completedQuizzesList = getCompletedQuizzesList(userId.value);
  return quiz.localQuizzes.filter(localQuiz => 
    completed 
      ? completedQuizzesList.some(completedQuiz => completedQuiz.quizId === localQuiz.id)
      : !completedQuizzesList.some(completedQuiz => completedQuiz.quizId === localQuiz.id)
  );
};

const allQuizzes = computed(() => {
  return quiz.localQuizzes;
});

const openModal = (quizId: number) => {
  selectedQuizId.value = quizId;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const quizListFilter = [
  { filter: 'all', text: 'Todos', quizzes: allQuizzes },
  { filter: 'completed', text: 'Finalizados', quizzes: computed(() => filterQuizzesByCompletion(true)) },
  { filter: 'not-completed', text: 'Não Finalizados', quizzes: computed(() => filterQuizzesByCompletion(false)) }
];
</script>

<template>
  <div>
    <div v-if="!quiz.selectedQuizIndex">
      <h1 class="text-2xl font-bold mb-6">Lista de Quizzes</h1>

      <div class="mb-6 flex justify-center space-x-4">
        <QuizFilterButton 
          v-for="filter in quizListFilter"
          :key="filter.filter"
          :selected-filter="selectedFilter"
          :filter="filter.filter"
          :text="filter.text"
          @click="selectedFilter = filter.filter"
        />
      </div>

        <QuizList 
          v-for="quizList in quizListFilter" 
          :key="quizList.filter"
          :quizzes="quizList.quizzes.value"
          :selected-filter="selectedFilter"
          :filter="quizList.filter"
          @open="openModal"
        />

      <InfoModal
        v-if="isModalOpen"
        :quizId="selectedQuizId"
        @close="closeModal"
      />
    </div>
    
    <div v-if="quiz.selectedQuizIndex">
      <Quiz />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuizStore } from '@/stores/quiz';
import { useHistoricStore } from '@/stores/historic';
import { useCrudStore } from '@/stores/crud';
import { QuizItem } from '@/types/types';
import Quiz from '@/components/Quiz/Quiz.vue';
import InfoModal from '@/components/InfoModal.vue';
import QuizListItem from '@/components/Quiz/QuizListItem.vue';
import QuizFilterButton from '@/components/Quiz/QuizFilterButton.vue';

const quiz = useQuizStore();
const historic = useHistoricStore();
const crudStore = useCrudStore();
const isModalOpen = ref(false);
const selectedQuizId = ref<number | null>(null);
const selectedFilter = ref('all');

const userId = computed(() => {
  return crudStore.getUserLogged()
});

const allQuizzes = computed(() => {
  return quiz.localQuizzes.filter(item => !item.isDeleted);
});

const quizListFilter = [
  { filter: 'all', text: 'Todos', quizzes: allQuizzes },
  { filter: 'completed', text: 'Completos', quizzes: computed(() => filterQuizzesByCompletion(true)) },
  { filter: 'not-completed', text: 'Não Completos', quizzes: computed(() => filterQuizzesByCompletion(false)) }
];

const getCompletedQuizzesListById = (userId: string | null) => {
  return historic.getCompletedQuizzesListById(userId);
};

const filterQuizzesByCompletion = (completed: boolean): QuizItem[] => {
  const completedQuizzesList = getCompletedQuizzesListById(userId.value);
  return allQuizzes.value.filter(localQuiz => 
    completed 
      ? completedQuizzesList.some(completedQuiz => completedQuiz.quizId === localQuiz.id)
      : !completedQuizzesList.some(completedQuiz => completedQuiz.quizId === localQuiz.id)
  );
};

const openModal = (quizId: number) => {
  selectedQuizId.value = quizId;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
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

      <QuizListItem 
        v-for="quizList in quizListFilter" 
        :key="quizList.filter"
        :quizzes="quizList.quizzes.value"
        :selected-filter="selectedFilter"
        :filter="quizList.filter"
        @open="openModal"
      />

      <InfoModal
        v-if="isModalOpen && selectedQuizId"
        :quizId="selectedQuizId"
        @close="closeModal"
      />
    </div>

    <div v-else>
      <Quiz />
    </div>
  </div>
</template>

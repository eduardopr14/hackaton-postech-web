<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuizStore } from '@/stores/quiz';
import QuizList from '@/components/Quiz/QuizList.vue';
import QuizFilterButton from '@/components/Quiz/QuizFilterButton.vue';
import QuizHistoricDetails from '@/components/Quiz/QuizHistoricDetails.vue';

const quizStore = useQuizStore();

const quizId = ref(0);
const selectedFilter = ref('all');
const isModalOpen = ref(false);

const allQuizzes = computed(() => quizStore.localQuizzes);

const quizListFilter = [
  { filter: 'all', text: 'Todos', quizzes: allQuizzes },
  { filter: 'completed', text: 'Finalizados', quizzes: allQuizzes },
  { filter: 'not-completed', text: 'Não Finalizados', quizzes: allQuizzes }
];

const openHistoric = (id: number) => {
  quizId.value = id;
  isModalOpen.value = true;
};

const closeModal = () => {
  quizId.value = 0;
  isModalOpen.value = false;
};
</script>

<template>
  <div>
    <div>
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
        :isProfessorHistoric="true"
        @historic="openHistoric"
      />
    </div>

    <QuizHistoricDetails 
      v-if="quizId && isModalOpen" 
      :quizId="quizId"
      @close="closeModal"
    />
  </div>
</template>

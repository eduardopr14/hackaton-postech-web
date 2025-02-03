<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuizStore } from '@/stores/quiz';
import QuizListItem from '@/components/Quiz/QuizListItem.vue';
import QuizFilterButton from '@/components/Quiz/QuizFilterButton.vue';
import QuizHistoricDetails from '@/components/Quiz/QuizHistoricDetails.vue';
import { QuizItem } from '@/types/types';

const quizStore = useQuizStore();

const quizId = ref(0);
const selectedFilter = ref('not-completed');
const isModalOpen = ref(false);

const allQuizzes = computed(() => {
  return quizStore.localQuizzes.filter(item => !item.isDeleted);
});

const allDeletedQuizzes = computed(() => {
  return quizStore.localQuizzes.filter(item => item.isDeleted);
});

const filterQuizzesByCompletion = (completed: boolean): QuizItem[] => {
  return allQuizzes.value.filter(quiz => 
    completed 
      ? quiz.isCompleted
      : !quiz.isCompleted
  );
};

const quizListFilter = computed(() =>{
  return [
    { filter: 'all', text: 'Todos', quizzes: allQuizzes },
    { filter: 'completed', text: 'Finalizados', quizzes: filterQuizzesByCompletion(true) },
    { filter: 'not-completed', text: 'Não Finalizados', quizzes: filterQuizzesByCompletion(false) },
    { filter: 'deleted', text: 'Deletados', quizzes: allDeletedQuizzes }
  ];
});

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

      <QuizListItem 
        v-for="quizList in quizListFilter" 
        :key="quizList.filter"
        :quizzes="quizList.quizzes instanceof Array ? quizList.quizzes : quizList.quizzes.value"
        :selected-filter="selectedFilter"
        :filter="quizList.filter"
        :is-professor-historic="true"
        :is-complete-visible="quizList.filter != 'completed'"
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

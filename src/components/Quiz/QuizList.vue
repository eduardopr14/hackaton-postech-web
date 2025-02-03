<template>
  <div v-if="selectedFilter === filter">
    <ul class="space-y-4">
      <li
        v-for="quizItem in quizzes"
        :key="quizItem.id"
        class="p-4 border rounded shadow cursor-pointer hover:bg-gray-100 transition relative"
        @click="onClick(quizItem.id)"
        :class="{
          'cursor-not-allowed border-blue-400': historic.isQuizCompletedById(userId, quizItem.id),
        }"
      >
        <h2 class="text-lg font-semibold">{{ quizItem.title }}</h2>
        <p class="text-sm text-gray-600">
          {{ quizItem.description }} 
          -
          {{ quizItem.questions.length }} 
          {{ quizItem.questions.length == 1 ? 'pergunta' : 'perguntas' }}.
        </p>
        <span v-if="historic.isQuizCompletedById(userId, quizItem.id)" class="text-xs text-gray-500">
          Concluído - {{ historic.getQuizScore(userId, quizItem.id) }} ({{ historic.getQuizPercent(userId, quizItem.id) }}).
        </span>

        <button
          v-if="historic.isQuizCompletedById(userId, quizItem.id)"
          @click="openModal(quizItem.id)"
          class="absolute top-1/2 right-[-33px] transform -translate-y-1/2 p-1 bg-green-600 text-white rounded-r-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </li>
      <div 
        v-if="!quizzes.length" 
        class="p-4 border rounded shadow cursor-pointer hover:bg-gray-100 transition relativ text-center"
      >
        Sem resultados
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useQuizStore } from '@/stores/quiz';
import { useHistoricStore } from '@/stores/historic';
import { useCrudStore } from '@/stores/crud';
import { QuizItem } from '@/types/types';

const emit = defineEmits<{
  (event: 'open', value: number): void,
  (event: 'historic', value: number): void
}>();

const quiz = useQuizStore();
const historic = useHistoricStore();
const crudStore = useCrudStore();

const userId = computed(() => crudStore.getUserLogged());

const openModal = (quizId: number) => {
  emit("open", quizId)
};

const onClick = (id: number) => {
  if (!historic.isQuizCompletedById(userId.value, id)) {
    if (!props.isProfessorHistoric) {
      quiz.selectQuiz(id)
    } else {
      emit("historic", id)
    }
  } 
}

const props = defineProps({
  isProfessorHistoric: {
    type: Boolean,
    default: false,
  },
  quizzes: {
    type: Array<QuizItem>,
    required: true
  },
  selectedFilter: {
    type: String,
    required: true
  },
  filter: {
    type: String,
    required: true
  }
});
</script>

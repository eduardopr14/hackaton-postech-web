<template>
  <div v-if="selectedFilter === filter">
    <ul class="space-y-4">
      <li
        v-for="quizItem in quizzes"
        :key="quizItem.id"
        class="p-4 border rounded shadow cursor-pointer hover:bg-gray-100 transition relative"
        :class="{
          'cursor-not-allowed border-blue-400': historic.isQuizCompletedById(userId, quizItem.id),
          'cursor-not-allowed border-green-600': quiz.isQuizCompletedById(quizItem.id),
          'cursor-not-allowed border-red-500': quiz.isQuizDeleteById(quizItem.id),
        }"
        @click="onClick(quizItem.id)"
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
          @click.stop="openModal(quizItem.id)"
          class="absolute top-1/2 right-[-33px] transform -translate-y-1/2 p-1 bg-green-600 text-white rounded-r-md"
        >
          <IconPlus />
        </button>
        <button
          v-if="
            props.isProfessorHistoric && 
            props.isCompleteVisible && 
            !quizItem.isCompleted && 
            !quiz.isQuizDeleteById(quizItem.id)
          "
          @click.stop="completeQuiz(quizItem.id)"
          class="absolute top-[30%] right-[-29px] transform -translate-y-1/2 p-1 bg-[#4DA3FF] text-white rounded-r-md"
        >
          <IconCheck />
        </button>
        <button
          v-if="
            props.isProfessorHistoric && 
            props.isCompleteVisible && 
            !quizItem.isDeleted && 
            !quiz.isQuizCompletedById(quizItem.id)
          "
          @click.stop="deleteQuiz(quizItem.id)"
          class="absolute top-[70%] right-[-29px] transform -translate-y-1/2 p-1 bg-red-500 text-white rounded-r-md"
        >
          <IconTrash />
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
import IconPlus from '../icons/IconPlus.vue';
import IconCheck from '../icons/IconCheck.vue';
import IconTrash from '../icons/IconTrash.vue';

const props = defineProps({
  isProfessorHistoric: {
    type: Boolean,
    default: false,
  },
  isCompleteVisible: {
    type: Boolean,
    default: false,
    required: false
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
  if ((!quiz.isQuizCompletedById(id) && !quiz.isQuizDeleteById(id)) || props.isProfessorHistoric) {
    if (!historic.isQuizCompletedById(userId.value, id)) {
      if (!props.isProfessorHistoric) {
        quiz.selectQuiz(id)
      } else {
        emit("historic", id)
      }
    } 
  }
}

const completeQuiz = (quizId: number) => {
  quiz.completeQuiz(quizId);
  quiz.localQuizzes = [...quiz.localQuizzes];
}

const deleteQuiz = (quizId: number) => {
  quiz.deleteQuiz(quizId);
  quiz.localQuizzes = [...quiz.localQuizzes];
}
</script>

<template>
  <div>
    <div v-if="!quiz.selectedQuizIndex">
      <h1 class="text-2xl font-bold mb-6">Escolha um Quiz</h1>
      <ul class="space-y-4">
        <li
          v-for="quizItem in quiz.quizzes"
          :key="quizItem.id"
          class="p-4 border rounded shadow cursor-pointer hover:bg-gray-100 transition"
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
        </li>
      </ul>
    </div>

    <div v-else>
      <Quiz />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuizStore } from '@/stores/quiz';
import { useHistoricStore } from '@/stores/historic';
import Quiz from '@/components/Quiz.vue';

export default defineComponent({
  components: { Quiz },
  setup() {
    const quiz = useQuizStore();
    const historic = useHistoricStore();

    return { quiz, historic };
  },
});
</script>

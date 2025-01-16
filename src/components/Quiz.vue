<template>
  <div>
    <h1>Quiz</h1>
    <p>{{ currentQuestion.question }}</p>
    <div v-for="(answer, index) in currentQuestion.answers" :key="index">
      <button @click="checkAnswer(answer)">{{ answer }}</button>
    </div>
    <p v-if="isCorrect !== null">
      {{ isCorrect ? 'Resposta Correta!' : 'Resposta Errada!' }}
    </p>
    <button v-if="isCorrect !== null" @click="nextQuestion">Próxima Pergunta</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuizStore } from '@/stores/quiz';

export default defineComponent({
  setup() {
    const quiz = useQuizStore();

    return {
      currentQuestion: quiz.currentQuestion(),
      isCorrect: quiz.isCorrect,
      checkAnswer: quiz.checkAnswer,
      nextQuestion: quiz.nextQuestion,
    };
  },
});
</script>

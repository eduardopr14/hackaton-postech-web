<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuizStore } from '@/stores/quiz';
import QuizItem from './QuizItem.vue';
import IconA from './icons/IconA.vue';
import IconB from './icons/IconB.vue';
import IconC from './icons/IconC.vue';
import IconD from './icons/IconD.vue';
import IconE from './icons/IconE.vue';

const icons = [IconA, IconB, IconC, IconD, IconE];

const quiz = useQuizStore();

const currentQuestion = computed(() => {
  if (!quiz.currentQuestion()) return null;
  return {
    ...quiz.currentQuestion(),
    answers: quiz.currentQuestion().answers.map((answer, index) => ({
      text: answer,
      icon: icons[index % icons.length],
      letter: String.fromCharCode(65 + index),
    })),
  };
});

const showExplanation = ref(false);

const isLocked = ref(false);

const checkAnswer = (answerText: string) => {
  if (isLocked.value) return;
  quiz.checkAnswer(answerText);
  isLocked.value = true;
};

const nextQuestion = () => {
  quiz.nextQuestion();
  isLocked.value = false;
};

const correctLetter = computed(() => {
  if (!currentQuestion.value) return '';
  const correctAnswer = currentQuestion.value.correct;
  const correctOption = currentQuestion.value.answers.find(
    (answer) => answer.text === correctAnswer
  );
  return correctOption ? correctOption.letter : '';
});
</script>

<template>
  <div>
    <p class="text-lg text-gray-700 mb-12 ml-4">{{ currentQuestion?.question }}</p>

    <div class="space-y-8">
      <QuizItem
        v-for="(answer, index) in currentQuestion?.answers"
        :key="index"
      >
        <template #icon>
          <div
            @click="checkAnswer(answer.text)"
            :class="[
              'mr-12 rounded p-2 border-2 cursor-pointer transition',
              isLocked
                ? quiz.isCorrect || quiz.isCorrect === null
                  ? 'border-blue-400 hover:bg-blue-100'
                  : answer.text === currentQuestion?.correct
                  ? 'border-green-500 bg-green-100'
                  : 'border-red-500'
                : 'border-blue-400 hover:bg-blue-100',
            ]"
          >
            <component :is="answer.icon" class="w-6 h-6 text-green-500" />
          </div>
        </template>
        <p class="text-gray-700">{{ answer.text }}</p>
      </QuizItem>
    </div>

    <p
      v-if="quiz.isCorrect !== null"
      class="mt-12 ml-4 text-lg font-semibold"
      :class="{
        'text-green-600': quiz.isCorrect,
        'text-red-600': !quiz.isCorrect,
      }"
    >
      {{ quiz.isCorrect ? 'Resposta Correta!' : `Resposta Errada!` }}
    </p>

    <p
      v-if="!quiz.isCorrect && quiz.isCorrect !== null"
      class="text-gray-700 text-md mt-2 ml-4"
    >
      A alternativa correta era a letra {{ correctLetter }}.
    </p>

    <div class="flex items-center mt-6 ml-4 space-x-4">
      <button
        class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        @click="showExplanation = true"
      >
        Ver Explicação
      </button>

      <button
        v-if="quiz.isCorrect !== null"
        @click="nextQuestion"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Próxima Pergunta
      </button>
    </div>

    <div
      v-if="showExplanation"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 class="text-xl font-semibold mb-4">Explicação</h2>
        <p class="text-gray-700">
          {{ currentQuestion?.explanation || 'Explicação não disponível.' }}
        </p>
        <div class="mt-6 text-right">
          <button
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            @click="showExplanation = false"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

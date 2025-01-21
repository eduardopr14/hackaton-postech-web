<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuizStore } from '@/stores/quiz';
import QuizItem from './QuizItem.vue';
import IconA from './icons/IconA.vue';
import IconB from './icons/IconB.vue';
import IconC from './icons/IconC.vue';
import IconD from './icons/IconD.vue';
import IconE from './icons/IconE.vue';

// Ícones das respostas
const icons = [IconA, IconB, IconC, IconD, IconE];

// Store do quiz
const quiz = useQuizStore();

// Pergunta atual com ícones associados às respostas
const currentQuestion = computed(() => {
  if (!quiz.currentQuestion()) return null;
  return {
    ...quiz.currentQuestion(),
    answers: quiz.currentQuestion().answers.map((answer, index) => ({
      text: answer,
      icon: icons[index % icons.length],
      letter: String.fromCharCode(65 + index), // Gera A, B, C, etc.
    })),
  };
});

// Controle de popup de explicação
const showExplanation = ref(false);

// Bloqueio de interação após resposta
const isLocked = ref(false);

// Método para verificar a resposta e bloquear interação
const checkAnswer = (answerText: string) => {
  if (isLocked.value) return;
  quiz.checkAnswer(answerText);
  isLocked.value = true;
};

// Reabilitar interação ao avançar para próxima pergunta
const nextQuestion = () => {
  quiz.nextQuestion();
  isLocked.value = false;
};

// Localiza a letra correspondente à resposta correta
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
    <!-- Pergunta -->
    <p class="text-lg text-gray-700 mb-12 ml-4">{{ currentQuestion?.question }}</p>

    <!-- Respostas -->
    <div class="space-y-8">
      <QuizItem
        v-for="(answer, index) in currentQuestion?.answers"
        :key="index"
      >
        <template #icon>
          <!-- Ícone interativo com destaque baseado no estado -->
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

    <!-- Mensagem de feedback -->
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

    <!-- Indicação da resposta correta -->
    <p
      v-if="!quiz.isCorrect && quiz.isCorrect !== null"
      class="text-gray-700 text-md mt-2 ml-4"
    >
      A alternativa correta era a letra {{ correctLetter }}.
    </p>

    <!-- Botões de próxima pergunta e explicação -->
    <div class="flex items-center mt-6 ml-4 space-x-4">
      <!-- Botão de explicação -->
      <button
        class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        @click="showExplanation = true"
      >
        Ver Explicação
      </button>

      <!-- Botão de próxima pergunta -->
      <button
        v-if="quiz.isCorrect !== null"
        @click="nextQuestion"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Próxima Pergunta
      </button>
    </div>

    <!-- Popup de explicação -->
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

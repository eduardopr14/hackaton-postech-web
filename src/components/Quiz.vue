<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuizStore } from '@/stores/quiz';
import { useHistoricStore } from '@/stores/historic';
import QuizItem from './QuizItem.vue';
import IconA from './icons/IconA.vue';
import IconB from './icons/IconB.vue';
import IconC from './icons/IconC.vue';
import IconD from './icons/IconD.vue';
import IconE from './icons/IconE.vue';

const icons = [IconA, IconB, IconC, IconD, IconE];
const quiz = useQuizStore();
const historic = useHistoricStore();

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
const showFeedback = ref(false);
const isLocked = ref(false);

const sendAnswer = (answerText: string, currentQuestion: any) => {
  checkAnswer(answerText)
  saveHistoric(answerText, currentQuestion)
};

const checkAnswer = (answerText: string) => {
  if (isLocked.value) return;
  quiz.checkAnswer(answerText);
  isLocked.value = true;
};

const saveHistoric = (answerText: string, currentQuestion: any) => {
  const answers = currentQuestion.answers.map((item: { text: any; letter: any; }) => ({
    text: item.text,
    letter: item.letter,
  }));
  const correctAnswer = currentQuestion.answers.find((answer: { text: any; }) => answer.text === currentQuestion.correct);
  const correctLetter = correctAnswer ? correctAnswer.letter : undefined;
  const givenAnswerLetter = currentQuestion.answers.find((answer: { text: any; }) => answer.text === answerText).letter;
  const isItRight = answerText == currentQuestion.correct;
  historic.addInfoCompletedQuiz(
  quiz.currentQuiz()?.id || 0, 
    [
      {
        questionId: currentQuestion.id,
        questionAnswered: currentQuestion.question,
        answers: answers,
        givenAnswer: givenAnswerLetter,
        correctAnswer: correctLetter,
        isItRight: isItRight
      }
    ]
  );
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

const saveToHistory = () => {
  historic.addCompletedQuiz(
    quiz.currentQuiz()?.id || 0,
    quiz.correctAnswers,
    quiz.totalQuestions
  );
};

const onFinish = () => {
  saveToHistory();
  quiz.selectQuiz(null); 
  showFeedback.value = false; 
}
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
          @click="sendAnswer(answer.text, currentQuestion)"
          :class="[
            'mr-12 rounded p-2 border-2 cursor-pointer transition',
            isLocked
              ? answer.text === currentQuestion?.correct
                ? 'border-green-500 bg-green-100'
                : quiz.isCorrect === false
                  ? 'border-red-500 bg-red-100'
                  : 'border-blue-400 hover:bg-blue-100'
              : 'border-blue-400 hover:bg-blue-100'
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
        v-if="!quiz.isQuizCompleted && quiz.isCorrect !== null"
        class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        @click="showExplanation = true"
      >
        Ver Explicação
      </button>

      <button
        v-if="!quiz.isQuizCompleted && quiz.isCorrect !== null"
        @click="nextQuestion"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Próxima Pergunta
      </button>

      <button
        v-if="quiz.isQuizCompleted"
        @click="showFeedback = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Mostrar Feedback
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

    <div
      v-if="showFeedback"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 class="text-xl font-semibold mb-4">Feedback do Quiz</h2>
        <p class="text-gray-700">Parabéns por concluir o quiz!</p>
        <p class="text-gray-700 mt-4">Você acertou {{ quiz.correctAnswers }} de {{ quiz.totalQuestions }} perguntas.</p>
        <div class="mt-6 text-right">
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            @click="onFinish()"
          >
            Voltar para a lista de quizzes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

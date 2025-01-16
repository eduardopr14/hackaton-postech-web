import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useQuizStore = defineStore('quiz', () => {
  const questions = ref([
    {
      question: 'Qual é a capital da França?',
      answers: ['Paris', 'Londres', 'Berlim', 'Roma'],
      correct: 'Paris',
    },
    {
      question: 'Qual é 2 + 2?',
      answers: ['3', '4', '5', '6'],
      correct: '4',
    },
  ]);

  const currentQuestionIndex = ref(0);
  const isCorrect = ref<boolean | null>(null);

  const currentQuestion = () => questions.value[currentQuestionIndex.value];

  const checkAnswer = (answer: string) => {
    isCorrect.value = answer === currentQuestion().correct;
  };

  const nextQuestion = () => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++;
      isCorrect.value = null;
    } else {
      alert('Quiz concluído!');
    }
  };

  return { questions, currentQuestionIndex, currentQuestion, isCorrect, checkAnswer, nextQuestion };
});

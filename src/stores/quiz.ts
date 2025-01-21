import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useQuizStore = defineStore('quiz', () => {
  const questions = ref([
    {
      question: 'Qual é a capital da França?',
      answers: ['Paris', 'Londres', 'Berlim', 'Roma'],
      correct: 'Paris',
      explanation: 'Paris é a capital da França, conhecida como a Cidade Luz.',
    },
    {
      question: 'Qual é o maior planeta do sistema solar?',
      answers: ['Terra', 'Marte', 'Júpiter', 'Saturno'],
      correct: 'Júpiter',
      explanation: 'Júpiter é o maior planeta, com diâmetro de 139.820 km.',
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

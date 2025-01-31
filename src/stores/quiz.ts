import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { quizzes } from '@/data/mockDataQuiz';

export const useQuizStore = defineStore('quiz', () => {
  const localQuizzes = quizzes;

  const selectedQuizIndex = ref<number | null>(null);
  const currentQuestionIndex = ref(0);
  const isCorrect = ref<boolean | null>(null);
  const isQuizCompleted = ref(false);
  const correctAnswers = ref(0);

  const totalQuestions = computed(() => {
    const quiz = currentQuiz();
    return quiz ? quiz.questions.length : 0;
  });

  const selectQuiz = (index: number | null) => {
    selectedQuizIndex.value = index;
    currentQuestionIndex.value = 0;
    isCorrect.value = null;
    isQuizCompleted.value = false;
    correctAnswers.value = 0;
  };

  const currentQuiz = () => {
    return selectedQuizIndex.value !== null ? localQuizzes[selectedQuizIndex.value - 1] : null;
  };

  const currentQuestion = () => {
    const quiz = currentQuiz();
    return quiz ? quiz.questions[currentQuestionIndex.value] : null;
  };

  const checkAnswer = (answer: string) => {
    if (currentQuestion()) {
      isCorrect.value = answer === currentQuestion()!.correct;
      if (isCorrect.value) {
        correctAnswers.value++;
      }
    }
  };

  const nextQuestion = () => {
    const quiz = currentQuiz();
    if (quiz && currentQuestionIndex.value < quiz.questions.length - 1) {
      currentQuestionIndex.value++;
      isCorrect.value = null;
    } else {
      isQuizCompleted.value = true;
    }
  };

  return {
    localQuizzes,
    selectedQuizIndex,
    currentQuestionIndex,
    isCorrect,
    selectQuiz,
    currentQuiz,
    currentQuestion,
    checkAnswer,
    nextQuestion,
    isQuizCompleted,
    totalQuestions,
    correctAnswers,
  };
});

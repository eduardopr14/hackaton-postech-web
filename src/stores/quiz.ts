import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useQuizStore = defineStore('quiz', () => {
  const quizzes = ref([
    {
      id: 1,
      title: 'Aula de História',
      description: 'Eventos históricos importantes',
      questions: [
        {
          id: 1,
          question: 'Qual é a capital da França?',
          answers: ['Paris', 'Londres', 'Berlim', 'Roma'],
          correct: 'Paris',
          explanation: 'Paris é a capital da França, conhecida como a Cidade Luz.',
        },
        {
          id: 2,
          question: 'Em que ano começou a Primeira Guerra Mundial?',
          answers: ['1914', '1939', '1945', '1920'],
          correct: '1914',
          explanation: 'A Primeira Guerra Mundial começou em 1914 e terminou em 1918.',
        },
      ],
    },
    {
      id: 2,
      title: 'Aula de Química',
      description: 'Conceitos básicos de química',
      questions: [
        {
          id: 1,
          question: 'Qual é o símbolo químico da água?',
          answers: ['H2O', 'O2', 'CO2', 'NaCl', "X"],
          correct: 'H2O',
          explanation: 'A água é representada pela fórmula H2O.',
        },
      ],
    },
    {
      id: 3,
      title: 'Aula de Português',
      description: 'Gramática e ortografia',
      questions: [
        {
          id: 1,
          question: 'Qual a palavra correta: "viajem" ou "viagem"?',
          answers: ['Viajem', 'Viagem'],
          correct: 'Viagem',
          explanation: 'Viagem é o substantivo; viajem é a forma verbal.',
        },
      ],
    },
  ]);

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
    return selectedQuizIndex.value !== null ? quizzes.value[selectedQuizIndex.value - 1] : null;
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
    quizzes,
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

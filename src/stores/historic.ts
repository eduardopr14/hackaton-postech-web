import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHistoricStore = defineStore('historic', () => {
  const completedQuizzes = ref<any[]>([]);
  const infoCompletedQuizzes = ref<any[]>([]);

  const addCompletedQuiz = (quizId: number, correctAnswers: number, totalQuestions: number) => {
    const quizRecord = {
      quizId,
      correctAnswers,
      totalQuestions,
      isCompleted: true,
    };
    completedQuizzes.value.push(quizRecord);
  };

  const addInfoCompletedQuiz = (
    quizId: number,
    info: {
      questionId: number;
      questionAnswered: string;
      answers: { text: string; letter: string }[];
      givenAnswer: string;
      correctAnswer: string;
      isItRight: boolean;
    }[]
  ) => {
    const existingQuiz = getInfo(quizId);

    if (existingQuiz) {
      existingQuiz.info.push(...info);
    } else {
      const quizRecord = {
        quizId,
        info
      };
      infoCompletedQuizzes.value.push(quizRecord);
    }
  };

  const getCompletedQuizzes = () => {
    return completedQuizzes.value;
  };

  const isQuizCompleted = (quizId: number) => {
    return completedQuizzes.value.some((quiz) => quiz.quizId === quizId && quiz.isCompleted);
  };

  const getQuizScore = (quizId: number) => {
    const quizResult = completedQuizzes.value.find((quiz) => quiz.quizId === quizId && quiz.isCompleted);
    return quizResult ? `${quizResult.correctAnswers} acerto(s) de ${quizResult.totalQuestions}` : '0 de 0';
  };

  const getQuizPercent = (quizId: number) => {
    const quizResult = completedQuizzes.value.find((quiz) => quiz.quizId === quizId && quiz.isCompleted);
    return `${quizResult.correctAnswers / quizResult.totalQuestions * 100}%`;
  };

  const getInfo = (quizId: number) => {
    return infoCompletedQuizzes.value.find((quiz) => quiz.quizId === quizId);
  };

  return {
    completedQuizzes,
    addCompletedQuiz,
    addInfoCompletedQuiz,
    getCompletedQuizzes,
    isQuizCompleted,
    getQuizScore,
    getQuizPercent,
    getInfo,
  };
});

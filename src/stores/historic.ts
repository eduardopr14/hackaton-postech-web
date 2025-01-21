import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHistoricStore = defineStore('historic', () => {
  const completedQuizzes = ref<any[]>([]);

  const addCompletedQuiz = (quizId: number, correctAnswers: number, totalQuestions: number) => {
    const quizRecord = {
      quizId,
      correctAnswers,
      totalQuestions,
      isCompleted: true,
    };
    completedQuizzes.value.push(quizRecord);
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

  return {
    completedQuizzes,
    addCompletedQuiz,
    getCompletedQuizzes,
    isQuizCompleted,
    getQuizScore,
  };
});

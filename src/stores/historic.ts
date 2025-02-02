import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Answer, InfoRecord, QuizRecord } from '@/types/types';
import { useCrudStore } from '@/stores/crud';

export const useHistoricStore = defineStore('historic', () => {
  const crudStore = useCrudStore();
  const completedQuizzes = ref<QuizRecord[]>([]);
  const infoCompletedQuizzes = ref<InfoRecord[]>([]);

  const addCompletedQuiz = (userId: string | null, quizId: number, correctAnswers: number, totalQuestions: number) => {
    const result = crudStore.getLocalStudentById(userId);
    const quizRecord: QuizRecord = {
      user: result,
      quizId,
      correctAnswers,
      totalQuestions,
      isCompleted: true,
    };
    completedQuizzes.value.push(quizRecord);
  };

  const addInfoCompletedQuiz = (
    userId: string | null,
    quizId: number,
    info: {
      questionId: number;
      questionAnswered: string;
      answers: Answer[];
      givenAnswer: string;
      correctAnswer: string;
      isItRight: boolean;
    }[]
  ) => {
    const existingQuiz = getInfo(userId, quizId);

    if (existingQuiz) {
      existingQuiz.info.push(...info);
    } else {
      const result = crudStore.getLocalStudentById(userId);
      const quizRecord: InfoRecord = {
        user: result,
        quizId,
        info
      };
      infoCompletedQuizzes.value.push(quizRecord);
    }
  };

  const getCompletedQuizzesList = (userId: string | null) => {
    return completedQuizzes.value.filter((quiz) => quiz.user?.userId === userId && quiz.isCompleted);
  };

  const getCompletedQuizzes = (userId: string | null) => {
    return completedQuizzes.value.filter(quiz => quiz.user?.userId === userId);
  };

  const isQuizCompleted = (userId: string | null, quizId: number) => {
    return completedQuizzes.value.some((quiz) => quiz.user?.userId === userId && quiz.quizId === quizId && quiz.isCompleted);
  };

  const getQuizScore = (userId: string | null, quizId: number) => {
    const quizResult = completedQuizzes.value.find((quiz) => quiz.user?.userId === userId && quiz.quizId === quizId && quiz.isCompleted);
    return quizResult && `${quizResult.correctAnswers} acerto(s) de ${quizResult.totalQuestions}`;
  };

  const getQuizPercent = (userId: string | null, quizId: number) => {
    const quizResult = completedQuizzes.value.find((quiz) => quiz.user?.userId === userId && quiz.quizId === quizId && quiz.isCompleted);
    return quizResult && `${quizResult.correctAnswers / quizResult.totalQuestions * 100}%`;
  };

  const getInfo = (userId: string | null, quizId: number) => {
    return infoCompletedQuizzes.value.find((quiz) => quiz.user?.userId === userId && quiz.quizId === quizId);
  };

  return {
    completedQuizzes,
    addCompletedQuiz,
    addInfoCompletedQuiz,
    getCompletedQuizzesList,
    getCompletedQuizzes,
    isQuizCompleted,
    getQuizScore,
    getQuizPercent,
    getInfo,
  };
});

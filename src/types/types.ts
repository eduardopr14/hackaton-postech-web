export type UserType = 'P' | 'S';

export type Notification = {
  text: string;
  color?: string;
} | null

export type QuizRecord = {
  user: UserInfo | null;
  quizId: number;
  correctAnswers: number;
  totalQuestions: number;
  isCompleted: boolean;
}

export type Answer = {
  text: string;
  letter: string;
}

export type InfoRecord = {
  user: UserInfo | null;
  quizId: number;
  info: {
    questionId: number;
    questionAnswered: string;
    answers: Answer[];
    givenAnswer: string;
    correctAnswer: string;
    isItRight: boolean;
  }[];
}

export type UserInfo = {
  userId: string;
  schoolId: string;
  classId: string;
}

export type QuizItem = {
  id: number;
  title: string;
  description: string;
  questions: {
    id: number;
    question: string;
    answers: string[];
    correct: string;
    explanation: string;
  }[];
};

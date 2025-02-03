<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCrudStore } from '@/stores/crud';
import { useHistoricStore } from '@/stores/historic';
import BaseSelect from '@/components/Common/BaseSelect.vue';
import IconA from '@/components/icons/IconA.vue';
import IconB from '@/components/icons/IconB.vue';
import IconC from '@/components/icons/IconC.vue';
import IconD from '@/components/icons/IconD.vue';
import IconE from '@/components/icons/IconE.vue';

const props = defineProps({
  quizId: {
    type: Number,
    required: true,
  }
});

const emit = defineEmits(["close"]);

const crudStore = useCrudStore();
const historicStore = useHistoricStore();

const selectedSchoolId = ref('');
const selectedClassId = ref('');
const currentPage = ref(1);
const itemsPerPage = 1;

const userId = computed(() => crudStore.getUserLogged());
const userInfo = computed(() => crudStore.getUserInfo(userId.value));
const schoolIds = computed((): string[] => userInfo.value?.schoolIds);

const filteredCompletedQuizzes = computed(() => {
  return historicStore.completedQuizzes.filter((quiz) => {
    return quiz.user?.schoolId && schoolIds.value.includes(quiz.user?.schoolId)
  })
});

const filteredInfoCompletedQuizzes = computed(() => {
  return historicStore.infoCompletedQuizzes.filter((quiz) => {
    return quiz.user?.schoolId && schoolIds.value.includes(quiz.user?.schoolId)
  })
});

const selectedQuiz = computed(() => {
  return [...filteredCompletedQuizzes.value, ...filteredInfoCompletedQuizzes.value].find((quiz) => quiz.quizId === props.quizId);
});

const schoolOptions = computed(() => {
  const filteredQuizzes = [...filteredCompletedQuizzes.value, ...filteredInfoCompletedQuizzes.value];
  if (selectedQuiz.value) {
    return Array.from(new Set(filteredQuizzes
      .filter(quiz => quiz.quizId === props.quizId)
      .map(quiz => quiz.user?.schoolId)));
  }
  return [];
});

const classOptions = computed(() => {
  const filteredQuizzes = [...filteredCompletedQuizzes.value, ...filteredInfoCompletedQuizzes.value];
  if (selectedQuiz.value && selectedSchoolId.value) {
    return Array.from(new Set(filteredQuizzes
      .filter(quiz => quiz.quizId === props.quizId && quiz.user?.schoolId === selectedSchoolId.value)
      .map(quiz => quiz.user?.classId)));
  }
  return [];
});

const quizCompletedStats = computed(() => {
  const completedQuizzes = filteredCompletedQuizzes.value.filter((quiz) => quiz.quizId === props.quizId && quiz.user?.schoolId === selectedSchoolId.value && quiz.user?.classId === selectedClassId.value);
  
  const totalCompleted = completedQuizzes.filter((quiz) => quiz.isCompleted).length;
  const totalQuestions = completedQuizzes.reduce((acc, quiz) => acc + quiz.totalQuestions, 0);
  const correctAnswers = completedQuizzes.reduce((acc, quiz) => acc + quiz.correctAnswers, 0);

  return {
    totalCompleted,
    totalQuestions,
    correctAnswers
  };
});

const quizInfoStats = computed(() => {
  const infoCompletedQuizzes = filteredInfoCompletedQuizzes.value.filter((quiz) => quiz.quizId === props.quizId && quiz.user?.schoolId === selectedSchoolId.value && quiz.user?.classId === selectedClassId.value);

  const groupedQuestions = infoCompletedQuizzes.flatMap((quiz) => {
    return quiz.info.map((question) => {
      const totalAnswers = infoCompletedQuizzes
        .flatMap((quiz) => quiz.info)
        .filter((quizQuestion) => quizQuestion.questionId === question.questionId).length;

      const answerCount = question.answers.reduce((acc, answer) => {
        acc[answer.letter] = 0;
        return acc;
      }, {} as Record<string, number>);

      if (answerCount[question.givenAnswer] !== undefined) {
        answerCount[question.givenAnswer]++;
      }

      const answerPercentage = Object.fromEntries(Object.entries(answerCount).map(([letter, count]) => {
        const percentage = (count / totalAnswers) * 100;
        return [letter, percentage];
      }));

      const correctAnswersCount = infoCompletedQuizzes
        .filter((quiz) => quiz.info.some((quizQuestion) => quizQuestion.questionId === question.questionId && quizQuestion.correctAnswer === quizQuestion.givenAnswer))
        .length;

      const incorrectAnswersCount = totalAnswers - correctAnswersCount;
      const correctPercentage = (correctAnswersCount / totalAnswers) * 100;
      const incorrectPercentage = (incorrectAnswersCount / totalAnswers) * 100;

      return {
        questionAnswered: question.questionAnswered,
        answers: question.answers,
        answerCount,
        answerPercentage,
        correctAnswer: question.correctAnswer,
        correctAnswersCount,
        incorrectAnswersCount,
        correctPercentage,
        incorrectPercentage
      };
    });
  });

  const aggregatedQuestions = groupedQuestions.reduce((acc, question) => {
    const existingQuestion = acc.find(q => q.questionAnswered === question.questionAnswered);
    if (existingQuestion) {
      Object.keys(question.answerCount).forEach(letter => {
        existingQuestion.answerCount[letter] = (existingQuestion.answerCount[letter] || 0) + question.answerCount[letter];
        existingQuestion.answerPercentage[letter] = (existingQuestion.answerPercentage[letter] || 0) + question.answerPercentage[letter];
      });
    } else {
      acc.push(question);
    }
    return acc;
  }, [] as any[]);

  return aggregatedQuestions;
});

const paginatedInfo = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return quizInfoStats.value && quizInfoStats.value.slice(startIndex, startIndex + itemsPerPage);
});

const totalPages = computed(() => {
  return quizInfoStats.value && Math.ceil(quizInfoStats.value.length / itemsPerPage);
});

const closeModal = () => {
  emit('close');
};

const changePage = (direction: number) => {
  currentPage.value = Math.min(Math.max(1, currentPage.value + direction), Number(totalPages.value));
};

const getSvgComponent = (letter: string) => {
  switch (letter) {
    case 'A':
      return IconA;
    case 'B':
      return IconB;
    case 'C':
      return IconC;
    case 'D':
      return IconD;
    case 'E':
      return IconE;
    default:
      return null;
  }
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Estatísticas do Quiz</h2>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-800 focus:outline-none">
          X
        </button>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-gray-700">Escola:</p>
          <BaseSelect
            v-model="selectedSchoolId"
            :items="schoolOptions"
            placeholder="Selecione a escola"
            useSearch
          />
        </div>
        <div>
          <p class="text-gray-700">Classe:</p>
          <BaseSelect
            v-model="selectedClassId"
            :items="classOptions"
            placeholder="Selecione a classe"
            useSearch
          />
        </div>
      </div>

      <div v-if="quizCompletedStats.totalCompleted > 0">
        <h2 class="text-xl font-semibold mb-2">Estatísticas do Quiz</h2>
        <p class="text-gray-700">Alunos que completaram: {{ quizCompletedStats.totalCompleted }}</p>
        <p class="text-gray-700">Total de Questões Respondidas: {{ quizCompletedStats.totalQuestions }}</p>
        <p class="text-gray-700">Total de Acertos: {{ quizCompletedStats.correctAnswers }}</p>
      </div>

      <div v-if="quizInfoStats.length > 0">
        <h2 class="text-xl font-semibold my-4">Detalhamento das Respostas</h2>
        <div v-for="(question, index) in paginatedInfo" :key="index" class="mb-4">
          <p class="truncate"><strong>Pergunta:</strong> {{ question.questionAnswered }}</p>
          <p class="mt-2 mb-1"><strong>Alternativas:</strong></p>
          <ul>
            <li 
              v-for="answer in question.answers" 
              :key="answer.letter" 
              :title="answer.text"
              class="text-gray-700 flex items-center space-x-2" 
            >
              <component
                :is="getSvgComponent(answer.letter)"
                :class="{
                  'border-2': true,
                  'border-green-500': answer.letter === question.correctAnswer,
                  'rounded': true, 
                  'p-[3px]': true, 
                  'transition': true
                }"
                class="w-6 h-6 min-w-6 min-h-6 my-[2px]"
              />  
              <span class="text-sm truncate">{{ answer.text }}</span>
            </li>
          </ul>
          <p class="mt-2 mb-1"><strong>Respostas Dadas (Quantidade e Porcentagem):</strong></p>
          <ul>
            <li v-for="(percentage, letter) in question.answerPercentage" :key="letter" class="text-gray-700 flex items-center space-x-2">
              <component
                :is="getSvgComponent(letter.toString())"
                :class="{
                  'border-2': true,
                  'border-green-500': letter === question.correctAnswer,
                  'rounded': true, 
                  'p-[3px]': true, 
                  'transition': true
                }"
                class="w-6 h-6 my-[2px]"
              /> 
              <span class="text-sm">
                {{ question.answerCount[letter] }} resposta(s) ({{ percentage.toFixed(1) }}%)
              </span>
            </li>
          </ul>
          <p class="mt-2"><strong>Alternativa Correta:</strong> {{ question.correctAnswer }}</p>

          <p class="mt-2">
            <strong>Respostas Corretas:</strong> 
            {{ question.correctAnswersCount }} ({{ question.correctPercentage.toFixed(1) }}%)
          </p>
          <p>
            <strong>Respostas Erradas:</strong> 
            {{ question.incorrectAnswersCount }} ({{ question.incorrectPercentage.toFixed(1) }}%)
          </p>
        </div>
        <div class="flex justify-center mt-4 space-x-4">
          <button
            @click="changePage(-1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Anterior
          </button>
          <span class="text-sm mt-[10px]">Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            @click="changePage(1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </div>

      <div v-else>
        <p>Nenhum quiz encontrado para os filtros selecionados.</p>
      </div>
    </div>
  </div>
</template>

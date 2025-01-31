<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuizStore } from '@/stores/quiz';
import { useNotificationStore } from '@/stores/notification';
import { useRouter } from 'vue-router';
import BaseSelect from '@/components/Common/BaseSelect.vue';

const title = ref('');
const description = ref('');
const questions = ref([
  {
    question: '',
    answers: ['', '', '', '', ''],
    correctAnswer: '',
    explanation: '',
  },
]);

const currentPage = ref(1);
const questionsPerPage = 1;

const quizStore = useQuizStore();
const notificationStore = useNotificationStore();
const router = useRouter();

const getCurrentPageQuestions = computed(() => {
  const startIndex = (currentPage.value - 1) * questionsPerPage;
  return questions.value.slice(startIndex, startIndex + questionsPerPage);
});

const totalPages = computed(() => {
  return Math.ceil(questions.value.length / questionsPerPage);
});

const handleSubmit = () => {
  if (
    title.value &&
    description.value &&
    questions.value.every(q => 
      q.question && 
      q.answers[0] && 
      q.answers[1] && 
      q.correctAnswer && 
      q.explanation
    )
  ) {
    const newQuiz = {
      id: quizStore.localQuizzes.length + 1,
      title: title.value,
      description: description.value,
      questions: questions.value.map((q, index) => ({
        id: index + 1,
        question: q.question,
        answers: q.answers,
        correct: q.correctAnswer,
        explanation: q.explanation,
      })),
    };

    quizStore.localQuizzes.push(newQuiz);
    console.log('Quiz criado', newQuiz);
    notificationStore.setNotification({ text: "Quiz criado com sucesso", color: "success" }, 3000);
    router.push('/professor');
  } else {
    notificationStore.setNotification({ text: "Por favor, preencha todos os campos obrigatórios", color: "error" }, 3000);
  }
};


const addQuestion = () => {
  questions.value.push({
    question: '',
    answers: ['', '', '', '', ''],
    correctAnswer: '',
    explanation: '',
  });
};

const removeQuestion = (index: number) => {
  if (questions.value.length > 1) {
    questions.value.splice(index, 1);
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <p class="text-lg font-semibold">Cadastrar Quiz</p>
    <div class="bg-white py-8 max-w-[700px] w-[700px]">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <input
            v-model="title"
            id="title"
            type="text"
            placeholder="Título do Quiz"
            required
            class="p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <input
            v-model="description"
            id="description"
            type="text"
            placeholder="Descrição do Quiz"
            required
            class="p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
          />
        </div>

        <div v-for="(questionItem, index) in getCurrentPageQuestions" :key="index">
          <div class="mb-4">
            <input
              v-model="questionItem.question"
              type="text"
              placeholder="Pergunta"
              required
              class="mt-1 p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <input
              v-model="questionItem.answers[0]"
              type="text"
              placeholder="Resposta A*"
              required
              class="p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
            />
            <input
              v-model="questionItem.answers[1]"
              type="text"
              placeholder="Resposta B*"
              required
              class="p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <input
              v-model="questionItem.answers[2]"
              type="text"
              placeholder="Resposta C"
              class="p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
            />
            <input
              v-model="questionItem.answers[3]"
              type="text"
              placeholder="Resposta D"
              class="p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
            />
          </div>

          <div class="mb-4">
            <input
              v-model="questionItem.answers[4]"
              type="text"
              placeholder="Resposta E"
              class="mt-1 p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
            />
          </div>

          <BaseSelect
            class="mb-4"
            v-model="questionItem.correctAnswer"
            :items="questionItem.answers"
            placeholder="Selecione a Resposta Correta"
            required
          />

          <div class="mb-4">
            <input
              v-model="questionItem.explanation"
              type="text"
              placeholder="Explicação"
              required
              class="mt-1 p-[6px] pl-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-green-500 focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              @click="removeQuestion(index)"
              class="w-full py-2 px-4 bg-[#ff4d4d] hover:bg-[#c33b3b] text-white font-semibold rounded-lg shadow-md focus:outline-none focus:bg-[#c33b3b]"
            >
              Remover pergunta
            </button>
            <button
              type="button"
              @click="addQuestion"
              class="w-full py-2 px-4 bg-[#4DA3FF] hover:bg-[#3c98fb] text-white font-semibold rounded-lg shadow-md focus:outline-none focus:bg-[#3c98fb]"
            >
              Adicionar Pergunta
            </button>
          </div>
        </div>

        <div class="flex justify-between mt-4">
          <button
            type="button"
            @click="goToPreviousPage"
            :disabled="currentPage === 1"
            class="w-1/3 py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md focus:outline-none"
          >
            Anterior
          </button>
          <span class="text-sm self-center">Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            type="button"
            @click="goToNextPage"
            :disabled="currentPage === totalPages"
            class="w-1/3 py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md focus:outline-none"
          >
            Próxima
          </button>
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:bg-[#2dac5c] mt-4"
        >
          Cadastrar Quiz
        </button>
      </form>
    </div>
  </div>
</template>

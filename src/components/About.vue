<script setup lang="ts">
import QuizItem from './QuizItem.vue'
import IconA from './icons/IconA.vue'
import IconB from './icons/IconB.vue'
import IconC from './icons/IconC.vue'
import IconD from './icons/IconD.vue'
import IconE from './icons/IconE.vue'

const quizItems = [
  {
    icon: IconA,
    content: 'Vue’s official documentation provides you with all information you need to get started.',
  },
  {
    icon: IconB,
    content: 'This project is served and bundled with Vite. Recommended IDE setup is VSCode + Volar.',
  },
  {
    icon: IconC,
    content: 'Get official tools and libraries for your project: Pinia, Vue Router, Vue Test Utils, etc.',
  },
  {
    icon: IconD,
    content: 'Got stuck? Ask your question on Vue Land (our official Discord server) or StackOverflow.',
  },
  {
    icon: IconE,
    content: 'Help Vue sustain by becoming a sponsor on the official Vue sponsor page.',
  },
];
</script>

<template>
  <div class="space-y-8">
    <QuizItem v-for="(item, index) in quizItems" :key="index">
      <template #icon>
        <div class="mr-12 rounded p-2 border-2 border-[#4DA3FF]">
          <component :is="item.icon" class="w-6 h-6 text-green-500" />
        </div>
      </template>
      <p class="text-gray-700">
        {{ item.content }}
      </p>
    </QuizItem>
  </div>
</template>

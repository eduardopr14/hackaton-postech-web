<script setup lang="ts">
import DefaultView from '@/views/DefaultView.vue'
import QuizItem from './QuizItem.vue'
import Number1 from './icons/Number1.vue'
import Number2 from './icons/Number2.vue'
import Number3 from './icons/Number3.vue'
import Number4 from './icons/Number4.vue'
import Number5 from './icons/Number5.vue'

const quizItems = [
  {
    icon: Number1,
    content: 'Apoio ao ensino personalizado: O sistema permite que os professores analisem facilmente o desempenho dos alunos e identifiquem tópicos que precisam de revisão, com base nas questões mais difíceis ou com maior índice de erro, promovendo um ensino mais direcionado.',
    boldText: 'Apoio ao ensino personalizado:',
  },
  {
    icon: Number2,
    content: 'Criação e gestão de quizzes: Os professores podem criar, editar e excluir quizzes de múltipla escolha (A-E) relacionados a qualquer tipo de aula, facilitando a personalização do conteúdo de acordo com as necessidades da turma.',
    boldText: 'Criação e gestão de quizzes:',
  },
  {
    icon: Number3,
    content: 'Relatórios e estatísticas detalhadas: O sistema gera gráficos e relatórios que mostram as respostas e acertos dos alunos, permitindo uma visão clara e rápida do desempenho da turma, o que ajuda na tomada de decisões sobre o que revisar em aula.',
    boldText: 'Relatórios e estatísticas detalhadas:',
  },
  {
    icon: Number4,
    content: 'Facilidade de acesso para alunos: Os alunos podem acessar os quizzes cadastrados pelos professores e praticar os conteúdos de maneira autônoma, facilitando o aprendizado fora da sala de aula.',
    boldText: 'Facilidade de acesso para alunos:',
  },
  {
    icon: Number5,
    content: 'Aprimoramento contínuo do ensino: Com as estatísticas detalhadas e a análise do desempenho dos alunos, os professores conseguem ajustar seus métodos de ensino e focar nas áreas que necessitam de mais atenção, promovendo um aprendizado mais eficaz.',
    boldText: 'Aprimoramento contínuo do ensino:',
  },
];

const boldContent = (content: string, boldText: string) => {
  const regex = new RegExp(`(${boldText})`, 'gi');
  return content.replace(regex, '<strong>$1</strong>');
};
</script>

<template>
  <DefaultView>
    <div class="space-y-6">
      <QuizItem v-for="(item, index) in quizItems" :key="index">
        <template #icon>
          <div class="mr-12 rounded p-2">
            <component :is="item.icon" class="w-10 h-10 text-green-500" />
          </div>
        </template>
        <p class="text-gray-700" v-html="boldContent(item.content, item.boldText)"></p>
      </QuizItem>
    </div>
  </DefaultView>
</template>

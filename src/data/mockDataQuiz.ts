export const quizzes = [
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
    isCompleted: false,
    isDeleted: false,
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
    isCompleted: false,
    isDeleted: false,
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
    isCompleted: false,
    isDeleted: false,
  },
];

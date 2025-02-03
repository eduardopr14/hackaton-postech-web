export const quizzes = [
  {
    id: 1,
    title: 'Geografia - Prova final',
    description: 'Temas avançados de geografia física e humana',
    questions: [
      {
        id: 1,
        question: 'Qual é o maior bioma brasileiro em extensão territorial?',
        answers: ['Amazônia', 'Cerrado', 'Caatinga', 'Mata Atlântica'],
        correct: 'Amazônia',
        explanation: 'A Amazônia é o maior bioma do Brasil, cobrindo cerca de 40% do território nacional.',
      },
      {
        id: 2,
        question: 'Qual é o principal fator responsável pela formação dos desertos?',
        answers: ['Aridade', 'Altitude', 'Latitude', 'Pressão atmosférica'],
        correct: 'Aridade',
        explanation: 'A aridez, ou falta de umidade, é o principal fator para a formação de desertos.',
      },
      {
        id: 3,
        question: 'Qual é o país mais populoso do mundo?',
        answers: ['China', 'Índia', 'Estados Unidos', 'Brasil'],
        correct: 'China',
        explanation: 'A China é o país mais populoso do mundo, com mais de 1,4 bilhão de habitantes.',
      },
      {
        id: 4,
        question: 'Qual é o nome do processo de urbanização acelerada em países subdesenvolvidos?',
        answers: ['Macrocefalia urbana', 'Conurbação', 'Metropolização', 'Favelização'],
        correct: 'Macrocefalia urbana',
        explanation: 'A macrocefalia urbana ocorre quando uma cidade cresce desproporcionalmente em relação ao resto do país.',
      },
      {
        id: 5,
        question: 'Qual é o principal objetivo do Acordo de Paris?',
        answers: [
          'Combater as mudanças climáticas',
          'Promover o comércio internacional',
          'Reduzir a pobreza',
          'Proteger a biodiversidade',
        ],
        correct: 'Combater as mudanças climáticas',
        explanation: 'O Acordo de Paris tem como principal objetivo limitar o aquecimento global abaixo de 2°C.',
      },
    ],
    isCompleted: false,
    isDeleted: false,
  },
  {
    id: 2,
    title: 'Geografia Humana - Urbanização e Megacidades',
    description: 'Perguntas avançadas sobre urbanização, globalização e desafios das megacidades',
    questions: [
      {
        id: 1,
        question: 'O que são megacidades e quais são os principais desafios enfrentados por elas?',
        answers: [
          'Megacidades são cidades com mais de 10 milhões de habitantes, enfrentando desafios como poluição, superpopulação e infraestrutura inadequada.',
          'Megacidades são áreas rurais com alta densidade populacional, onde os principais desafios são a falta de tecnologia e o isolamento geográfico.',
          'Megacidades são cidades com menos de 1 milhão de habitantes, caracterizadas por baixa densidade populacional e alto padrão de vida.',
          'Megacidades são regiões metropolitanas que não enfrentam problemas significativos, devido ao planejamento urbano eficiente.',
        ],
        correct: 'Megacidades são cidades com mais de 10 milhões de habitantes, enfrentando desafios como poluição, superpopulação e infraestrutura inadequada.',
        explanation:
          'Megacidades, como Tóquio, São Paulo e Nova Délhi, abrigam mais de 10 milhões de pessoas. Elas enfrentam desafios como poluição do ar e da água, superpopulação, tráfego caótico, falta de moradia adequada e infraestrutura insuficiente. Esses problemas são agravados pela rápida urbanização e globalização.',
      },
      {
        id: 2,
        question: 'Qual é o impacto da globalização no processo de urbanização?',
        answers: [
          'A globalização reduz a urbanização, pois incentiva a migração para áreas rurais em busca de qualidade de vida.',
          'A globalização acelera a urbanização, atraindo investimentos e migração para cidades, mas também aumenta desigualdades socioeconômicas.',
          'A globalização não tem impacto significativo no processo de urbanização, pois as cidades crescem de forma independente.',
          'A globalização promove a descentralização urbana, reduzindo o tamanho das megacidades.',
        ],
        correct: 'A globalização acelera a urbanização, atraindo investimentos e migração para cidades, mas também aumenta desigualdades socioeconômicas.',
        explanation:
          'A globalização intensifica a urbanização ao atrair investimentos estrangeiros, empresas multinacionais e migrantes para as cidades. No entanto, isso também amplia as desigualdades, criando bolsões de pobreza e áreas de alto padrão de vida. Cidades como Xangai e Mumbai são exemplos desse fenômeno.',
      },
      {
        id: 3,
        question: 'O que são cidades globais e quais são suas características principais?',
        answers: [
          'Cidades globais são pequenos centros urbanos com economia localizada, sem influência internacional.',
          'Cidades globais são metrópoles que exercem influência econômica, política e cultural em escala global, como Nova York, Londres e Tóquio.',
          'Cidades globais são áreas rurais que se destacam pela produção agrícola exportadora.',
          'Cidades globais são caracterizadas pela ausência de diversidade cultural e econômica.',
        ],
        correct: 'Cidades globais são metrópoles que exercem influência econômica, política e cultural em escala global, como Nova York, Londres e Tóquio.',
        explanation:
          'Cidades globais são centros urbanos que concentram sedes de empresas multinacionais, instituições financeiras e organizações internacionais. Elas são polos de inovação, cultura e poder, influenciando a economia e a política mundial. Exemplos incluem Nova York, Londres, Tóquio e Paris.',
      },
      {
        id: 4,
        question: 'Qual é o papel das cidades na economia globalizada?',
        answers: [
          'As cidades são irrelevantes na economia globalizada, pois a produção e o comércio ocorrem principalmente em áreas rurais.',
          'As cidades são os principais motores da economia globalizada, concentrando indústrias, serviços e inovação tecnológica.',
          'As cidades têm um papel secundário, sendo apenas centros administrativos sem impacto econômico significativo.',
          'As cidades são responsáveis apenas pela preservação cultural, sem influência na economia.',
        ],
        correct: 'As cidades são os principais motores da economia globalizada, concentrando indústrias, serviços e inovação tecnológica.',
        explanation:
          'As cidades são os principais centros de atividade econômica na globalização, abrigando indústrias, serviços financeiros, tecnologia e inovação. Elas atraem investimentos, talentos e empresas, sendo fundamentais para o crescimento econômico global.',
      },
      {
        id: 5,
        question: 'O que é segregação socioespacial e como ela se manifesta nas cidades?',
        answers: [
          'Segregação socioespacial é a distribuição igualitária de recursos e serviços urbanos, promovendo a inclusão social.',
          'Segregação socioespacial é a concentração de grupos sociais em áreas específicas da cidade, criando desigualdades e exclusão.',
          'Segregação socioespacial é um fenômeno rural, onde comunidades isoladas não têm acesso a serviços básicos.',
          'Segregação socioespacial é a migração de populações urbanas para áreas rurais em busca de qualidade de vida.',
        ],
        correct: 'Segregação socioespacial é a concentração de grupos sociais em áreas específicas da cidade, criando desigualdades e exclusão.',
        explanation:
          'A segregação socioespacial ocorre quando grupos sociais de diferentes níveis econômicos são separados geograficamente dentro das cidades. Isso cria áreas de alto padrão de vida e outras de pobreza extrema, como favelas e bairros luxuosos. Esse fenômeno é comum em cidades como São Paulo e Cidade do México.',
      },
    ],
    isCompleted: false,
    isDeleted: false,
  },
  {
    id: 3,
    title: 'Geografia Política - Geopolítica e Conflitos Internacionais',
    description: 'Perguntas avançadas sobre geopolítica, conflitos e relações internacionais',
    questions: [
      {
        id: 1,
        question: 'O que é geopolítica e qual a sua importância no cenário internacional?',
        answers: [
          'Geopolítica é o estudo da influência da geografia na política e nas relações internacionais, analisando fatores como território, recursos e poder.',
          'Geopolítica é uma disciplina que estuda apenas a distribuição de recursos naturais, sem relação com a política.',
          'Geopolítica é o estudo exclusivo de mapas e fronteiras, sem considerar aspectos econômicos ou sociais.',
          'Geopolítica é uma teoria ultrapassada, substituída pela globalização e pela tecnologia.',
        ],
        correct: 'Geopolítica é o estudo da influência da geografia na política e nas relações internacionais, analisando fatores como território, recursos e poder.',
        explanation:
          'A geopolítica estuda como a geografia (localização, recursos naturais, território) influencia as decisões políticas e as relações entre países. Ela é crucial para entender conflitos, alianças e estratégias internacionais, como a disputa por recursos no Mar do Sul da China ou a influência dos EUA no Oriente Médio.',
      },
      {
        id: 2,
        question: 'Qual é o papel da ONU na resolução de conflitos internacionais?',
        answers: [
          'A ONU atua apenas como observadora em conflitos, sem poder para intervir ou mediar disputas.',
          'A ONU promove a paz e a segurança internacional através de missões de paz, sanções e mediação de conflitos.',
          'A ONU é responsável apenas por questões humanitárias, sem envolvimento em conflitos políticos ou militares.',
          'A ONU é uma organização obsoleta, sem relevância no cenário internacional atual.',
        ],
        correct: 'A ONU promove a paz e a segurança internacional através de missões de paz, sanções e mediação de conflitos.',
        explanation:
          'A ONU (Organização das Nações Unidas) tem como principal objetivo manter a paz e a segurança internacional. Ela atua através de missões de paz, sanções econômicas, mediação de conflitos e promoção de diálogos entre nações. Exemplos incluem as missões no Congo e no Sudão do Sul.',
      },
    ],
    isCompleted: false,
    isDeleted: false,
  }
];
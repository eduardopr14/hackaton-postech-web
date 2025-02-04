# Hackaton - Pós Graduação Full Stack Development

![Logo](https://upload.wikimedia.org/wikipedia/commons/d/d4/Fiap-logo-novo.jpg)

### Alunos

- **Eduardo Pescinini Ruli**

## Introdução à Documentação

Esta documentação é um documento explícito que aborda todas as funcionalidades contidas no sistema desenvolvido no Hackaton (Fase 5) da Pós Graduação no curso de Full Stack Development – Turma 1FSDT.

O usuário pode utilizar este guia para se situar no Front-end do projeto desenvolvido em Vue.js, desta forma conhecendo todas as funcionalidades que o mesmo tem a oferecer, assim sendo possível entender como realizar cada método da maneira correta.

## Desafios do Projeto

O Hackaton tem como tema “Auxílio aos professores e professoras no ensino público”. O objetivo é desenvolver sistemas, ferramentas ou plataformas tecnológicas que facilitem o trabalho dos professores e professoras da rede pública de ensino, proporcionando mais eficiência, criatividade e interação com seus alunos.

Porém, é de escolha pessoal do grupo o caminho a ser seguido, sendo necessário apenas ser útil para o tema apresentado. Deve-se então desenvolver soluções práticas e inovadoras que melhorem o dia a dia dos professores, sendo necessário desenvolver um MVP para demonstrar a viabilidade da ideia.

## Processo de Desenvolvimento

O processo de desenvolvimento do sistema de quizzes foi estruturado em etapas claras e bem definidas, utilizando metodologias ágeis e práticas de design thinking para garantir que a solução fosse viável, inovadora e alinhada com as necessidades dos professores e alunos. Abaixo, detalha-se como foi organizado o trabalho:

1. **Entendimento do Problema e Definição do Escopo:**

   - **Brainstorming Inicial**: Brainstorm para entender o problema central: a dificuldade dos professores em identificar as defasagens de aprendizagem dos alunos de forma rápida e eficiente. Foram levantadas diversas ideias, como sistemas de avaliação automatizados, plataformas de compartilhamento de materiais e ferramentas de feedback contínuo.
   - **Definição do MVP**: Com base no tempo limitado do hackathon, optou-se por focar em um MVP que resolvesse o problema de forma direta e prática. A solução escolhida foi um sistema de quizzes que permitisse aos professores criar avaliações rápidas e obter feedbacks instantâneos sobre o desempenho dos alunos.

2. **Pesquisa e Análise de Mercado:**

   - **Benchmarking**: Pesquisa de soluções existentes no mercado, como plataformas de quizzes e ferramentas de avaliação formativa, para identificar lacunas e oportunidades de inovação.
   - **Entrevistas com Profissionais da Área**: Foram realizados encontros com profissionais da área para entender as necessidades reais do sistema de ensino público brasileiro.

3. **Design Thinking e Prototipação:**

   - **Definição de Personas**: Foram criadas personas para representar os usuários do sistema, como "Professor João", que precisa de ferramentas simples e rápidas, e "Aluna Maria", que busca uma forma discreta e assertiva de sanar dúvidas.
   - **Prototipação de Baixa Fidelidade**: Esboços iniciais do sistema foram criados em papel, focando na experiência do usuário (UX) e na usabilidade. Isso incluiu fluxos de cadastro de quizzes, realização de quizzes pelos alunos e visualização de resultados pelos professores.

4. **Desenvolvimento Técnico:**
   
   - **Definição da Arquitetura**: Optou-se por uma arquitetura front-end em Vue.js, com persistência de dados via Pinia e localStorage, para garantir uma solução leve e de fácil implementação.
   - **Divisão de Tarefas**: Cada funcionalidade do desenvolvimento teve seu momento de planejamento e desenvolvimento (ex.: cadastro de quizzes, autenticação de usuários, visualização de resultados).
   - **Integração Contínua**: Utilizando ferramentas como Git e GitHub, garantindo a integração contínua do código, com revisões e testes frequentes.

## Resumo Executivo

A solução escolhida foi o desenvolvimento de um MVP para simular um sistema de cadastro, realização e feedback de quizzes, tendo como objetivo identificar os tópicos mais incompreendidos pelos alunos a fim de auxiliá-los no aperfeiçoamento e entendimento de tais tópicos.

Espera-se que o impacto seja diretamente ligado à melhoria de ensino, sendo que os alunos sanarão as maiores dúvidas compartilhadas pela turma, a fim de realizar uma prova ou exame. Assim como aqueles alunos que têm vergonha de expor os pontos que ficaram sem entendimento, sendo então uma forma mais abrangente de entender as dificuldades de cada aluno.

## Problema Identificado

Como citado por Leonardo Pescinini Ruli, coordenador de Tecnologia no Instituto Sonho Grande, organização do 3º setor que apoia secretarias estaduais de educação:

> “Um grande desafio na educação é que os estudantes não aprendem igualmente. Além dos estudantes brasileiros possuírem grandes defasagens em geral com relação ao conteúdo planejado na base nacional comum curricular, essas defasagens são distribuídas de maneira desigual entre os estudantes. Mesmo aqueles de uma mesma turma possuem diferentes níveis de proficiência nas habilidades e competências trabalhadas. Isso torna o trabalho dos professores ainda mais difícil, pois não basta passar o conteúdo conforme um roteiro padrão, é preciso avaliar o nível de compreensão em cada tópico para poder melhor direcionar o planejamento de suas aulas."

> "Nos últimos anos trabalhando com escolas estaduais pelo Brasil, vi quão complexo é o trabalho do professor. Com pouco tempo para planejar as aulas no dia-a-dia, o professor precisa utilizar avaliações formativas para compreender como seus alunos estão no processo de aprendizagem. No entanto, considerando a rotina intensa dos professores e o tempo necessário para aplicar e corrigir esse tipo de avaliação, esse processo de verificação das aprendizagens ao longo do ano acaba não ocorrendo de forma tempestiva. Isso faz com que, por sua vez, o planejamento de aulas não esteja devidamente adequado às defasagens de cada turma, dificultando ainda mais o processo de aprendizagem para os estudantes."

> "Esse problema é mais acentuado nas escolas públicas, uma vez que a disponibilidade de recursos é menor. Frente a esse cenário desafiador, acredito que o uso de ferramentas e sistemas pode auxiliar no dia-a-dia dos professores, com soluções relativamente baratas para problemas complexos. Por exemplo, a automatização de avaliações formativas pode apoiar os professores na identificação de defasagens na aprendizagem, com menor esforço e maior recorrência. Dessa maneira, os professores podem dedicar mais tempo ao planejamento de aulas que estejam adequadas ao nível de conhecimento de cada turma. Assim, os estudantes conseguirão compreender melhor os conteúdos. Embora tenhamos grandes desafios, o esforço para aplicar ferramentas digitais pode trazer ótimos resultados para a melhoria da educação pública brasileira.”

## Descrição da Solução

Identificado este problema, o sistema de quizzes busca oferecer uma solução rápida e barata para que os professores e alunos “trabalhem” juntos para que essas compreensões em cada tópico tratado nas aulas tenha um feedback constante. Desta forma, o professor consegue ter um feedback de quanto a turma entendeu determinada aula, assim podendo oferecer uma revisão ou promoção de conteúdos extras para que o tópico seja fixado e entendido de maneira desejada.

O sistema também oferece opções de adicionar conteúdos adicionais para cada questão apresentada.

### Estrutura Básica da Solução:

O sistema de quizzes oferece ao professor que crie e gerencie quizzes sobre um tema, aula ou matéria específica. Neste, o professor pode adicionar quantas perguntas achar necessário para que a compreensão sobre o conhecimento da turma seja entendida. Assim, cada pergunta inserida pode ter respostas de alternativas de A até E, ou seja, cinco possíveis alternativas. O conteúdo das perguntas e respostas podem ser completamente editados pelos professores a fim de criar uma determinada dificuldade desejada.

Após a criação de um quiz, cabe aos alunos realizarem o mesmo. Quando este processo acontecer, o professor poderá acompanhar os resultados de cada classe de uma escola separadamente, podendo entregar mais direcionamento na solução dessas dúvidas acerca de determinado tópico.

## Requisito Técnico

- **Front-end em Vue.js:**
- **Persistência de Dados:**
  - Implementação de todas as funcionalidades e utilizações dos end-points criados no Back-end do mesmo grupo deste desafio.
  - Utilização de um sistema de store através do Pinia e localStorage para simular um ambiente de banco de dados no qual os dados podem ser salvos e manipulados da maneira desejada.

### Documentação:

- **Documentação técnica detalhada do projeto**, incluindo setup inicial, arquitetura da aplicação e guia de uso das funcionalidades.

## Setup Inicial

O projeto completo pode ser encontrado no repositório do GitHub:  
[https://github.com/eduardopr14/hackaton-postech-web](https://github.com/eduardopr14/hackaton-postech-web)

### Requisitos de Sistemas:

Essas foram as tecnologias utilizadas para a geração do projeto:

- Vue 3
- Vite
- Tailwind
- Typescript
- Pinia
- LocalStorage

Todas as suas versões se encontram no documento `package.json` na raiz do projeto.

### Instalação de Dependências:

Como utilizamos o Vue.js 3 por padrão, ele utiliza o gerenciador de dependências NPM.  
Para instalar as dependências, basta utilizar o comando `npm i` no terminal de sua escolha na raiz do projeto.

### Execução do Projeto:

Para iniciar o projeto, basta estar na raiz e dentro do terminal de sua escolha executar o comando:

```bash
npm run dev
```

## Introdução às Funcionalidades

O sistema é uma solução de quizzes online no qual o usuário (professor) realiza o cadastro de quizzes que depois podem ser realizados pelos usuários (alunos). Após a conclusão de um ou mais alunos, o professor pode ver e analisar os resultados.

Vale ressaltar que apenas usuários logados (professores) podem cadastrar quizzes, assim como editar, excluir e visualizar informações adicionais de forma individual. Dessa forma, os professores têm a função de popular o sistema de quizzes com o conteúdo desejado para que posteriormente possa ser consumido pelos alunos.

Os quizzes possuem alguns filtros para facilitar a visualização e gerenciamento, sendo eles “Todos”, “Concluídos”, “Não concluídos” e “Deletados” (deletados está disponível apenas para um usuário do tipo professor).

### Documentação das Funcionalidades

Utilize a URL [http://localhost:5173](http://localhost:5173) ou GitHub Pages para acessar o projeto. Nele contém todas as funcionalidades e aplicações de tudo citado neste documento. Aqui será abordado cada um deles de maneira resumida.

Todas as funcionalidades necessitam de autorização (token) para seu acesso, sendo necessária a realização de um login para que funcionem. Primeiro, abordaremos as funcionalidades de um usuário do tipo professor:

- **Cadastro de Professor**
  
  Cadastrar um novo usuário do tipo professor (“P”) no sistema. Neste formulário deve-se informar nome de usuário, senha, nome e escola(s) (escola(s) que o determinado professor trabalha), sendo essa informação de escola também uma seleção de cadastros prévios no sistema.

- **Cadastro de Aluno**
  
  Cadastrar um novo usuário do tipo aluno (“S” que se refere a student). Neste formulário deve-se informar nome de usuário, senha, nome, uma escola e uma classe.

- **Cadastro de Escola**
  
  Cadastrar uma nova escola, sendo que neste formulário deve-se informar o nome da escola e quantas salas/classes a mesma possui (essas informações posteriormente são associadas a cada aluno e professor no sistema para fazer filtragens específicas).

- **Cadastro de Quiz**
  
  Cadastrar um novo quiz. Neste formulário deve-se informar informações gerais como título do quiz, descrição do quiz e posteriormente uma lista de informações de questão, resposta “A”, “B”, “C”, “D” e “E” (apenas “A” e “B” são obrigatórias), qual a resposta correta e uma explicação caso necessário. Nesta explicação, inclusive, pode-se incluir link e materiais adicionais para a questão em si. Um determinado quiz pode ter n questões.

- **Visualização do Histórico de Quizzes**
  
  Na visualização de quizzes existem 4 filtros, sendo eles: “Todos”, “Finalizados”, “Não Finalizados” e “Deletados”. Em cada um deles existe uma possível listagem de quizzes, com o título e descrição do quiz, assim como um botão para finalizar um quiz e um botão para deletar.

  Caso um quiz seja finalizado, os alunos não terão mais como enviar resoluções ao mesmo (e o mesmo ficará com uma borda verde aos alunos e professores), dessa forma significando que o quiz foi concluído pelo professor. Caso um quiz seja deletado, o mesmo não aparecerá mais para os alunos, apenas os professores terão visibilidade do mesmo e ele ficará com uma borda vermelha.

### Funcionalidades de Usuários do Tipo Aluno:

- **Visualização de Quizzes**
  
  Na visualização de quizzes existem 3 filtros, sendo eles: “Todos”, “Completos” e “Não Completos”. Em cada um deles existe uma possível listagem de quizzes, com o título e descrição do quiz.
  Caso o usuário clique em um quiz específico, o mesmo se iniciará e uma pergunta e suas respostas serão apresentadas ao mesmo. Assim que selecionar uma das alternativas, o sistema apresentará um feedback se a resposta estava certa ou errada e qual era a alternativa correta, um botão de “Ver explicação” que será abordado em um próximo item de funcionalidades, e um botão para a próxima pergunta. Quando o quiz terminar será mostrado um botão de “Mostrar feedback” que será abordado posteriormente também.

- **Mostrar Feedback**
  
  O botão de “mostrar feedback” é apresentado ao finalizar um quiz, no qual uma mensagem de conclusão de uma informação de quantas perguntas foram acertadas e quantas foram as perguntas no total, exemplo: “Você acertou 4 de 5 perguntas”.

- **Ver Explicação**
  
  Cada pergunta cadastrada no sistema pelo professor pode conter uma explicação única, assim como um material adicional que pode ser acessado pelo aluno quando uma pergunta tiver sido respondida.

- **Botão de “+” para Quizzes Concluídos**
  
  Caso um quiz seja concluído, um botão de “+” irá aparecer ao lado do mesmo, neste existem todas as perguntas de maneira paginada, no qual informa-se qual a pergunta, quais eram todas as respostas possíveis, qual o usuário selecionou, qual era a resposta correta e se o mesmo acertou a questão.

## Diagrama de Classe

O diagrama de classe apresenta a estrutura e relacionamentos do projeto.

## Relatos de Experiências e Desafios

A criação de um quiz e toda a sua estrutura e relacionamentos foi mais difícil do que se previamente pensava, desta forma foi necessário criar esses relacionamentos para que as filtragens, cadastros e visualizações fossem possíveis, assim como os diversos tipos de relatórios sobre os quizzes realizados.
A escolha de uma solução a um problema real foi um desafio já que existiam várias possibilidades reais, porém como o tempo era relativamente curto, teve que se pensar na viabilidade da solução em si, mesmo que como um MVP.

## Aprendizados

Com o tema do hackaton foi possível visualizar de maneira mais clara que a educação pública no Brasil possui diversos pontos no qual a tecnologia pode estar ajudando, apresentando maneiras inovadoras e baratas para solucionar problemas complexos.
Desta forma este projeto proporcionou uma visão mais abrangente de possíveis soluções de mundo real, não só na área da educação, mas em geral. Assim percebe-se a tecnologia como vez mais presente em todos os ramos existentes e como a mesma pode ajudar todas elas com soluções que estejam a alcance de todos.
Cada vez mais o profissional qualificado em formações de tecnologia será necessário para que a evolução continue da maneira desejada, oferecendo serviços e preenchendo essas demandas crescentes.

## Futuro e próximos passos

Este projeto “arranhou” a superfície de um problema antigo na educação, porém sempre há espaços para melhorias e aprimoramentos, algumas delas que foram abordadas pela equipe são:

- **Comentários nos quizzes**
  
  Cada quiz cadastrado pode receber comentários dos alunos para que as possíveis dúvidas relacionadas as questões possam ser solucionadas através do próprio sistema e de forma remota, gerando discussões e troca de conhecimentos entre os alunos e professores.

- **Gráficos**
  
  Adicionar gráficos para os feedbacks de conclusão em cada quiz, sendo possível o auxílio na obtenção de certas informações sobre o mesmo.

- **Sistema de experiencia e recompensas**
  
  A possibilidade de “gameficação” de sistemas está cada vez mais presente no mundo atual, criando mais aderência e engajamento de usuários nos mesmos, dessa forma seria possível adicionar algum tipo de sistema de experiência caso o usuário/aluno conclua um quiz e de acordo com a quantidade de acertos do mesmo.
  Também sendo possível um sistema de recompensa onde os alunos que respondem os quizzes das aulas ganhem pontos extras nas provas ou uma bolsa específica na escola.

- **Inteligência artificial**
  
  Talvez o item mais importante e de maior impacto que qualquer sistema de tecnologia pode integrar. A integração de inteligência artificial pode ser adicionada ao sistema de quizzes de diversas maneiras, ao cadastrar um quiz o professor pode enviar um PDF ou arquivo da aula em questão, solicitar quantas questões ele deseja e qual a dificuldade do mesmo e dessa forma a IA desenvolveria de maneira automática os quizzes correspondentes, também sendo interessante o professor poder editar, negar e aceitar as perguntas e respostas sugeridas pela IA.
  Também seria possível integrar a inteligência artificial ao sistema de comentários nos quizzes, no qual a própria IA ajudaria a sanar possíveis dúvidas dos alunos.

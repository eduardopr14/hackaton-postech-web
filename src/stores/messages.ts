import { reactive } from 'vue';

export const useMessageStore = () => {
  const messageStore = reactive({
    mainText: 'Quiz App',
    subText: 'Bem-vindo.',

    // Funções para atualizar os textos
    setMainText(newText: string) {
      this.mainText = newText;
    },
    setSubText(newText: string) {
      this.subText = newText;
    },
  });

  return messageStore;
};

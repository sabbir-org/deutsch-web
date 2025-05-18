export type Conversation = {
  id: string;
  title: string;
  subtitle: string;
  number: string;
  audio: string;
  convo: [
    {
      name: string;
      text: string;
    }
  ];
};

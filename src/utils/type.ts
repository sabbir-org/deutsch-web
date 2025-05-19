export type TPreviewData = {
  id: string;
  title: string;
  subtitle: string;
  number: string;
  audio: string;
  type: "narration" | "dialog";
  content: [
    {
      name?: string;
      title?: string;
      text: string;
    }
  ];
};

export type TDialogData = {
  id: string;
  title: string;
  subtitle: string;
  number: string;
  audio: string;
  type: "dialog";
  content: [
    {
      name: string;
      text: string;
    }
  ];
};

export type TNarrationData = {
  id: string;
  title: string;
  subtitle: string;
  number: string;
  audio: string;
  type: "narration";
  content: [
    {
      title?: string;
      text: string;
    }
  ];
};

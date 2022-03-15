export type Quest = {
  id: string;
  title: string;
  questStatus: string;
};

export type Category = {
  id: string;
  title: string;
  quests: {
    id: string;
  }[];
};

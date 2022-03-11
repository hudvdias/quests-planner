import { Quest } from "../types/types";

//TODO: refactor this code!

export const reorderQuests = (quests: Quest[]) => {
  const sortedQuests = [];

  sortedQuests.push(
    ...quests.filter((quest: Quest) => quest.questStatus === "progress")
  );
  sortedQuests.push(
    ...quests.filter((quest: Quest) => quest.questStatus === "waiting")
  );
  sortedQuests.push(
    ...quests.filter((quest: Quest) => quest.questStatus === "todo")
  );
  sortedQuests.push(
    ...quests.filter((quest: Quest) => quest.questStatus === "completed")
  );

  return sortedQuests;
};

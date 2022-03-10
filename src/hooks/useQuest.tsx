import React, { createContext, useContext, useState } from "react";
import { api } from "../services/axios";
import { Quest } from "../types/types";

type QuestContextProps = {
  quests: Quest[];
  getUserQuests: () => Promise<void>;
  createQuest: (title: string) => Promise<void>;
  changeQuestStatus: (id: string, questStatus: string) => Promise<void>;
  deleteQuest: (id: string) => Promise<void>;
};

const QuestContext = createContext({} as QuestContextProps);

const QuestProvider: React.FC = ({ children }) => {
  const [quests, setQuests] = useState<Quest[]>([]);

  const getUserQuests = async () => {
    try {
      const response = await api.get("/quests");
      const { quests } = response.data;

      // refactor this code
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
      //

      setQuests(sortedQuests);
    } catch (error: any) {
      throw new Error(error.message);
    }

    return;
  };

  const createQuest = async (title: string) => {
    try {
      await api.post("/quests", { title });

      await getUserQuests();
    } catch (error: any) {
      throw new Error(error.message);
    }

    return;
  };

  const changeQuestStatus = async (id: string, questStatus: string) => {
    try {
      await api.put("/quests", { id, questStatus });

      await getUserQuests();
    } catch (error: any) {
      throw new Error(error.message);
    }

    return;
  };

  const deleteQuest = async (id: string) => {
    try {
      await api.delete("/quests", { data: { id } });

      await getUserQuests();
    } catch (error: any) {
      throw new Error(error.message);
    }

    return;
  };

  return (
    <QuestContext.Provider
      value={{
        quests,
        getUserQuests,
        createQuest,
        changeQuestStatus,
        deleteQuest,
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};

const useQuest = () => useContext(QuestContext);

export { QuestProvider, useQuest };

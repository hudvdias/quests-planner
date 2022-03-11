import React, { createContext, useContext, useState } from "react";
import { api } from "../services/axios";
import { Quest } from "../types/types";
import { reorderQuests } from "../utils/reorderQuests";

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
      const response = await api.get<Quest[]>("/quests");

      const sortedQuests = reorderQuests(response.data);

      setQuests(sortedQuests);
    } catch (error: any) {
      throw new Error(error.message);
    }

    return;
  };

  const createQuest = async (title: string) => {
    try {
      const response = await api.post<Quest>("/quests", { title });
      const newQuest = response.data;

      const newQuests = [...quests, newQuest];
      const orderedQuests = reorderQuests(newQuests);
      setQuests(orderedQuests);
    } catch (error: any) {
      throw new Error(error.message);
    }

    return;
  };

  const changeQuestStatus = async (id: string, questStatus: string) => {
    try {
      const response = await api.put<Quest>("/quests", { id, questStatus });
      const updatedQuest = response.data;

      const newQuests = quests.map((item) =>
        item.id === updatedQuest.id ? updatedQuest : item
      );
      const orderedQuests = reorderQuests(newQuests);
      setQuests(orderedQuests);
    } catch (error: any) {
      throw new Error(error.message);
    }

    return;
  };

  const deleteQuest = async (id: string) => {
    try {
      const response = await api.delete<Quest>("/quests", { data: { id } });
      const deletedQuest = response.data;

      const newQuests = quests.filter((item) => item.id !== deletedQuest.id);
      setQuests(newQuests);
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

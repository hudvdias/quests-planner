import { gql } from "graphql-request";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { graphcms } from "../../services/graphCMS";

const getQuestsByUserEmail = gql`
  query GetQuestsByUserEmail($email: String!) {
    quests: quests(where: { nextAuthUser: { email: $email } }) {
      id
      title
      questStatus
      category {
        id
        title
      }
    }
  }
`;

const CreateQuestWithUserEmail = gql`
  mutation CreateQuestWithUserEmail(
    $title: String!
    $questStatus: QuestStatus!
    $email: String!
    $routine: Boolean!
  ) {
    questId: createQuest(
      data: {
        title: $title
        questStatus: $questStatus
        nextAuthUser: { connect: { email: $email } }
        routine: $routine
      }
    ) {
      id
    }
  }
`;

const ChangeQuestStatusById = gql`
  mutation ChangeQuestStatusById($id: ID!, $questStatus: QuestStatus!) {
    questId: updateQuest(
      data: { questStatus: $questStatus }
      where: { id: $id }
    ) {
      id
    }
  }
`;

const DeleteQuestById = gql`
  mutation DeleteQuestById($id: ID!) {
    deletedQuestId: deleteQuest(where: { id: $id }) {
      id
    }
  }
`;

const QuestsApi: NextApiHandler = async (request, response) => {
  const session = await getSession({ req: request });

  if (request.method === "GET") {
    if (!session?.user) {
      return response.status(401).json({ error: "User not found." });
    }

    try {
      const { quests } = await graphcms.request(getQuestsByUserEmail, {
        email: session.user.email,
      });

      return response.status(200).json({ quests });
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  } else if (request.method === "POST") {
    const { title } = request.body;

    if (!session?.user) {
      return response.status(401).json({ error: "User not found." });
    }

    if (!title) {
      return response.status(400).json({ error: "Title is required." });
    }

    try {
      const { questId } = await graphcms.request(CreateQuestWithUserEmail, {
        title,
        questStatus: "todo",
        email: session.user.email,
        routine: false, //Future feature data
      });

      return response.status(201).json({ questId });
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  } else if (request.method === "PUT") {
    const { id, questStatus } = request.body;

    if (!id && !questStatus) {
      return response
        .status(400)
        .json({ error: "Id and questStatus is required." });
    }

    try {
      const { questId } = await graphcms.request(ChangeQuestStatusById, {
        id,
        questStatus,
      });

      response.status(200).json({ questId });
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  } else if (request.method === "DELETE") {
    const { id } = request.body;

    if (!id) {
      return response.status(400).json({ error: "Id is required." });
    }

    try {
      const deletedQuestId = await graphcms.request(DeleteQuestById, { id });

      return response.status(200).json({ deletedQuestId });
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  } else {
    response.status(405).end("Method not allowed.");
  }
};

export default QuestsApi;

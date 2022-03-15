import { gql } from "graphql-request";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { graphcms } from "../../services/graphCMS";

const GetCategoriesByUserEmail = gql`
  query GetCategoriesByUserEmail($email: String!) {
    categories: categories(where: { nextAuthUser: { email: $email } }) {
      id
      title
      quests {
        ... on Quest {
          id
        }
      }
    }
  }
`;

const CategoriesApi: NextApiHandler = async (request, response) => {
  const session = await getSession({ req: request });

  if (request.method === "GET") {
    if (!session?.user) {
      return response.status(401).json({ error: "User not found." });
    }

    try {
      const { categories } = await graphcms.request(GetCategoriesByUserEmail, {
        email: session.user.email,
      });

      return response.status(200).json(categories);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  } else {
    response.status(405).end("Method not allowed.");
  }
};

export default CategoriesApi;

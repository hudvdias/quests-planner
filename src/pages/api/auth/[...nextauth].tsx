import { gql } from "graphql-request";
import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { graphcms } from "../../../services/graphCMS";

const GetNextAuthUserByEmail = gql`
  query GetNextAuthUserByEmail($email: String!) {
    user: nextAuthUser(where: { email: $email }) {
      id
    }
  }
`;

const CreateNextAuthUserByEmail = gql`
  mutation CreateNextAuthUserByEmail(
    $name: String!
    $email: String!
    $image: String!
  ) {
    newUser: createNextAuthUser(
      data: { name: $name, email: $email, image: $image }
    ) {
      id
    }
  }
`;

export default nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      try {
        const { user: myUser } = await graphcms.request(
          GetNextAuthUserByEmail,
          { email: user.email }
        );

        if (!myUser) {
          await graphcms.request(CreateNextAuthUserByEmail, {
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }

        return true;
      } catch {
        return false;
      }
    },
  },
});

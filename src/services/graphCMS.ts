import { GraphQLClient } from "graphql-request";

export const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT!, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN!}`,
  },
});

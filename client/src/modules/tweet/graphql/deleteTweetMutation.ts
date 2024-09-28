import { gql } from "@apollo/client";

export const DELETE_TWEET = gql`
  mutation removeTweet($id: ID!) {
    removeTweet(id: $id) {
      content
    }
  }
`;

import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation createComment($content: String!, $tweetId: ID!) {
    createComment(
      createCommentInput: { content: $content, tweetId: $tweetId }
    ) {
      id
    }
  }
`;

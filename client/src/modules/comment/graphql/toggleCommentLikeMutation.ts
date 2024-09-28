import { gql } from "@apollo/client";

export const TOGGLE_COMMENT_LIKE = gql`
  mutation toggleCommentLike($id: ID!) {
    toggleCommentLike(id: $id) {
      id
    }
  }
`;

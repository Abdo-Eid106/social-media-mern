import { gql } from "@apollo/client";

export const TOGGLE_FOLLOW = gql`
  mutation toggleFollow($userId: ID!) {
    toggleFollow(userId: $userId) {
      createdAt
    }
  }
`;

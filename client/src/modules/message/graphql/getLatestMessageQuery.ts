import { gql } from "@apollo/client";

export const GET_LATEST_MESSAGE = gql`
  query latestMessage($chatId: ID!) {
    latestMessage(chatId: $chatId) {
      id
      content
      user {
        id
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const READ_MESSAGES = gql`
  mutation readMessages($chatId: ID!) {
    readMessages(getMessagesInput: { chatId: $chatId }) {
      id
    }
  }
`;

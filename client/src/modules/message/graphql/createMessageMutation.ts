import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
  mutation createMessage($content: String!, $chatId: ID!) {
    message: createMessage(
      createMessageInput: { content: $content, chatId: $chatId }
    ) {
      content
      user {
        id
        firstname
        username
      }
    }
  }
`;

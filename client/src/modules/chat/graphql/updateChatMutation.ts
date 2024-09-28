import { gql } from "@apollo/client";

export const UPDATE_CHAT = gql`
  mutation updateChat($id: ID!, $name: String) {
    updateChat(updateChatInput: { name: $name, id: $id }) {
      id
      name
      isGroup
      users {
        id
        username
      }
      messages {
        content
        user {
          id
          firstname
          username
        }
      }
      latestMessage {
        content
        user {
          username
        }
      }
    }
  }
`;

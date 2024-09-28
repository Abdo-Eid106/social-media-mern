import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
  mutation createChat($name: String, $users: [ID!]!) {
    createChat(createChatInput: { name: $name, users: $users }) {
      name
      users {
        username
      }
      isGroup
    }
  }
`;

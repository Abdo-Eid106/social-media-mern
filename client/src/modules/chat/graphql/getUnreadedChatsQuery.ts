import { gql } from "@apollo/client";

export const GET_UNREADED_CHATS = gql`
  query {
    chats: unreadedChats {
      id
    }
  }
`;

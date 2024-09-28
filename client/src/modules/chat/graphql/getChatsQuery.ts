import { gql } from "@apollo/client";
import { USER_FIELDS } from "../../../shared/fragments/userFragment";

export const GET_CHATS = gql`
  ${USER_FIELDS}
  query {
    chats {
      id
      name
      isGroup
      createdAt
      latestMessage {
        content
        user {
          ...UserFields
        }
        readBy {
          id
        }
      }
      users {
        ...UserFields
      }
    }
  }
`;

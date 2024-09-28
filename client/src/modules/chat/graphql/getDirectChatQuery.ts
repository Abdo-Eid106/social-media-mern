import { gql } from "@apollo/client";
import { USER_FIELDS } from "../../../shared/fragments/userFragment";

export const GET_DIRECT_CHAT = gql`
  ${USER_FIELDS}
  query getDirectChat($userId: ID!) {
    chat: getDirectChat(userId: $userId) {
      id
      name
      isGroup
      users {
        ...UserFields
      }
      messages {
        content
        user {
          ...UserFields
        }
      }
      latestMessage {
        content
        user {
          ...UserFields
        }
      }
    }
  }
`;

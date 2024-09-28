import { gql } from "@apollo/client";
import { USER_FIELDS } from "../../../shared/fragments/userFragment";

export const GET_CHAT = gql`
  ${USER_FIELDS}
  query getChat($id: ID!) {
    chat(id: $id) {
      id
      name
      isGroup
      users {
        id
        ...UserFields
      }
      messages {
        id
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

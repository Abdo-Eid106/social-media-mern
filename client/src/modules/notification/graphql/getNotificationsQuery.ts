import { gql } from "@apollo/client";
import { USER_FIELDS } from "../../../shared/fragments/userFragment";

export const GET_NOTIFICATIONS = gql`
  ${USER_FIELDS}
  query {
    notifications(orderBy: { createdAt: DESC }) {
      id
      opened
      type
      from {
        ...UserFields
      }
      entityId
    }
  }
`;

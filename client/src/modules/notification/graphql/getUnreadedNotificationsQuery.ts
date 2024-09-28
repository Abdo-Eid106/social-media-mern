import { gql } from "@apollo/client";

export const GET_UNREADED_NOTIFICATIONS = gql`
  query {
    notifications(
      getNotificationsInput: { readed: false }
      orderBy: { createdAt: DESC }
    ) {
      id
    }
  }
`;

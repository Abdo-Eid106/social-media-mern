import { gql } from "@apollo/client";

export const MARK_NOTFICIATION_AS_OPENED = gql`
  mutation markAsOpened($id: ID!) {
    markAsOpened(id: $id) {
      id
    }
  }
`;

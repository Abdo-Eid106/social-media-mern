import { gql } from "@apollo/client";

export const READ_MESSAGE = gql`
  mutation readMessage($id: ID!) {
    readMessage(id: $id) {
      id
    }
  }
`;

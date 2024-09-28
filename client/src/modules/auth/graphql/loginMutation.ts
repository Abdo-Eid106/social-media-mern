import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    token: login(loginInput: { email: $email, password: $password })
  }
`;

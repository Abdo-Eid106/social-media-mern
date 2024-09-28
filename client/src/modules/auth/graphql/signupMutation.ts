import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signup(
    $firstname: String!
    $lastname: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      signupInput: {
        firstname: $firstname
        lastname: $lastname
        username: $username
        email: $email
        password: $password
      }
    ) {
      username
    }
  }
`;

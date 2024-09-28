import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation resetPassword($password: String!, $resetToken: String!) {
    resetPassword(
      resetPasswordInput: { password: $password, resetToken: $resetToken }
    )
  }
`;

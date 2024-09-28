import { gql } from "@apollo/client";
import { USER_FIELDS } from "./userFragment";

export const FOLLOWER_FIELDS = gql`
  ${USER_FIELDS}
  fragment FollowerFields on User {
    id
    ...UserFields
    followers {
      id
    }
    followings {
      id
    }
  }
`;

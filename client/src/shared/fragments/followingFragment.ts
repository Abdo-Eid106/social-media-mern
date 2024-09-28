import { gql } from "@apollo/client";
import { USER_FIELDS } from "./userFragment";

export const FOLLOWING_FIELDS = gql`
  ${USER_FIELDS}
  fragment FollowingFields on User {
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

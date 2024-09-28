import { gql } from "@apollo/client";
import { USER_FIELDS } from "../../../shared/fragments/userFragment";
import { FOLLOWER_FIELDS } from "../../../shared/fragments/followerFragment";
import { FOLLOWING_FIELDS } from "../../../shared/fragments/followingFragment";

export const GET_ME = gql`
  ${USER_FIELDS}
  ${FOLLOWER_FIELDS}
  ${FOLLOWING_FIELDS}
  query {
    me {
      id
      ...UserFields
      followers {
        ...FollowerFields
      }
      followings {
        ...FollowingFields
      }
    }
  }
`;
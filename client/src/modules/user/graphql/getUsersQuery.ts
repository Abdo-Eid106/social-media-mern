import { gql } from "@apollo/client";
import { USER_FIELDS } from "../../../shared/fragments/userFragment";
import { FOLLOWER_FIELDS } from "../../../shared/fragments/followerFragment";
import { FOLLOWING_FIELDS } from "../../../shared/fragments/followingFragment";

export const GET_USERS = gql`
  ${USER_FIELDS}
  ${FOLLOWER_FIELDS}
  ${FOLLOWING_FIELDS}
  query users($username: String) {
    users(filter: { username: { contains: $username } }) {
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

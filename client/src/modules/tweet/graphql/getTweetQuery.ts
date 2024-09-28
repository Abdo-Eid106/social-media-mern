import { gql } from "@apollo/client";
import { USER_FIELDS } from "../../../shared/fragments/userFragment";

export const GET_TWEET = gql`
  ${USER_FIELDS}
  query tweet($id: ID!) {
    tweet(id: $id) {
      id
      content
      createdAt
      user {
        ...UserFields
      }
      likes {
        id
        user {
          id
        }
      }
      comments {
        id
        content
        createdAt
        user {
          ...UserFields
        }
        likes {
          id
          user {
            id
          }
        }
      }
      retweets {
        user {
          id
        }
      }
    }
  }
`;

import { gql } from "@apollo/client";
import { USER_FIELDS } from "./userFragment";

export const TWEET_FIELDS = gql`
  ${USER_FIELDS}
  fragment TweetFields on Tweet {
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
    }
    retweets {
      user {
        id
      }
    }
  }
`;

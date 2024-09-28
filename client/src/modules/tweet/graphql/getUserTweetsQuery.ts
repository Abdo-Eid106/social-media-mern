import { gql } from "@apollo/client";
import { TWEET_FIELDS } from "../../../shared/fragments/tweetFragment";

export const GET_USER_TWEETS = gql`
  ${TWEET_FIELDS}
  query getUserTweets($userId: ID!) {
    tweets(getTweetsInput: { userId: $userId }, orderBy: { createdAt: DESC }) {
      ...TweetFields
      originalTweet {
        ...TweetFields
      }
    }
  }
`;

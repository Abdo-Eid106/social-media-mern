import { gql } from "@apollo/client";

export const TOGGLE_TWEET_LIKE = gql`
  mutation ToggleTweetLike($tweetId: ID!) {
    toggleTweetLike(tweetId: $tweetId) {
      id
    }
  }
`;

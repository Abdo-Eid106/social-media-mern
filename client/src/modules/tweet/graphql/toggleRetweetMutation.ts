import { gql } from "@apollo/client";

export const TOGGLE_RETWEET = gql`
  mutation toggleRetweet($tweetId: ID!) {
    toggleRetweet(tweetId: $tweetId) {
      id
    }
  }
`;

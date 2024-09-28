import { gql } from "@apollo/client";

export const CREATE_TWEET = gql`
  mutation createTweet($content: String!) {
    tweet: createTweet(createTweetInput: { content: $content }) {
      content
    }
  }
`;

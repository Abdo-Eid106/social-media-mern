import { gql } from "@apollo/client";
import { TWEET_FIELDS } from "../../../shared/fragments/tweetFragment";

export const GET_HOME_TWEETS = gql`
  ${TWEET_FIELDS}
  query homeTweets($content: String) {
    tweets: homeTweets(
      getTweetsInput: { content: { contains: $content } }
      orderBy: { createdAt: DESC }
    ) {
      ...TweetFields
      originalTweet {
        ...TweetFields
      }
    }
  }
`;

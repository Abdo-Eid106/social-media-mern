import { useQuery } from "@apollo/client";
import { ITweet } from "../models/tweetModel";
import { GET_HOME_TWEETS } from "../graphql/getHomeTweetsQuery";
import { toast } from "react-toastify";

export const useFetchTweets = (search: string) => {
  const { data, loading, error, refetch } = useQuery<{
    tweets: ITweet[];
  }>(GET_HOME_TWEETS, {
    variables: { content: search },
    fetchPolicy: "no-cache",
  });
  if (error) toast.error(error.message);

  return {
    tweets: data?.tweets || [],
    loading,
    refetchTweets: refetch,
  };
};

import { useContext } from "react";
import { PrimaryContext } from "../../primary";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import {
  useFetchTweets,
  ITweet,
  CREATE_TWEET,
  Tweets,
  CreateTweet,
} from "../../tweet";

const Home = ({ title }: { title: string }) => {
  const { me } = useContext(PrimaryContext);

  const { tweets, loading, refetchTweets } = useFetchTweets("");
  const [createTweet, { error: createTweetError }] = useMutation<{
    tweet: ITweet;
  }>(CREATE_TWEET, {
    fetchPolicy: "no-cache",
    onCompleted: () => refetchTweets(),
  });
  const handleCreateTweet = (content: string) =>
    createTweet({ variables: { content } });

  if (createTweetError) return toast.error(createTweetError.message);
  if (loading) return <div>Loading...</div>;

  return (
    <div className="mainSectionContainer col-10 col-md-8 col-lg-6">
      <div className="titleContainer">
        <h1>{title}</h1>
      </div>
      <CreateTweet user={me} handleCreateTweet={handleCreateTweet} />
      {<Tweets tweets={tweets} refetchTweets={refetchTweets} />}
    </div>
  );
};

export default Home;

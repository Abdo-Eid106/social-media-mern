import { ITweet } from "../models/tweetModel";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TWEET } from "../graphql/getTweetQuery";
import { toast } from "react-toastify";
import { Comment } from "../../comment";
import Tweet from "../components/Tweet";

interface ITWeetData {
  tweet: ITweet;
}

const TweetPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error } = useQuery<ITWeetData>(GET_TWEET, {
    variables: { id },
    fetchPolicy: "no-cache",
  });

  if (loading) return <div>Loading...</div>;
  if (error) {
    navigate("/");
    return toast.error(error.message);
  }

  const tweet = data?.tweet as ITweet;
  return (
    <div className="mainSectionContainer col-10 col-md-8 col-lg-6">
      <div className="titleContainer">
        <h1>postPage</h1>
      </div>
      <div className="postsContainer">
        <Tweet tweet={tweet} />
      </div>
      {tweet.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} tweet={tweet} />
      ))}
    </div>
  );
};

export default TweetPage;

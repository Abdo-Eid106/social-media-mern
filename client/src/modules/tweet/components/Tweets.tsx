import { FaRetweet } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ITweet } from "../models/tweetModel";
import { TweetsContext } from "../contexts/tweetsContext";
import Tweet from "./Tweet";

const Tweets = ({
  tweets,
  refetchTweets,
}: {
  tweets: ITweet[];
  refetchTweets: () => void;
}) => {
  return (
    <TweetsContext.Provider value={{ refetchTweets }}>
      <div className="postsContainer">
        {tweets.map((tweet) => {
          if (tweet.originalTweet) {
            return (
              <div key={tweet.id}>
                <div className="postActionContainer">
                  <span>
                    <FaRetweet />
                    Retweeted by
                    <Link to={`/profile/${tweet.user.username}`}>
                      @{tweet.user.username}
                    </Link>
                  </span>
                </div>
                <Tweet tweet={tweet.originalTweet} />
              </div>
            );
          } else return <Tweet tweet={tweet} key={tweet.id} />;
        })}
      </div>
    </TweetsContext.Provider>
  );
};

export default Tweets;

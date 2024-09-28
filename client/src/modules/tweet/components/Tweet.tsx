import { ITweet } from "../models/tweetModel";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRetweet } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PrimaryContext } from "../../primary";
import { FaTimes } from "react-icons/fa";
import { DELETE_TWEET } from "../graphql/deleteTweetMutation";
import { TOGGLE_RETWEET } from "../graphql/toggleRetweetMutation";
import { CREATE_COMMENT } from "../../comment/graphql/createCommentMutation";
import { useMutation } from "@apollo/client";
import { TOGGLE_TWEET_LIKE } from "../graphql/toggleTweetLikeMutation";
import { toast } from "react-toastify";
import { formatDate } from "../../../shared/utils/formatDate";
import { TweetsContext } from "../contexts/tweetsContext";
import CommentModal from "./CommentModal";
import DeletePostModal from "./DeleteTweetModal";

function Tweet({ tweet }: { tweet: ITweet }) {
  const { me, socket } = useContext(PrimaryContext);
  const { refetchTweets } = useContext(TweetsContext);
  const navigate = useNavigate();

  const [likes, setLikes] = useState({
    count: tweet.likes.length,
    mylike: tweet.likes.some((like) => like.user.id == me.id),
  });
  const [retweets, setRetweets] = useState({
    count: tweet.retweets.length,
    myretweet: tweet.retweets.some((retweet) => retweet.user.id == me.id),
  });
  const [comments, setComments] = useState(tweet.comments.length);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [toggleTweetLike] = useMutation(TOGGLE_TWEET_LIKE, {
    onCompleted: () => {
      if (!likes.mylike && me.id != tweet.user.id) {
        socket.emit("notification", { userId: tweet.user.id });
      }
      setLikes((prev) => ({
        count: prev.count + (prev.mylike ? -1 : 1),
        mylike: !prev.mylike,
      }));
    },
    onError: (error) => toast.error(error.message),
    variables: { tweetId: tweet.id },
  });

  const [toggleRetweet] = useMutation(TOGGLE_RETWEET, {
    onCompleted: () => {
      if (!retweets.myretweet && me.id != tweet.user.id)
        socket.emit("notification", { userId: tweet.user.id });
      setRetweets((prev) => ({
        count: prev.count + (prev.myretweet ? -1 : 1),
        myretweet: !prev.myretweet,
      }));
    },
    onError: (error) => toast.error(error.message),
    variables: { tweetId: tweet.id },
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      if (tweet.user.id != me.id)
        socket.emit("notification", { userId: tweet.user.id });

      setComments((prev) => prev + 1);
      toggleCommentModal();
    },
    onError: (error) => toast.error(error.message),
    variables: { tweetId: tweet.id },
  });

  const [deleteTweet] = useMutation(DELETE_TWEET, {
    onCompleted: () => {
      toggleDeleteModal();
      refetchTweets();
    },
    onError: (error) => toast.error(error.message),
    variables: { id: tweet.id },
  });

  const toggleCommentModal = () => setShowCommentModal(!showCommentModal);
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  return (
    <>
      <div
        className="post"
        data-id={tweet.id}
        onClick={() => navigate("/tweet/" + tweet.id)}
      >
        <div className="mainContentContainer">
          <div className="userImageContainer">
            <img src={tweet.user.profilePhoto} alt={tweet.user.username} />
          </div>
          <div className="postContentContainer">
            <div className="header">
              <Link className="displayName" to={`/profile/${tweet.user.id}`}>
                {tweet.user.firstname + " " + tweet.user.lastname}
              </Link>
              <span className="username">@ {tweet.user.username}</span>
              <span className="date">{`${formatDate(
                new Date(tweet.createdAt)
              )}`}</span>
              {me.id == tweet.user.id ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleDeleteModal();
                  }}
                >
                  <FaTimes />
                </button>
              ) : null}
            </div>
            <div className="postBody">
              <span>{tweet.content}</span>
            </div>
            <div className="postFooter">
              <div className="postButtonContainer">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleCommentModal();
                  }}
                >
                  <FaRegComment />
                  <span>{comments}</span>
                </button>
              </div>
              <div className="postButtonContainer green">
                <button
                  className={`retweetButton ${
                    retweets.myretweet ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleRetweet();
                  }}
                >
                  <FaRetweet />
                  <span>{retweets.count}</span>
                </button>
              </div>
              <div className="postButtonContainer red">
                <button
                  className={`likeButton ${likes.mylike ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleTweetLike();
                  }}
                >
                  <AiOutlineHeart />
                  <span> {likes.count}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommentModal
        show={showCommentModal}
        toggle={toggleCommentModal}
        tweet={tweet}
        createComment={createComment}
      />
      <DeletePostModal
        show={showDeleteModal}
        toggle={toggleDeleteModal}
        deleteTweet={deleteTweet}
      />
    </>
  );
}

export default Tweet;

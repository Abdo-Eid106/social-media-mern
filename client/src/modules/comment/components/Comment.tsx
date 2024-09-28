import { IComment } from "../models/commentModel";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { ITweet } from "../../tweet";
import { useContext, useState } from "react";
import { PrimaryContext } from "../../primary";
import { TOGGLE_COMMENT_LIKE } from "../graphql/toggleCommentLikeMutation";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { formatDate } from "../../../shared/utils/formatDate";

const Comment = ({ comment, tweet }: { comment: IComment; tweet: ITweet }) => {
  const { me, socket } = useContext(PrimaryContext);

  const [likes, setLikes] = useState({
    count: comment.likes.length,
    mylike: comment.likes.some((like) => like.user.id == me.id),
  });

  const [toggleCommentLike] = useMutation(TOGGLE_COMMENT_LIKE, {
    onCompleted: () => {
      const newLikes = {
        count: likes.count + (likes.mylike ? -1 : 1),
        mylike: !likes.mylike,
      };
      if (!likes.mylike && me.id != comment.user.id) {
        socket.emit("notification", { userId: comment.user.id });
      }
      setLikes(newLikes);
    },
    onError: (error) => toast.error(error.message),
    variables: { id: comment.id },
  });

  return (
    <div className="post" data-id={comment.id}>
      <div className="mainContentContainer">
        <div className="userImageContainer">
          <img src={comment.user.profilePhoto} alt={comment.user.username} />
        </div>
        <div className="postContentContainer">
          <div className="header">
            <Link
              className="displayName"
              to={`/profile/${comment.user.username}`}
            >
              {comment.user.firstname + " " + comment.user.lastname}
            </Link>
            <span className="username">@ {comment.user.username}</span>
            <span className="date">{`${formatDate(
              new Date(comment.createdAt)
            )}`}</span>
          </div>
          <div className="replyFlag">
            Replying to{" "}
            <Link to={`/profile/${tweet.user.username}`}>
              @{tweet.user.username}
            </Link>
          </div>
          <div className="postBody">
            <span>{comment.content}</span>
          </div>
          <div className="postFooter">
            <div className="postButtonContainer red">
              <button
                className={`likeButton ${likes.mylike ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleCommentLike();
                }}
              >
                <AiOutlineHeart />
                <span>{likes.count} </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;

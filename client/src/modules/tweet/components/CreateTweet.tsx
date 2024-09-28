import React from "react";
import { IUser } from "../../user";

const CreateTweet = ({
  user,
  handleCreateTweet,
}: {
  user: IUser;
  handleCreateTweet: (content: string) => void;
}) => {
  const [postContent, setPostContent] = React.useState<string>("");

  return (
    <div className="postFormContainer">
      <div className="userImageContainer">
        <img src={user.profilePhoto} alt={user.username} />
      </div>
      <div className="textareaContainer">
        <textarea
          id="postTextarea"
          placeholder="What's happening?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <div className="buttonsContainer">
          <button
            id="submitPostButton"
            disabled={postContent.length == 0}
            onClick={() => {
              handleCreateTweet(postContent);
              setPostContent("");
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;

import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { PrimaryContext } from "../../primary";
import { ITweet } from "../models/tweetModel";
import Tweet from "./Tweet";

function CommentModal({
  show,
  toggle,
  tweet,
  createComment,
}: {
  show: boolean;
  toggle: () => void;
  tweet: ITweet;
  createComment: ({
    variables: { content },
  }: {
    variables: { content: string };
  }) => void;
}) {
  const { me } = useContext(PrimaryContext);
  const [content, setContent] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleTextareaChange = (e: any) => {
    const value = e.target.value;
    setContent(value);
    setIsSubmitDisabled(!value.trim());
  };

  return (
    <Modal show={show} onHide={toggle} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reply</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="originalPostContainer">
          <Tweet tweet={tweet} />
        </div>
        <div className="postFormContainer">
          <div className="userImageContainer">
            <img src={me.profilePhoto} alt={me.username} />
          </div>
          <div className="textareaContainer">
            <textarea
              id="replyTextarea"
              placeholder="What's happening?"
              value={content}
              onChange={handleTextareaChange}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            createComment({ variables: { content } }), setContent("");
          }}
          disabled={isSubmitDisabled}
        >
          Reply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommentModal;

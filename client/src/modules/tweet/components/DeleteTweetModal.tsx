import { Modal, Button } from "react-bootstrap";

function DeletePostModal({
  show,
  toggle,
  deleteTweet,
}: {
  show: boolean;
  toggle: () => void;
  deleteTweet: () => void;
}) {
  return (
    <Modal show={show} onHide={toggle} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete the post?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You won't be able to recover this post after deleting it.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
        <Button variant="danger" onClick={() => deleteTweet()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeletePostModal;

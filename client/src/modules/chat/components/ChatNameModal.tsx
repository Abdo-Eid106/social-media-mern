import { useContext } from "react";
import { PrimaryContext } from "../../primary";
import { useState } from "react";
import { getChatName } from "../utils/getChatName";
import { UPDATE_CHAT } from "../graphql/updateChatMutation";
import { toast } from "react-toastify";
import { Modal, Form, Button } from "react-bootstrap";
import { chatContext } from "../contexts/chatContext";
import { useMutation } from "@apollo/client";

const ChatNameModal = () => {
  const { me } = useContext(PrimaryContext);
  const { chat, setChat, showModal, setShowModal } = useContext(chatContext);
  const [newChatName, setNewChatName] = useState(
    getChatName(chat, me) as string
  );

  const [updateChatName] = useMutation(UPDATE_CHAT, {
    onError: (error) => toast.error(error.message),
    onCompleted: () => {
      setChat({ ...chat, name: newChatName });
      setShowModal(false);
    },
    variables: { id: chat.id },
  });

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change the chat name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Enter a name for this chat"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => updateChatName({ variables: { name: newChatName } })}
          disabled={newChatName?.length === 0}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatNameModal;

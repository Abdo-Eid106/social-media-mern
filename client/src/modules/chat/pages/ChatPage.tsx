import { IChat } from "../models/chatModel";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { chatContext } from "../contexts/chatContext";
import { PrimaryContext } from "../../primary";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_MESSAGE, READ_MESSAGE, IMessage, Message } from "../../message";
import { GET_CHAT } from "../graphql/getChatQuery";
import { toast } from "react-toastify";
import ChatTitle from "../components/ChatTitle";
import ChangeChatNameModal from "../components/ChatNameModal";

const Chat = () => {
  const { id: chatId } = useParams() as { id: string };
  const { socket, refetchUnreadedChats } = useContext(PrimaryContext);
  const [chat, setChat] = useState({} as IChat);
  const [showModal, setShowModal] = useState(false);
  const [typing, setTyping] = useState(false);
  const [message, setMessage] = useState("");

  const { loading: chatLoading } = useQuery<{ chat: IChat }>(GET_CHAT, {
    variables: { id: chatId },
    fetchPolicy: "no-cache",
    onCompleted: ({ chat }) => setChat(chat),
    onError: (error) => toast.error(error.message),
  });

  const [createMessage] = useMutation<{ message: IMessage }>(CREATE_MESSAGE, {
    onCompleted: ({ message }) => {
      setChat({ ...chat, messages: [...chat.messages, message] });
      socket.emit("message", { chatId });
      setMessage("");
    },
    onError: (error) => toast.error(error.message),
    variables: { chatId },
  });

  const [readMessage] = useMutation(READ_MESSAGE, {
    onError: (error) => toast.error(error.message),
  });

  useEffect(() => {
    if (!socket) return;
    const handleMessage = async (message: IMessage) => {
      await readMessage({ variables: { id: message.id } });
      setChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, message],
      }));
      refetchUnreadedChats();
    };

    const handleTyping = () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 1500);
    };

    socket.emit("joinChat", { chatId });
    socket.on("chatpage: message", handleMessage);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("chatpage: message", handleMessage);
      socket.off("typing", handleTyping);
      socket.emit("leaveChat", { chatId: chat.id });
    };
  }, [chatId, socket]);

  if (chatLoading || Object.keys(chat).length == 0)
    return <div>Loading...</div>;

  return (
    <div className="mainSectionContainer col-10 col-md-8 col-lg-6">
      <chatContext.Provider
        value={{
          showModal,
          setShowModal,
          chat,
          setChat,
        }}
      >
        <div className="titleContainer">
          <h1>Chat</h1>
        </div>
        <div className="chatPageContainer">
          <ChatTitle />
          <div className="mainContentContainer">
            <div className="chatContainer" style={{ visibility: "visible" }}>
              <ul className="chatMessages">
                {chat.messages.map((message, index, messages) => {
                  return (
                    <Message
                      pre={messages[index - 1]}
                      message={message}
                      next={messages[index + 1]}
                      key={message.id}
                    />
                  );
                })}
              </ul>

              <div
                className="typingDots"
                style={{
                  display: `${typing ? "block" : "none"}`,
                }}
              >
                <img src="/images/dots.gif" alt="Typing dots" />
              </div>
              <div className="footer">
                <textarea
                  className="inputTextbox"
                  name="messageInput"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (socket) socket.emit("typing", { chatId: chat.id });
                  }}
                ></textarea>
                <button
                  className="sendMessageButton"
                  hidden={message.length == 0}
                  onClick={() =>
                    createMessage({ variables: { content: message } })
                  }
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
        {chat.isGroup ? <ChangeChatNameModal /> : null}
      </chatContext.Provider>
    </div>
  );
};

export default Chat;

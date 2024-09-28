import { IChat } from "../models/chatModel";
import { PrimaryContext } from "../../primary";
import { useContext } from "react";
import { IUser } from "../../user";
import { getChatName } from "../utils/getChatName";
import { useNavigate, Link } from "react-router-dom";
import { READ_MESSAGES } from "../../message";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const ChatItem = ({ chat }: { chat: IChat }) => {
  const { me, refetchUnreadedChats } = useContext(PrimaryContext);

  const otherUser = chat.users.find((user) => user.id != me.id) as IUser;
  const navigate = useNavigate();

  const [readChat] = useMutation(READ_MESSAGES, {
    onError: (error) => toast.error(error.message),
    onCompleted: () => {
      refetchUnreadedChats();
      navigate(`/chats/${chat.id}`);
    },
    variables: { chatId: chat.id },
  });

  return (
    <Link
      to={`/chats/${chat.id}`}
      className={`resultListItem ${
        chat.latestMessage
          ? chat.latestMessage.readBy.every((user) => user.id != me.id)
            ? "active"
            : ""
          : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        readChat();
      }}
    >
      <div
        className={`${
          chat.isGroup ? "groupChatImage" : ""
        } resultsImageContainer`}
      >
        {chat.isGroup ? (
          <>
            <img
              src={chat.users[0].profilePhoto}
              alt={chat.users[0].username}
            />
            <img
              src={chat.users[1].profilePhoto}
              alt={chat.users[1].username}
            />
          </>
        ) : (
          <img src={otherUser?.profilePhoto} alt={otherUser?.username} />
        )}
      </div>
      <div className="resultsDetailsContainer ellipsis">
        <span className="heading ellipsis">{getChatName(chat, me)}</span>
        <span className="subText ellipsis">
          {chat.latestMessage
            ? chat.latestMessage.user.username +
              ": " +
              chat.latestMessage.content
            : "New Chat"}
        </span>
      </div>
    </Link>
  );
};

export default ChatItem;

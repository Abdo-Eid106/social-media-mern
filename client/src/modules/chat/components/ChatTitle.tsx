import { useContext } from "react";
import { getChatName } from "../utils/getChatName";
import { PrimaryContext } from "../../primary";
import { IUser } from "../../user";
import { chatContext } from "../contexts/chatContext";

const ChatTitle = () => {
  const { me } = useContext(PrimaryContext);
  const { setShowModal, chat } = useContext(chatContext);
  const count = chat.users.length;
  const otherUser = chat.users.find((user) => user.id != me.id) as IUser;

  return (
    <div className="chatTitleBarContainer">
      <div className="chatImagesContainer">
        {chat.isGroup ? (
          count > 3 ? (
            <div className="userCount">
              <span>{"+" + String(count - 3)}</span>{" "}
            </div>
          ) : null
        ) : null}
        {chat.isGroup ? (
          chat.users.slice(0, 3).map((user) => {
            return (
              <img src={user.profilePhoto} alt={user.username} key={user.id} />
            );
          })
        ) : (
          <img
            src={otherUser.profilePhoto}
            alt={otherUser.username}
            key={otherUser.id}
          />
        )}
      </div>
      <span
        id="chatName"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        {getChatName(chat, me)}
      </span>
    </div>
  );
};

export default ChatTitle;

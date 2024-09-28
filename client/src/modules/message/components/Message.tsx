import { IMessage } from "../models/messageModel";
import { useContext } from "react";
import { PrimaryContext } from "../../primary";

const Message = ({
  pre,
  message,
  next,
}: {
  pre?: IMessage;
  message: IMessage;
  next?: IMessage;
}) => {
  const { me } = useContext(PrimaryContext);
  const myMessage = message.user.id == me.id;

  return (
    <li className={`message ${myMessage ? "mine" : "theirs"} first last`}>
      <div className="imageContainer">
        {next?.user.id != message.user.id && !myMessage ? (
          <img src={message.user.profilePhoto} alt={message.user.username} />
        ) : null}
      </div>
      <div className="messageContainer">
        {pre?.user.id != message.user.id && !myMessage ? (
          <span className="senderName">{message.user.username}</span>
        ) : null}
        <span className="messageBody">{message.content}</span>
      </div>
    </li>
  );
};

export default Message;

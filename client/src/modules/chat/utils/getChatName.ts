import { IUser } from "../../user";
import { IChat } from "../models/chatModel";

export const getChatName = (chat: IChat, me: IUser) => {
  return chat.isGroup
    ? chat.name
      ? chat.name
      : chat.users
          .slice(0, 3)
          .map((user) => user.username)
          .join(", ") + (chat.users.length > 3 ? "..." : "")
    : chat.users.find((user) => user.id != me.id)?.username;
};

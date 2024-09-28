import { createContext } from "react";
import { IChat } from "../models/chatModel";

interface IChatContext {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  chat: IChat;
  setChat: (chat: IChat) => void;
}

export const chatContext = createContext({} as IChatContext);

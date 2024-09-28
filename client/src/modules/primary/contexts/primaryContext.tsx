import { createContext } from "react";
import { IUser } from "../../user";
import { Socket } from "socket.io-client";

export const PrimaryContext = createContext(
  {} as {
    me: IUser;
    socket: Socket;
    setMe: Function;
    refetchUnreadedChats: Function;
    refetchUnreadedNotifications: Function;
  }
);

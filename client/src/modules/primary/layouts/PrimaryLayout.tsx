import { Outlet, useLoaderData } from "react-router-dom";
import { IUser } from "../../user";
import {
  INotification,
  GET_UNREADED_NOTIFICATIONS,
  ToastNotification,
} from "../../notification";
import { IChat, GET_UNREADED_CHATS } from "../../chat";
import { PrimaryContext } from "../contexts/primaryContext";
import { GlobalStyle } from "../styles/primary.styles";
import { toast } from "react-toastify";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Sidebar from "../components/Sidebar";

let socket: Socket;
const PrimaryLayout = () => {
  const data = useLoaderData() as {
    user: IUser;
  };
  const [me, setMe] = useState(data.user);

  const {
    data: unreadedNotificationsData,
    error: unreadedNotificationsError,
    refetch: refetchUnreadedNotifications,
  } = useQuery<{ notifications: INotification[] }>(GET_UNREADED_NOTIFICATIONS, {
    fetchPolicy: "no-cache",
  });

  const {
    data: unreadedChatsData,
    error: unreadedChatsError,
    refetch: refetchUnreadedChats,
  } = useQuery<{ chats: IChat[] }>(GET_UNREADED_CHATS, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    socket = io("http://localhost:3000", {
      query: { userId: data.user.id },
    });

    const notificationListener = (notification: INotification) => {
      refetchUnreadedNotifications();
      toast(<ToastNotification notification={notification} />, {
        position: "top-right",
      });
    };

    socket.on("notification", notificationListener);
    socket.on("homepage: message", () => {
      refetchUnreadedChats();
    });

    // Cleanup function
    return () => {
      socket.off("notification", notificationListener);
      socket.off("homepage: message", () => refetchUnreadedChats());
      socket.disconnect();
    };
  }, []);

  if (unreadedChatsError) toast.error(unreadedChatsError.message);
  if (unreadedNotificationsError)
    toast.error(unreadedNotificationsError.message);

  return (
    <>
      <GlobalStyle />
      <div className="wrapper">
        <div className="row">
          <PrimaryContext.Provider
            value={{
              me,
              setMe,
              socket,
              refetchUnreadedChats,
              refetchUnreadedNotifications,
            }}
          >
            <Sidebar
              unreadedNotifications={
                unreadedNotificationsData?.notifications || []
              }
              unreadedChats={unreadedChatsData?.chats || []}
            />
            <Outlet />
            <div className="d-none d-md-block col-md-2 col-lg-4"></div>
          </PrimaryContext.Provider>
        </div>
      </div>
    </>
  );
};

export default PrimaryLayout;

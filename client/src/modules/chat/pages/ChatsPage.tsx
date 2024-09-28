import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PrimaryContext } from "../../primary";
import { IChat } from "../models/chatModel";
import { GET_CHATS } from "../graphql/getChatsQuery";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import ChatItem from "../components/ChatItem";

const Chats = () => {
  const { socket } = useContext(PrimaryContext);
  const { data, loading, refetch } = useQuery<{ chats: IChat[] }>(GET_CHATS, {
    fetchPolicy: "no-cache",
    onError: (error) => toast.error(error.message),
  });

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = () => refetch();
    socket.on("chatspage: message", handleNewMessage);

    return () => {
      socket.off("chatspage: message", handleNewMessage);
    };
  }, [socket]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mainSectionContainer col-10 col-md-8 col-lg-6">
      <div className="titleContainer">
        <h1>Inbox</h1>
        <Link to="/chats/new">
          <FaPlusSquare />
        </Link>
      </div>
      <div className="resultsContainer">
        {data?.chats.map((chat) => (
          <ChatItem chat={chat} key={chat.id} />
        ))}
      </div>
    </div>
  );
};

export default Chats;

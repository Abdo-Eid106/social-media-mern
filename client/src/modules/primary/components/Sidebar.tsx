import { useNavigate } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { INotification } from "../../notification/models/notificationModel";
import { MARK_ALL_AS_READ } from "../../notification";
import { useContext } from "react";
import { PrimaryContext } from "../contexts/primaryContext";
import { Link } from "react-router-dom";
import { IChat } from "../../chat/models/chatModel";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { client } from "../../../shared/utils/Gql-client";

const Sidebar = ({
  unreadedNotifications,
  unreadedChats,
}: {
  unreadedNotifications: INotification[];
  unreadedChats: IChat[];
}) => {
  const { socket } = useContext(PrimaryContext);
  const { refetchUnreadedNotifications } = useContext(PrimaryContext);
  const [readNotifications] = useMutation(MARK_ALL_AS_READ, {
    onCompleted: () => {
      refetchUnreadedNotifications();
      navigate("/notifications");
    },
    onError: (error) => toast.error(error.message),
  });
  const navigate = useNavigate();

  return (
    <nav className="col-2">
      <Link className="blue" to="/">
        <FaTwitter />
      </Link>
      <Link to="/">
        <TiHome />
      </Link>
      <Link to="/search">
        <IoSearch />
      </Link>
      <Link
        to="/notifications"
        onClick={(e) => {
          e.preventDefault(), readNotifications();
        }}
      >
        <IoMdNotifications />
        <span
          id="notificationBadge"
          className={unreadedNotifications.length ? "active" : ""}
        >
          {unreadedNotifications.length}
        </span>
      </Link>
      <Link to="/chats">
        <MdEmail />
        <span
          id="messagesBadge"
          className={unreadedChats.length ? "active" : ""}
        >
          {unreadedChats.length}
        </span>
      </Link>
      <Link to="/profile">
        <FaUser />
      </Link>
      <Link
        to="/"
        onClick={async (e) => {
          e.preventDefault();
          localStorage.removeItem("token");
          socket.disconnect();
          await client.clearStore();
          navigate("/login");
        }}
      >
        <TbLogout />
      </Link>
    </nav>
  );
};

export default Sidebar;

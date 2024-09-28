import { useContext, useState, useEffect } from "react";
import { PrimaryContext } from "../../primary";
import { useFetchUsers } from "../../user";
import { Link, useNavigate } from "react-router-dom";
import { CREATE_CHAT } from "../graphql/createChatMutation";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const CreateChat = () => {
  const { me } = useContext(PrimaryContext);
  const [selectedUsers, setSelectedUsers] = useState([me]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { users, usersLoading } = useFetchUsers(debouncedSearch);
  const navigate = useNavigate();

  const [createChat] = useMutation(CREATE_CHAT, {
    onCompleted: () => {
      toast.success("Chat created successfully"), navigate("/chats");
    },
    onError: (error) => toast.error(error.message),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div className="chatPageContainer">
      <div className="chatTitleBar">
        <label htmlFor="userSearchTextbox">
          To:
          <div id="selectedUsers">
            {selectedUsers.map((user) =>
              user.id != me.id ? (
                <span className="selectedUser">
                  {user.firstname + " " + user.lastname}
                </span>
              ) : null
            )}
            <input
              id="userSearchTextbox"
              type="text"
              placeholder="Type the name of the person"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </label>
      </div>
      <div className="resultsContainer">
        {usersLoading
          ? "Loading..."
          : search == ""
          ? null
          : users
              .filter((user) =>
                selectedUsers.every((selected) => selected.id != user.id)
              )
              .map((user) => (
                <div
                  className="user"
                  onClick={() => {
                    setSelectedUsers([...selectedUsers, user]), setSearch("");
                  }}
                >
                  <div className="userImageContainer">
                    <img src={user.profilePhoto} alt={user.username} />
                  </div>
                  <div className="userDetailsContainer">
                    <div className="header">
                      <Link to={`/profile/${user.id}`}>
                        {user.firstname + " " + user.lastname}
                      </Link>
                      <span className="username">@{user.username}</span>
                    </div>
                  </div>
                </div>
              ))}
      </div>
      <button
        id="createChatButton"
        disabled={selectedUsers.length == 1}
        onClick={() => {
          createChat({
            variables: { users: selectedUsers.map((user) => user.id) },
          });
        }}
      >
        Create chat
      </button>
    </div>
  );
};

export default CreateChat;

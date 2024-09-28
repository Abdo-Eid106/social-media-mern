import { FollowButton } from "../../follow";
import { PrimaryContext } from "../../primary";
import { IUser } from "../models/userModel";
import { useContext } from "react";
import { Link } from "react-router-dom";

const User = ({ user }: { user: IUser }) => {
  const { me } = useContext(PrimaryContext);

  return (
    <div className="user">
      <div className="userImageContainer">
        <img src={user.profilePhoto} alt={user.firstname} />
      </div>
      <div className="userDetailsContainer">
        <div className="header">
          <Link to={`/profile/${user.id}`}>
            {user.firstname + " " + user.lastname}
          </Link>
          <span className="username">@{user.username}</span>
        </div>
      </div>
      {me.id != user.id ? (
        <div className="followButtonContainer">
          <FollowButton user={user} />
        </div>
      ) : null}
    </div>
  );
};

export default User;

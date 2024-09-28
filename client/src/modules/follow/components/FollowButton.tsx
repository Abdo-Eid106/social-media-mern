import { useToggleFollow } from "../hooks/useToggleFollow";
import { IUser } from "../../user";

const FollowButton = ({ user }: { user: IUser }) => {
  const { followData, toggleFollow } = useToggleFollow(user, user.id);

  return (
    <button
      className={`followButton ${followData.isFollowing ? "following" : ""}`}
      data-user={user.id}
      onClick={() => toggleFollow()}
    >
      {followData.isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;

import { useContext, useEffect, useState } from "react";
import { IUser } from "../../user";
import { PrimaryContext } from "../../primary";
import { useMutation } from "@apollo/client";
import { TOGGLE_FOLLOW } from "../graphql/toggleFollowMutation";
import { toast } from "react-toastify";

export const useToggleFollow = (user: IUser | undefined, userId: string) => {
  const { socket, me, setMe } = useContext(PrimaryContext);
  const [followData, setFollowData] = useState({
    followers: 0,
    isFollowing: false,
  });

  const [toggleFollow] = useMutation(TOGGLE_FOLLOW, {
    variables: { userId },
    onCompleted: () => {
      if (!followData.isFollowing) socket.emit("notification", { userId });
      setMe({
        ...me,
        followings: followData.isFollowing
          ? me.followings.filter((follower) => follower.id !== userId)
          : [me.followings, user],
      });
      setFollowData((prev) => {
        return {
          isFollowing: !prev.isFollowing,
          followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1,
        };
      });
    },
    onError: (error) => toast.error(error.message),
  });

  useEffect(() => {
    if (!user) return;

    const followers = user.followers.length;
    const isFollowing = user.followers.some(
      (follower) => follower.id === me.id
    );
    setFollowData({ followers, isFollowing });
  }, [user]);

  return { followData, toggleFollow };
};

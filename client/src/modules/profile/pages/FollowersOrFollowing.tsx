import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER, IUser, Users } from "../../user";
import { toast } from "react-toastify";

const FollwersOrFollowing = ({
  followers = false,
  followings = false,
}: {
  followers?: boolean;
  followings?: boolean;
}) => {
  const { id } = useParams();
  const { data, loading } = useQuery<{ user: IUser }>(GET_USER, {
    variables: { id },
    fetchPolicy: "no-cache",
    onError: (error) => toast.error(error.message),
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mainSectionContainer col-10 col-md-8 col-lg-6">
      <div className="titleContainer">
        <h1>{data?.user.username}</h1>
      </div>
      <div className="tabsContainer">
        <Link
          className={`tab ${followings ? "active" : " "}`}
          to={`/profile/${data?.user.id}/following`}
        >
          <span>Following</span>
        </Link>
        <Link
          className={`tab ${followers ? "active" : " "}`}
          to={`/profile/${data?.user.id}/followers`}
        >
          <span>Followers</span>
        </Link>
      </div>
      {followings ? (
        <Users users={data?.user.followings as IUser[]} />
      ) : (
        <Users users={data?.user.followers as IUser[]} />
      )}
    </div>
  );
};

export default FollwersOrFollowing;

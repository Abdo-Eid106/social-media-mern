import { useNavigate, useParams, Link } from "react-router-dom";
import { IUser, GET_USER } from "../../user";
import { GET_USER_TWEETS, ITweet, Tweets } from "../../tweet";
import { GET_DIRECT_CHAT, IChat } from "../../chat";
import { useToggleFollow } from "../../follow";
import { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import { PrimaryContext } from "../../primary";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";
import ChangeProfilePhotoModal from "../components/ChangeProfilePhoto";
import ChangeCoverPhotoModal from "../components/ChangeCoverPhoto";

const Profile = () => {
  const { id } = useParams();
  const { me } = useContext(PrimaryContext);
  const myProfile = !id || id === me.id;
  const userId = myProfile ? me.id : id;

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);

  const { data: userData, loading: userLoading } = useQuery<{ user: IUser }>(
    GET_USER,
    {
      fetchPolicy: "no-cache",
      variables: { id: myProfile ? me.id : userId },
      onError: (error) => toast.error(error.message),
    }
  );
  const user = userData?.user as IUser;
  const { followData, toggleFollow } = useToggleFollow(user, userId);

  const {
    data: tweetData,
    loading: tweetLoading,
    refetch: refetchTweets,
  } = useQuery<{
    tweets: ITweet[];
  }>(GET_USER_TWEETS, {
    fetchPolicy: "no-cache",
    variables: { userId: myProfile ? me.id : userId },
    onError: (error) => toast.error(error.message),
  });

  const navigate = useNavigate();
  const { data: directChatData, loading: chatLoading } = useQuery<{
    chat: IChat;
  }>(GET_DIRECT_CHAT, {
    variables: { userId },
    skip: myProfile,
    onError: (error) => toast.error(error.message),
  });

  if (userLoading || tweetLoading || chatLoading) return <div>Loading...</div>;

  return (
    <div className="mainSectionContainer col-10 col-md-8 col-lg-6">
      <div className="titleContainer">
        <h1>{user.username}</h1>
      </div>
      <div className="profileHeaderContainer">
        <div className="coverPhotoSection">
          <div className="coverPhotoContainer">
            {user.coverPhoto ? (
              <img src={user.coverPhoto} alt={user.username} />
            ) : null}
            {myProfile ? (
              <button
                className="coverPhotoButton"
                onClick={() => setShowCoverModal((prev) => !prev)}
              >
                <FaCamera />
              </button>
            ) : null}
          </div>
          <div className="userImageContainer">
            <img src={user.profilePhoto} alt={user.username} />
            {myProfile ? (
              <button
                className="profilePictureButton"
                onClick={() => setShowProfileModal((prev) => !prev)}
              >
                <FaCamera />
              </button>
            ) : null}
          </div>
        </div>
        {!myProfile ? (
          <div className="profileButtonsContainer">
            <div
              className="profileButton"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/chats/" + directChatData?.chat.id);
              }}
            >
              <MdEmail />
            </div>
            <button
              className={`followButton ${
                followData.isFollowing ? "following" : ""
              }`}
              data-user={user.id}
              onClick={() => toggleFollow()}
            >
              {followData.isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        ) : null}

        <div className="profileButtonsContainer"></div>
        <div className="userDetailsContainer">
          <span className="displayName">
            {user.firstname + " " + user.lastname}
          </span>
          <span className="username">@{user.username}</span>
          <span className="description"></span>
          <div className="followersContainer">
            <Link to={`/profile/${user.id}/following`}>
              <span className="value">{user.followings.length}</span>
              <span>Following</span>
            </Link>
            <Link to={`/profile/${user.id}/followers`}>
              <span className="value" id="followersValue">
                {followData.followers}
              </span>
              <span>Followers</span>
            </Link>
          </div>
        </div>
      </div>
      <Tweets
        tweets={tweetData?.tweets as ITweet[]}
        refetchTweets={refetchTweets}
      />
      {myProfile ? (
        <>
          <ChangeProfilePhotoModal
            show={showProfileModal}
            setShowModal={setShowProfileModal}
            refetchTweets={refetchTweets}
          />
          <ChangeCoverPhotoModal
            show={showCoverModal}
            setShowModal={setShowCoverModal}
          />
        </>
      ) : null}
    </div>
  );
};

export default Profile;

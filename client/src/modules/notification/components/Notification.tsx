import { Link, useNavigate } from "react-router-dom";
import { MARK_NOTFICIATION_AS_OPENED } from "../graphql/markNotificationAsOpenedMutation";
import { INotification, NotificationType } from "../models/notificationModel";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-toastify";

const Notification = ({ notification }: { notification: INotification }) => {
  const type = notification.type;
  const link =
    (type == NotificationType.FOLLOW ? "/profile/" : "/tweet/") +
    notification.entityId;
  const [opened, setOpened] = useState(notification.opened);
  const navigate = useNavigate();

  const [markAsOpened] = useMutation(MARK_NOTFICIATION_AS_OPENED, {
    variables: { id: notification.id },
    onCompleted: () => {
      setOpened(true);
      navigate(link);
    },
    onError: (error) => toast.error(error.message),
  });

  const mp: Map<NotificationType, string> = new Map([
    [NotificationType.FOLLOW, "followed you"],
    [NotificationType.TWEETLIKE, "liked one of your posts"],
    [NotificationType.COMMENT, "commented on one of your posts"],
    [NotificationType.RETWEET, "retweeted one of your posts"],
    [NotificationType.COMMENTLIKE, "liked one of your comments"],
  ]);

  return (
    <Link
      to={link}
      className={`resultListItem notification ${opened ? "" : "active"}`}
      onClick={(e) => {
        e.preventDefault();
        markAsOpened();
      }}
    >
      <div className="resultsImageContainer">
        <img src={notification.from.profilePhoto} />
      </div>
      <div className="resultsDetailsContainer ellipsis">
        <span className="ellipsis">
          <span className="ellipsis">
            {notification.from.firstname +
              " " +
              notification.from.lastname +
              " " +
              (mp.get(type) || "")}
          </span>
        </span>
      </div>
    </Link>
  );
};

export default Notification;

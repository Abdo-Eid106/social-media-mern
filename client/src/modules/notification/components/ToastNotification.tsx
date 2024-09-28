import { INotification } from "../models/notificationModel";
import { NotificationType } from "../models/notificationModel";

const ToastNotification = ({
  notification,
}: {
  notification: INotification;
}) => {
  const type = notification.type;
  const mp: Map<NotificationType, string> = new Map([
    [NotificationType.FOLLOW, "followed you"],
    [NotificationType.TWEETLIKE, "liked one of your posts"],
    [NotificationType.COMMENT, "commented on one of your posts"],
    [NotificationType.RETWEET, "retweeted one of your posts"],
    [NotificationType.COMMENTLIKE, "liked one of your comments"],
  ]);

  return (
    <div className="resultListItem notification">
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
    </div>
  );
};

export default ToastNotification;

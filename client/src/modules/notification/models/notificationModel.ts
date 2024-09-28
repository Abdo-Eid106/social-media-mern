import { UUID } from "crypto";
import { IUser } from "../../user";

export enum NotificationType {
  TWEETLIKE = "TWEETLIKE",
  COMMENT = "COMMENT",
  RETWEET = "RETWEET",
  FOLLOW = "FOLLOW",
  COMMENTLIKE = "COMMENTLIKE",
}

export interface INotification {
  id: UUID;
  type: NotificationType;
  opened: boolean;
  from: IUser;
  entityId: UUID;
}

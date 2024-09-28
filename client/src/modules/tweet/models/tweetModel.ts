import { UUID } from "crypto";
import { IUser } from "../../user";
import { IComment } from "../../comment";
import { ILike } from "./likeModel";

export interface ITweet {
  id: UUID;
  content: string;
  user: IUser;
  originalTweet?: ITweet;
  retweets: ITweet[];
  comments: IComment[];
  likes: ILike[];
  createdAt: Date;
  updatedAt: Date;
}

import { UUID } from "crypto";
import { ITweet } from "../../tweet/models/tweetModel";

export interface IUser {
  id: UUID;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  profilePhoto?: string;
  coverPhoto?: string;
  tweets: ITweet[];
  followings: IUser[];
  followers: IUser[];
}

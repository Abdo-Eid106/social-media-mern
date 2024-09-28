import { UUID } from "crypto";
import { IUser } from "../../user";
import { ILike } from "../../tweet/models/likeModel";

export interface IComment {
  id: UUID;
  content: string;
  user: IUser;
  likes: ILike[];
  createdAt: Date;
}

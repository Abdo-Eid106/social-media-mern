import { UUID } from "crypto";
import { IUser } from "../../user";

export interface IMessage {
  id?: UUID;
  content: string;
  user: IUser;
  readBy: IUser[];
  createdAt?: Date;
}

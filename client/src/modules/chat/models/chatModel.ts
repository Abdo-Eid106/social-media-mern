import { UUID } from "crypto";
import { IUser } from "../../user";
import { IMessage } from "../../message";

export interface IChat {
  id: UUID;
  name?: string;
  latestMessage?: IMessage;
  messages: IMessage[];
  users: IUser[];
  isGroup: boolean;
  createdAt: Date;
}

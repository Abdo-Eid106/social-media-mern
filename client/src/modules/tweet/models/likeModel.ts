import { IUser } from "../../user";

export interface ILike {
  id: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

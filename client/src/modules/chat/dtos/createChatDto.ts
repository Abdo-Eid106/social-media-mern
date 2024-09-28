import { UUID } from "crypto";

export class createChatDto {
  name?: string;
  users!: UUID[];
}

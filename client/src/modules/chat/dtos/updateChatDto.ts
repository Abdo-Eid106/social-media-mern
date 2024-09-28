import { UUID } from "crypto";

export class UpdateChatDto {
  id!: UUID;
  name?: string;
}

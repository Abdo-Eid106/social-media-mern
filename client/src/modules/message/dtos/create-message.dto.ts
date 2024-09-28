import { UUID } from "crypto";

export class CreateMessageDto {
  content!: string;
  chatId!: UUID;
}

import { InputType, Field, ID } from '@nestjs/graphql';
import { UUID } from 'crypto';

@InputType()
export class CreateMessageInput {
  @Field()
  content: string;

  @Field(() => ID)
  chatId: UUID;
}

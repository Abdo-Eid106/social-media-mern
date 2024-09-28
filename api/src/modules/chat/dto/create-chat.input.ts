import { InputType, Field, ID } from '@nestjs/graphql';
import { UUID } from 'crypto';

@InputType()
export class CreateChatInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => [ID])
  users: UUID[];
}

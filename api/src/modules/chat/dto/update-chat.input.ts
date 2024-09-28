import { InputType, Field, ID } from '@nestjs/graphql';
import { UUID } from 'crypto';

@InputType()
export class UpdateChatInput {
  @Field(() => ID)
  id: UUID;

  @Field({ nullable: true })
  name?: string;
}

import { UUID } from 'crypto';
import { CreateMessageInput } from './create-message.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {
  @Field(() => ID)
  id: UUID;
}

import { UUID } from 'crypto';
import { CreateTweetInput } from './create-tweet.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateTweetInput extends PartialType(CreateTweetInput) {
  @Field(() => ID)
  @IsUUID()
  id: UUID;
}

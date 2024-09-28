import { Field, ID, InputType } from '@nestjs/graphql';
import { UUID } from 'crypto';

@InputType()
export class RemoveTweetLikeInput {
  @Field(() => ID)
  tweetId: UUID;
}

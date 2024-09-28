import { Field, ID, InputType } from '@nestjs/graphql';
import { UUID } from 'crypto';

@InputType()
export class CreateTweetLikeInput {
  @Field(() => ID)
  tweetId: UUID;
}

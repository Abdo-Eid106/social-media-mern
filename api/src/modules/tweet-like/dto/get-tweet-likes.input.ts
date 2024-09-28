import { Field, ID } from '@nestjs/graphql';
import { UUID } from 'crypto';

export class GetTweetLikesInput {
  @Field(() => ID)
  tweetId: UUID;

  @Field(() => ID, { nullable: true })
  userId?: UUID;
}

import { ID, ObjectType, Field } from '@nestjs/graphql';
import { GqlUser } from 'src/modules/user/dto/user.type';
import { UUID } from 'crypto';
import { GqlComment } from 'src/modules/comment/dto/comment.type';
import { GqlTweetLike } from 'src/modules/tweet-like/dto/tweet-like.type';

@ObjectType('Tweet')
export class GqlTweet {
  @Field(() => ID)
  id: UUID;

  @Field({ nullable: true })
  content?: string;

  @Field(() => GqlUser)
  user: GqlUser;

  @Field(() => GqlTweet, { nullable: true })
  originalTweet?: GqlTweet;

  @Field(() => [GqlComment])
  comments: GqlComment[];

  @Field(() => [GqlTweetLike])
  likes: GqlTweetLike[];

  @Field()
  createdAt: Date;
}

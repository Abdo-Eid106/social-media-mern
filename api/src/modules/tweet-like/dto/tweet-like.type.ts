import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GqlUser } from 'src/modules/user/dto/user.type';
import { UUID } from 'crypto';

@ObjectType('TweetLike')
export class GqlTweetLike {
  @Field(() => ID)
  id: UUID;

  @Field(() => GqlUser)
  user: GqlUser;

  @Field()
  createdAt: Date;
}

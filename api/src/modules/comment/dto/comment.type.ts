import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UUID } from 'crypto';
import { GqlUser } from 'src/modules/user/dto/user.type';
import { GqlCommentLike } from 'src/modules/comment-like/dtos/comment-like.type';

@ObjectType('Comment')
export class GqlComment {
  @Field(() => ID)
  id: UUID;

  @Field()
  content: string;

  @Field(() => GqlUser)
  user: GqlUser;

  @Field(() => [GqlCommentLike])
  likes: GqlCommentLike[];

  @Field()
  createdAt: Date;
}

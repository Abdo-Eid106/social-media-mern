import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UUID } from 'crypto';
import { GqlComment } from 'src/modules/comment/dto/comment.type';
import { GqlUser } from 'src/modules/user/dto/user.type';

@ObjectType('CommentLike')
export class GqlCommentLike {
  @Field(() => ID)
  id: UUID;

  @Field(() => GqlUser)
  user: GqlUser;

  @Field(() => GqlComment)
  comment: GqlComment;

  @Field()
  createdAt: Date;
}

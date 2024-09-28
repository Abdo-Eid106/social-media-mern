import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GqlUser } from 'src/modules/user/dto/user.type';
import { UUID } from 'crypto';

@ObjectType('Message')
export class GqlMessage {
  @Field(() => ID)
  id: UUID;

  @Field()
  content: string;

  @Field(() => GqlUser)
  user: GqlUser;

  @Field(() => [GqlUser])
  readBy: GqlUser[];

  @Field()
  createdAt: Date;
}

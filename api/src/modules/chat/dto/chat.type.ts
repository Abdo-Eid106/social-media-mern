import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UUID } from 'crypto';
import { GqlMessage } from 'src/modules/message/dto/message.type';
import { GqlUser } from 'src/modules/user/dto/user.type';

@ObjectType('Chat')
export class GqlChat {
  @Field(() => ID)
  id: UUID;

  @Field({ nullable: true })
  name?: string;

  @Field()
  isGroup: boolean;

  @Field(() => [GqlUser])
  users: GqlUser[];

  @Field(() => [GqlMessage])
  messages: GqlMessage[];

  @Field(() => GqlMessage, { nullable: true })
  latestMessage: GqlMessage;

  @Field()
  createdAt: Date;
}

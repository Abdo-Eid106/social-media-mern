import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UUID } from 'crypto';
import { NotificatinType } from '@prisma/client';
import { GqlUser } from 'src/modules/user/dto/user.type';

@ObjectType('Notification')
export class GqlNotification {
  @Field(() => ID)
  id: UUID;

  @Field(() => NotificatinType)
  type: NotificatinType;

  @Field()
  opened: boolean;

  @Field()
  readed: boolean;

  @Field(() => GqlUser)
  from: GqlUser;

  @Field(() => ID)
  entityId: UUID;

  @Field()
  createdAt: Date;
}

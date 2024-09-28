import { InputType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { NotificatinType } from '@prisma/client';
import { UUID } from 'crypto';

registerEnumType(NotificatinType, {
  name: 'NotificatinType',
});

@InputType()
class NotificationTypeFilter {
  @Field(() => [NotificatinType])
  in: NotificatinType[];
}

@InputType()
export class GetNotificationsInput {
  @Field(() => ID, { nullable: true })
  id?: UUID;

  @Field(() => NotificationTypeFilter, { nullable: true })
  type?: NotificationTypeFilter;

  @Field({ nullable: true })
  opened?: boolean;

  @Field({ nullable: true })
  readed?: boolean;

  @Field(() => ID, { nullable: true })
  fromId?: UUID;

  @Field(() => ID, { nullable: true })
  toId?: UUID;

  @Field(() => ID, { nullable: true })
  tweetLikeId?: UUID;

  @Field(() => ID, { nullable: true })
  commentId?: UUID;

  @Field(() => ID, { nullable: true })
  retweetId?: UUID;

  @Field(() => ID, { nullable: true })
  followId?: UUID;

  @Field(() => ID, { nullable: true })
  messageId?: UUID;
}

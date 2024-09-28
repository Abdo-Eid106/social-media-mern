import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { GqlFollow } from './dtos/follow.type';
import { IPayloud } from 'src/shared/interfaces/payloud.interface';
import { NotificationService } from 'src/modules/notification/notification.service';
import { UUID } from 'crypto';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from 'src/modules/auth/guards/gql-jwt.guard';
import { NotificatinType } from '@prisma/client';
import { currentUser } from 'src/shared/decorators/current-user.decorator';

@Resolver(() => GqlFollow)
export class FollowResolver {
  constructor(
    private readonly followService: FollowService,
    private readonly notificationService: NotificationService,
  ) {}

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlFollow, { nullable: true })
  async toggleFollow(
    @Args('userId', { type: () => ID }) userId: UUID,
    @currentUser() user: IPayloud,
  ) {
    const follow = await this.followService.toggle(user.id, userId);
    if (follow) {
      await this.notificationService.create(
        follow.id as UUID,
        NotificatinType.FOLLOW,
      );
    }
    return follow;
  }
}

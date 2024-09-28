import { Mutation, Resolver, Args, ID } from '@nestjs/graphql';
import { TweetLikeService } from './tweet-like.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from '../auth/guards/gql-jwt.guard';
import { GqlTweetLike } from './dto/tweet-like.type';
import { IPayloud } from 'src/shared/interfaces/payloud.interface';
import { NotificationService } from '../notification/notification.service';
import { UUID } from 'crypto';
import { NotificatinType } from '@prisma/client';
import { currentUser } from 'src/shared/decorators/current-user.decorator';

@Resolver()
export class TweetLikeResolver {
  constructor(
    private readonly tweetLikeService: TweetLikeService,
    private readonly notificationService: NotificationService,
  ) {}

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlTweetLike, { nullable: true })
  async toggleTweetLike(
    @Args('tweetId', { type: () => ID }) tweetId: UUID,
    @currentUser() user: IPayloud,
  ) {
    const like = await this.tweetLikeService.toggle(user.id, tweetId);
    if (like) {
      await this.notificationService.create(
        like.id as UUID,
        NotificatinType.TWEETLIKE,
      );
    }
    return like;
  }
}

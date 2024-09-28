import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from 'src/modules/auth/guards/gql-jwt.guard';
import { currentUser } from 'src/shared/decorators/current-user.decorator';
import { NotificationService } from 'src/modules/notification/notification.service';
import { IPayloud } from 'src/shared/interfaces/payloud.interface';
import { GqlTweet } from '../dto/tweet.type';
import { UUID } from 'crypto';
import { RetweetService } from '../services/retweet.service';
import { NotificatinType } from '@prisma/client';

@Resolver(() => GqlTweet)
export class RetweetResolver {
  constructor(
    private readonly retweetService: RetweetService,
    private readonly notificationService: NotificationService,
  ) {}

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlTweet, { nullable: true })
  async toggleRetweet(
    @Args('tweetId', { type: () => ID }) tweetId: UUID,
    @currentUser() user: IPayloud,
  ) {
    const retweet = await this.retweetService.toggle(user.id, tweetId);
    if (retweet) {
      await this.notificationService.create(
        retweet.id as UUID,
        NotificatinType.RETWEET,
      );
    }
    return retweet;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { NotificatinType } from '@prisma/client';
import { TweetLikeNotificationStrategy } from './strategies/tweet-like-notification.startegy';
import { RetweetNotificationStrategy } from './strategies/retweet-notification.strategy';
import { CommentNotificationStrategy } from './strategies/comment-notification.strategy';
import { FollowNotificationStrategy } from './strategies/follow-notification.strategy';
import { INotificatonStrategy } from './strategies/notification.strategy';
import { CommentLikeNotificationStrategy } from './strategies/comment-like-notification.strategy';
import { UUID } from 'crypto';

@Injectable()
export class NotificationManager {
  private strategies: { [key in NotificatinType]?: INotificatonStrategy } = {};

  constructor(
    tweetLikeNotificationStrategy: TweetLikeNotificationStrategy,
    commentNotificationStrategy: CommentNotificationStrategy,
    retweetNotificationStrategy: RetweetNotificationStrategy,
    followNotificationStrategy: FollowNotificationStrategy,
    commentLikeNotificationStrategy: CommentLikeNotificationStrategy,
    // Add other strategies here
  ) {
    this.strategies[NotificatinType.TWEETLIKE] = tweetLikeNotificationStrategy;
    this.strategies[NotificatinType.COMMENT] = commentNotificationStrategy;
    this.strategies[NotificatinType.RETWEET] = retweetNotificationStrategy;
    this.strategies[NotificatinType.FOLLOW] = followNotificationStrategy;
    this.strategies[NotificatinType.COMMENTLIKE] =
      commentLikeNotificationStrategy;
  }

  async createNotificationByType(id: UUID, type: NotificatinType) {
    const strategy = this.strategies[type];
    if (!strategy) {
      throw new BadRequestException(
        `No strategy found for notification type ${type}`,
      );
    }
    return strategy.createNotification(id);
  }
}

import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { DatabaseModule } from 'src/shared/database/database.module';
import { NotificationManager } from './notification.manager';
import { TweetLikeNotificationStrategy } from './strategies/tweet-like-notification.startegy';
import { CommentNotificationStrategy } from './strategies/comment-notification.strategy';
import { RetweetNotificationStrategy } from './strategies/retweet-notification.strategy';
import { FollowNotificationStrategy } from './strategies/follow-notification.strategy';
import { CommentLikeNotificationStrategy } from './strategies/comment-like-notification.strategy';
import { NotificationGateway } from './notification.gateway';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    NotificationResolver,
    NotificationService,
    NotificationManager,
    TweetLikeNotificationStrategy,
    CommentNotificationStrategy,
    RetweetNotificationStrategy,
    FollowNotificationStrategy,
    CommentLikeNotificationStrategy,
    NotificationGateway,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}

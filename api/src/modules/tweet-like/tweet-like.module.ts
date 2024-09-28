import { Module } from '@nestjs/common';
import { TweetLikeService } from './tweet-like.service';
import { DatabaseModule } from 'src/shared/database/database.module';
import { TweetLikeResolver } from './tweet-like.resolver';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [DatabaseModule, NotificationModule],
  providers: [TweetLikeService, TweetLikeResolver],
  exports: [TweetLikeService],
})
export class TweetLikeModule {}

import { Module } from '@nestjs/common';
import { TweetService } from './services/tweet.service';
import { TweetResolver } from './resolvers/tweet.resolver';
import { DatabaseModule } from 'src/shared/database/database.module';
import { RetweetService } from './services/retweet.service';
import { RetweetResolver } from './resolvers/retweet.resolver';
import { NotificationModule } from '../notification/notification.module';

@Module({
  providers: [TweetResolver, TweetService, RetweetService, RetweetResolver],
  imports: [DatabaseModule, NotificationModule],
  exports: [TweetService],
})
export class TweetModule {}

import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { TweetModule } from 'src/modules/tweet/tweet.module';
import { DataLoaderService } from './dataloader.service';
import { CommentModule } from 'src/modules/comment/comment.module';
import { TweetLikeModule } from 'src/modules/tweet-like/tweet-like.module';
import { CommentLikeModule } from 'src/modules/comment-like/comment-like.module';

@Module({
  imports: [
    UserModule,
    TweetModule,
    CommentModule,
    TweetLikeModule,
    CommentLikeModule,
  ],
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class DataloaderModule {}

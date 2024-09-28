import { Module } from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { CommentLikeResolver } from './comment-like.resolver';
import { DatabaseModule } from 'src/shared/database/database.module';
import { NotificationModule } from 'src/modules/notification/notification.module';

@Module({
  imports: [DatabaseModule, NotificationModule],
  providers: [CommentLikeService, CommentLikeResolver],
  exports: [CommentLikeService],
})
export class CommentLikeModule {}

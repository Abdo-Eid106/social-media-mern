import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { DatabaseModule } from 'src/shared/database/database.module';
import { NotificationModule } from 'src/modules/notification/notification.module';

@Module({
  imports: [DatabaseModule, NotificationModule],
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule {}

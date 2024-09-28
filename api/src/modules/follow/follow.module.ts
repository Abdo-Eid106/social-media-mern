import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { DatabaseModule } from 'src/shared/database/database.module';
import { FollowResolver } from './follow.resolver';
import { NotificationModule } from 'src/modules/notification/notification.module';

@Module({
  imports: [DatabaseModule, NotificationModule],
  providers: [FollowService, FollowResolver],
  exports: [FollowService],
})
export class FollowModule {}

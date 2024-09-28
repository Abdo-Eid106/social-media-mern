import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { DatabaseModule } from 'src/shared/database/database.module';
import { NotificationModule } from 'src/modules/notification/notification.module';

@Module({
  imports: [DatabaseModule, NotificationModule],
  providers: [MessageResolver, MessageService],
  exports: [MessageService],
})
export class MessageModule {}

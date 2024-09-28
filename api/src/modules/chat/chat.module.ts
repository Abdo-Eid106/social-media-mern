import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { DatabaseModule } from 'src/shared/database/database.module';
import { MessageModule } from 'src/modules/message/message.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [DatabaseModule, MessageModule],
  providers: [ChatResolver, ChatService, ChatGateway],
})
export class ChatModule {}

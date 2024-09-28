import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UUID } from 'crypto';
import { MessageService } from 'src/modules/message/message.service';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  @SubscribeMessage('joinChat')
  async joinChat(
    @ConnectedSocket() socket: Socket,
    @MessageBody('chatId') chatId: UUID,
  ) {
    socket.join(chatId);
  }

  @SubscribeMessage('leaveChat')
  async leaveChat(
    @ConnectedSocket() socket: Socket,
    @MessageBody('chatId') chatId: UUID,
  ) {
    socket.leave(chatId);
  }

  @SubscribeMessage('message')
  async sendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody('chatId') chatId: UUID,
  ) {
    const message = await this.messageService.findChatLatestMessage(chatId);
    socket.broadcast.to(chatId.toString()).emit('chatpage: message', message);

    const chat = await this.chatService.findOne(chatId);
    const latestMessage = await this.messageService.findChatLatestMessage(
      chat.id as UUID,
    );
    const payloud = { ...chat, latestMessage };
    const users = chat.users.filter((user) => user.id != message.user.id);
    users.forEach((user) => socket.to(user.id).emit('chatspage: message'));
    users.forEach((user) =>
      socket.to(user.id).emit('homepage: message', payloud),
    );
  }

  @SubscribeMessage('typing')
  async typingMessage(
    @MessageBody('chatId') chatId: UUID,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.to(chatId.toString()).emit('typing');
  }
}

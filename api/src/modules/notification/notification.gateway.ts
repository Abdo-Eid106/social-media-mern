import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UUID } from 'crypto';

@WebSocketGateway({ cors: true })
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly notificationService: NotificationService) {}

  async handleConnection(@ConnectedSocket() Socket: Socket) {
    const userId = Socket.handshake.query.userId as UUID;
    Socket.join(userId);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`Socket disconnected: ${socket.id}`);
  }

  @SubscribeMessage('notification')
  async handleMessage(@MessageBody('userId') userId: UUID) {
    const notification =
      await this.notificationService.findUserLatestNotification(userId);
    this.server.to(userId).emit('notification', notification);
  }
}

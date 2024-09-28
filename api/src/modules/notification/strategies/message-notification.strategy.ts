// import { Injectable, NotFoundException } from '@nestjs/common';
// import { INotificatonStrategy } from './notification.strategy';
// import { PrismaService } from '../../shared/database/prisma.service';
// import { Notification, NotificatinType } from '@prisma/client';
// import { UUID } from 'crypto';

// @Injectable()
// export class MessageNotificationStrategy implements INotificatonStrategy {
//   constructor(private readonly prisma: PrismaService) {}

//   async createNotification(messageId: UUID): Promise<Notification[]> {
//     const message = await this.prisma.message.findUnique({
//       where: { id: messageId },
//       include: {
//         user: { select: { id: true } },
//         chat: { select: { users: { select: { id: true } } } },
//       },
//     });
//     if (!message) throw new NotFoundException('Message not found');

//     return await Promise.all(
//       message.chat.users
//         .filter((user) => user.id != message.user.id)
//         .map(async (user) =>
//           this.prisma.notification.upsert({
//             where: { messageId_toId: { messageId, toId: user.id } },
//             update: {},
//             create: {
//               fromId: message.user.id as UUID,
//               toId: user.id as UUID,
//               entityId: message.chatId as UUID,
//               type: NotificatinType.MESSAGE,
//               messageId,
//             },
//           }),
//         ),
//     );
//   }
// }

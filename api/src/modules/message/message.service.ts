import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { PrismaService } from 'src/shared/database/prisma.service';
import { GetMessagesInput } from './dto/get-messages.input';
import { OrderMessagesInput } from './dto/order-messages.input';
import { PaginationInput } from 'src/shared/dtos/pagination.input';
import { UUID } from 'crypto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMessageInput: CreateMessageInput, userId: UUID) {
    await this._validateUserChat(userId, createMessageInput.chatId);
    return this.prisma.message.create({
      data: {
        ...createMessageInput,
        userId,
        readBy: {
          connect: {
            id: userId,
          },
        },
      },
      include: { user: true },
    });
  }

  findMany(
    where: GetMessagesInput,
    orderBy: OrderMessagesInput,
    paginate: PaginationInput,
  ) {
    return this.prisma.message.findMany({
      where,
      ...paginate,
      orderBy,
      include: { user: true, readBy: { select: { id: true } } },
    });
  }

  async findOne(id: UUID) {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: { user: true, readBy: { select: { id: true } } },
    });

    if (!message) throw new NotFoundException('message not found');
    return message;
  }

  async update(id: UUID, updateMessageInput: UpdateMessageInput, userId: UUID) {
    await this._validateUserMessage(userId, id);
    return this.prisma.message.update({
      where: { id },
      data: updateMessageInput,
      include: { user: true },
    });
  }

  async remove(id: UUID, userId: UUID) {
    await this._validateUserMessage(userId, id);
    return this.prisma.message.delete({ where: { id } });
  }

  async findChatLatestMessage(chatId: UUID) {
    const chat = await this.prisma.chat.findUnique({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException('chat not found');
    }

    return this.prisma.message.findFirst({
      where: { chatId },
      orderBy: { createdAt: 'desc' },
      include: { user: true, readBy: { select: { id: true } } },
    });
  }

  async getUserUnreadedMessagesCount(userId: UUID) {
    await this._validateUser(userId);

    const chats = await this.prisma.chat.findMany({
      where: { users: { some: { id: userId } } },
    });
    const chatIds = chats.map((chat) => chat.id);

    const messages = await this.prisma.message.findMany({
      where: { chatId: { in: chatIds }, readBy: { none: { id: userId } } },
    });
    return messages.length;
  }

  async readMessages(userId: UUID, data: GetMessagesInput) {
    await this._validateUserChat(userId, data.chatId);

    const messages = await this.prisma.message.findMany({
      where: { ...data },
      select: { id: true },
    });

    const updatePromises = messages.map((message) =>
      this.prisma.message.update({
        where: { id: message.id },
        data: { readBy: { connect: { id: userId } } },
      }),
    );

    return this.prisma.$transaction(updatePromises);
  }

  async readMessage(userId: UUID, messageId: UUID) {
    await this._validateUser(userId);
    await this.findOne(messageId);
    return this.prisma.message.update({
      where: { id: messageId },
      data: { readBy: { connect: { id: userId } } },
    });
  }

  private async _validateUser(userId: UUID) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('user not found');
  }

  private async _validateUserMessage(userId: UUID, messageId: UUID) {
    await this._validateUser(userId);

    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
      include: { user: true },
    });
    if (!message) {
      throw new NotFoundException('message not found');
    }

    if (message.user.id != userId) {
      throw new UnauthorizedException('unauthorized');
    }
  }

  async _validateUserChat(userId: UUID, chatId: UUID) {
    await this._validateUser(userId);

    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { users: true },
    });
    if (!chat) throw new NotFoundException('chat not found');

    if (!chat.users.some((user) => user.id == userId)) {
      throw new UnauthorizedException('unauthorized');
    }
  }
}

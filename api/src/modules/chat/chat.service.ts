import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { PrismaService } from 'src/shared/database/prisma.service';
import { MessageService } from 'src/modules/message/message.service';
import { UUID } from 'crypto';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly messageService: MessageService,
  ) {}

  async create(
    createChatInput: CreateChatInput,
    userId: UUID,
    isGroup: boolean = true,
  ) {
    const userIds = [...new Set([...createChatInput.users, userId])];
    if (userIds.length < 2) {
      throw new BadRequestException('chat should contain at least two users');
    }

    const users = await Promise.all(
      userIds.map((userId) =>
        this.prisma.user.findUnique({ where: { id: userId } }),
      ),
    );

    if (users.some((user) => !user)) {
      throw new BadRequestException('invalid user ids');
    }

    return this.prisma.chat.create({
      data: {
        ...createChatInput,
        isGroup,
        users: {
          connect: userIds.map((id) => ({ id })),
        },
      },
      include: { users: true },
    });
  }

  async findUserChats(userId: UUID) {
    const chats = await this.prisma.chat.findMany({
      where: { users: { some: { id: userId } } },
      include: {
        users: true,
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });
    return chats.sort(
      (a, b) =>
        (b.messages[0]?.createdAt.getTime() || 0) -
        (a.messages[0]?.createdAt.getTime() || 0),
    );
  }

  async findOne(id: UUID) {
    const chat = await this.prisma.chat.findFirst({
      where: { id },
      include: { users: true },
    });
    if (!chat) throw new NotFoundException('chat not found');

    return chat;
  }

  async findUserLatestChat(userId: UUID) {
    const chats = await this.findUserChats(userId);
    return chats.length ? chats[0] : null;
  }

  async update(updateChatInput: UpdateChatInput, userId: UUID) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('user not found');

    const chat = await this.findOne(updateChatInput.id);
    if (!chat.users.some((user) => user.id == userId)) {
      throw new UnauthorizedException('unauthorized');
    }

    return this.prisma.chat.update({
      where: { id: updateChatInput.id },
      data: updateChatInput,
      include: { users: true },
    });
  }

  async findOrCreateDirectChat(userId1: UUID, userId2: UUID) {
    let chat = await this.prisma.chat.findFirst({
      where: {
        users: {
          every: {
            id: {
              in: [userId1, userId2],
            },
          },
        },
        isGroup: false,
      },
      include: { users: true },
    });

    if (!chat)
      chat = await this.create({ users: [userId1, userId2] }, userId1, false);
    return chat;
  }

  async findUnreadedChats(userId: UUID) {
    const chats = await this.findUserChats(userId);

    const chatStatuses = await Promise.all(
      chats.map(async (chat) => {
        const message = await this.messageService.findChatLatestMessage(
          chat.id as UUID,
        );
        const isUnread = message?.readBy.every((user) => user.id !== userId);
        return { chat, isUnread };
      }),
    );

    return chatStatuses
      .filter((chatStatus) => chatStatus.isUnread)
      .map((chatStatus) => chatStatus.chat);
  }
}

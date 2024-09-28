import { Injectable, NotFoundException } from '@nestjs/common';
import { INotificatonStrategy } from './notification.strategy';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Notification, NotificatinType } from '@prisma/client';
import { UUID } from 'crypto';

@Injectable()
export class CommentNotificationStrategy implements INotificatonStrategy {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(commentId: UUID): Promise<Notification> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        user: { select: { id: true } },
        tweet: { select: { user: { select: { id: true } } } },
      },
    });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.tweet.user.id == comment.user.id) return null;

    return this.prisma.notification.upsert({
      where: { commentId },
      update: {},
      create: {
        fromId: comment.user.id as UUID,
        toId: comment.tweet.user.id as UUID,
        entityId: comment.tweetId as UUID,
        type: NotificatinType.COMMENT,
        commentId,
      },
    });
  }
}

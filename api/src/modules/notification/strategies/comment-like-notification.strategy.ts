import { BadRequestException, Injectable } from '@nestjs/common';
import { INotificatonStrategy } from './notification.strategy';
import { PrismaService } from 'src/shared/database/prisma.service';
import { NotificatinType, Notification } from '@prisma/client';
import { UUID } from 'crypto';

@Injectable()
export class CommentLikeNotificationStrategy implements INotificatonStrategy {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(commentLikeId: UUID): Promise<Notification> {
    const commentLike = await this.prisma.commentLike.findUnique({
      where: { id: commentLikeId },
      include: {
        user: { select: { id: true } },
        comment: {
          select: {
            id: true,
            tweet: { select: { id: true } },
            user: { select: { id: true } },
          },
        },
      },
    });
    if (!commentLike) throw new BadRequestException('comment like not found');
    if (commentLike.user.id == commentLike.comment.user.id) return null;

    return this.prisma.notification.upsert({
      where: { commentLikeId },
      update: {},
      create: {
        fromId: commentLike.user.id as UUID,
        toId: commentLike.comment.user.id as UUID,
        type: NotificatinType.COMMENTLIKE,
        commentLikeId,
        entityId: commentLike.comment.tweet.id as UUID,
      },
    });
  }
}

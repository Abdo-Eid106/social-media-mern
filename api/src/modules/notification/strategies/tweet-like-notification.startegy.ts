import { Injectable, NotFoundException } from '@nestjs/common';
import { INotificatonStrategy } from './notification.strategy';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Notification, NotificatinType } from '@prisma/client';
import { UUID } from 'crypto';

@Injectable()
export class TweetLikeNotificationStrategy implements INotificatonStrategy {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(tweetLikeId: UUID): Promise<Notification> {
    const like = await this.prisma.tweetLike.findUnique({
      where: { id: tweetLikeId },
      include: {
        user: { select: { id: true } },
        tweet: { select: { user: { select: { id: true } } } },
      },
    });
    if (!like) throw new NotFoundException('Like not found');
    if (like.tweet.user.id === like.user.id) return null;

    return this.prisma.notification.upsert({
      where: { tweetLikeId },
      update: {},
      create: {
        fromId: like.user.id as UUID,
        toId: like.tweet.user.id as UUID,
        entityId: like.tweetId as UUID,
        type: NotificatinType.TWEETLIKE,
        tweetLikeId,
      },
    });
  }
}

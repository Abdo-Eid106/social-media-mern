import { Injectable, NotFoundException } from '@nestjs/common';
import { INotificatonStrategy } from './notification.strategy';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Notification, NotificatinType } from '@prisma/client';
import { UUID } from 'crypto';

@Injectable()
export class RetweetNotificationStrategy implements INotificatonStrategy {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(retweetId: UUID): Promise<Notification> {
    const retweet = await this.prisma.tweet.findUnique({
      where: { id: retweetId },
      include: {
        user: { select: { id: true } },
        originalTweet: { select: { user: { select: { id: true } } } },
      },
    });
    if (!retweet) throw new NotFoundException('Retweet not found');
    if (retweet.user.id === retweet.originalTweet.user.id) return null;
    return this.prisma.notification.upsert({
      where: { retweetId },
      update: {},
      create: {
        fromId: retweet.user.id as UUID,
        toId: retweet.originalTweet.user.id as UUID,
        entityId: retweet.originalTweetId as UUID,
        type: NotificatinType.RETWEET,
        retweetId,
      },
    });
  }
}

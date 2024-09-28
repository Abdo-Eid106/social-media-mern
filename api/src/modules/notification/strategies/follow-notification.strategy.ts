import { Injectable, NotFoundException } from '@nestjs/common';
import { INotificatonStrategy } from './notification.strategy';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Notification, NotificatinType } from '@prisma/client';
import { UUID } from 'crypto';

@Injectable()
export class FollowNotificationStrategy implements INotificatonStrategy {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(followId: UUID): Promise<Notification> {
    const follow = await this.prisma.follow.findUnique({
      where: { id: followId },
      include: {
        follower: { select: { id: true } },
        following: { select: { id: true } },
      },
    });
    if (!follow) throw new NotFoundException('Follow not found');
    if (follow.follower.id === follow.following.id) return null;

    return this.prisma.notification.upsert({
      where: { followId },
      update: {},
      create: {
        fromId: follow.follower.id as UUID,
        toId: follow.following.id as UUID,
        entityId: follow.followerId as UUID,
        type: NotificatinType.FOLLOW,
        followId,
      },
    });
  }
}

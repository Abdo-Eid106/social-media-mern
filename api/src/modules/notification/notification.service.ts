import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { GetNotificationsInput } from './dto/get-notifications.input';
import { NotificatinType } from '@prisma/client';
import { OrderByInput } from 'src/shared/dtos/order-by.input';
import { PaginationInput } from 'src/shared/dtos/pagination.input';
import { NotificationManager } from './notification.manager';
import { UUID } from 'crypto';
import { UpdateNotificationInput } from './dto/update-notification.input';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationManager: NotificationManager,
    private readonly prisma: PrismaService,
  ) {}

  async findMany(
    where: GetNotificationsInput,
    orderBy: OrderByInput,
    paginate: PaginationInput,
  ) {
    return this.prisma.notification.findMany({
      where,
      ...paginate,
      orderBy,
      include: { from: true },
    });
  }

  async create(entityId: UUID, type: NotificatinType) {
    return this.notificationManager.createNotificationByType(entityId, type);
  }

  async updateMany(userId: UUID, data: UpdateNotificationInput) {
    await this._fetchUser(userId);
    return this.prisma.notification.updateMany({
      where: { toId: userId },
      data,
    });
  }

  async updateOne(id: UUID, userId: UUID, data: UpdateNotificationInput) {
    await this._validateNotification(id, userId);
    return this.prisma.notification.update({
      where: { id },
      data,
    });
  }

  async remove(id: UUID, userId: UUID) {
    await this._validateNotification(id, userId);
    return this.prisma.notification.delete({ where: { id } });
  }

  async findUserLatestNotification(userId: UUID) {
    await this._fetchUser(userId);
    return this.prisma.notification.findFirst({
      where: { toId: userId },
      include: { from: true },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });
  }

  private async _fetchUser(userId: UUID) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  private async _validateNotification(id: UUID, userId: UUID) {
    await this._fetchUser(userId);

    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification) throw new NotFoundException('Notification not found');
    if (notification.toId !== userId)
      throw new UnauthorizedException('Unauthorized');

    return notification;
  }
}

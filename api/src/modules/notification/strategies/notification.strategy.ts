import { Notification } from '@prisma/client';
import { UUID } from 'crypto';

export interface INotificatonStrategy {
  createNotification(id: UUID) : Promise<Notification | Notification[]>;
}

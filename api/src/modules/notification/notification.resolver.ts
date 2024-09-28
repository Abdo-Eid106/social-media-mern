import { Resolver, Query, Args, Mutation, Int, ID } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { GqlNotification } from './dto/notification.type';
import { GetNotificationsInput } from './dto/get-notifications.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from 'src/modules/auth/guards/gql-jwt.guard';
import { OrderNotificationsInput } from './dto/order-notifications.input';
import { IPayloud } from 'src/shared/interfaces/payloud.interface';
import { PaginationInput } from 'src/shared/dtos/pagination.input';
import { UUID } from 'crypto';
import { currentUser } from 'src/shared/decorators/current-user.decorator';

@Resolver(() => GqlNotification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => [GqlNotification], { name: 'notifications' })
  findAll(
    @Args('getNotificationsInput', { nullable: true })
    GetNotificationsInput: GetNotificationsInput,
    @Args('orderBy', { nullable: true })
    orderBy: OrderNotificationsInput,
    @Args('paginate', { nullable: true })
    paginate: PaginationInput,
    @currentUser() user: IPayloud,
  ) {
    return this.notificationService.findMany(
      { ...GetNotificationsInput, toId: user.id },
      orderBy,
      paginate,
    );
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Int)
  async markAllAsRead(@currentUser() user: IPayloud) {
    return (
      await this.notificationService.updateMany(user.id, { readed: true })
    ).count;
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlNotification)
  async markAsOpened(
    @Args('id', { type: () => ID }) id: UUID,
    @currentUser() user: IPayloud,
  ) {
    return this.notificationService.updateOne(id, user.id, { opened: true });
  }
}

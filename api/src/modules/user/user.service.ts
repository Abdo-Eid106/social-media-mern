import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { GetUsersInput } from './dto/get-users.input';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import { PaginationInput } from 'src/shared/dtos/pagination.input';
import { OrderUsersInput } from './dto/order-users.input';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(
    where: GetUsersInput,
    paginate: PaginationInput,
    orderBy: OrderUsersInput,
  ) {
    return this.prisma.user.findMany({ where, ...paginate, orderBy });
  }

  async findOne(id: UUID) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: UUID, updateUserInput: UpdateUserInput) {
    await this.findOne(id);
    return this.prisma.user.update({ where: { id }, data: updateUserInput });
  }

  async findUserFollowings(userId: UUID) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { following: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userIds = user.following.map((follow) => follow.followingId);
    return this.getUsersByBatch(userIds as UUID[]);
  }

  async findUserFollowers(userId: UUID) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { followers: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userIds = user.followers.map((follow) => follow.followerId);
    return this.getUsersByBatch(userIds as UUID[]);
  }

  async getUsersByBatch(userIds: UUID[]) {
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
    });

    const userMap: Map<UUID, User> = new Map(userIds.map((id) => [id, null]));
    users.forEach((user) => {
      userMap.set(user.id as UUID, user);
    });

    return userIds.map((id) => userMap.get(id));
  }
}

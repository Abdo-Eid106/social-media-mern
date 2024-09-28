import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetInput } from '../dto/create-tweet.input';
import { UpdateTweetInput } from '../dto/update-tweet.input';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UUID } from 'crypto';
import { GetTweetsInput } from '../dto/get-tweet.input';
import { PaginationInput } from 'src/shared/dtos/pagination.input';
import { OrderTweetsInput } from '../dto/order-tweets.input';
import { Tweet } from '@prisma/client';

@Injectable()
export class TweetService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTweetInput: CreateTweetInput, userId: UUID) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.prisma.tweet.create({
      data: { ...createTweetInput, userId },
    });
  }

  async findMany(
    where: GetTweetsInput,
    paginate: PaginationInput,
    orderBy: OrderTweetsInput,
  ) {
    return this.prisma.tweet.findMany({
      where,
      ...paginate,
      orderBy,
      include: { originalTweet: { include: { user: true } }, user: true },
    });
  }

  async findOne(id: UUID) {
    const tweet = await this.prisma.tweet.findFirst({
      where: { id },
      include: { originalTweet: { include: { user: true } }, user: true },
    });

    if (!tweet) {
      throw new NotFoundException('tweet not found');
    }

    return tweet;
  }

  async update(id: UUID, updateTweetInput: UpdateTweetInput, userId: UUID) {
    const tweet = await this.findOne(id);

    if (tweet.userId.toString() !== userId.toString()) {
      throw new NotFoundException('unauthorized');
    }

    return this.prisma.tweet.update({
      where: { id },
      data: updateTweetInput,
      include: { originalTweet: { include: { user: true } }, user: true },
    });
  }

  async remove(id: UUID, userId: UUID) {
    const tweet = await this.findOne(id);

    if (tweet.userId.toString() !== userId.toString()) {
      throw new NotFoundException('unauthorized');
    }

    return this.prisma.tweet.delete({ where: { id } });
  }

  async findHomeTweets(
    userId: UUID,
    where: GetTweetsInput,
    paginate: PaginationInput,
    orderBy: OrderTweetsInput,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { following: true },
    });
    if (!user) throw new NotFoundException('user not found');
    const userIds = [
      userId,
      ...user.following.map((following) => following.followingId),
    ] as UUID[];
    return this.prisma.tweet.findMany({
      where: {
        ...where,
        userId: { in: userIds },
      },
      ...paginate,
      orderBy,
      include: { originalTweet: { include: { user: true } }, user: true },
    });
  }

  async getTweetsByBatch(userIds: UUID[]) {
    const tweets = await this.prisma.tweet.findMany({
      where: { userId: { in: userIds } },
      include: {
        user: true,
        originalTweet: { include: { user: true } },
      },
    });
    return userIds.map((id) =>
      tweets.filter((tweet) => tweet.userId === id),
    ) as Tweet[][];
  }
}

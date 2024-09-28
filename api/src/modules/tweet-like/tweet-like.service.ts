import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { PrismaService } from 'src/shared/database/prisma.service';
import { TweetLike } from '@prisma/client';
import { GetTweetLikesInput } from './dto/get-tweet-likes.input';
import { OrderTweetLikesInput } from './dto/order-tweet-likes.input';
import { PaginationInput } from 'src/shared/dtos/pagination.input';
import { orderBy } from 'src/shared/enums/order-by.enum';

@Injectable()
export class TweetLikeService {
  constructor(private readonly prisma: PrismaService) {}

  async toggle(userId: UUID, tweetId: UUID) {
    await this._validate(userId, tweetId);

    const like = await this.prisma.tweetLike.findFirst({
      where: { userId, tweetId },
    });
    if (like) {
      await this.prisma.tweetLike.delete({ where: { id: like.id } });
      return null;
    }

    return this.prisma.tweetLike.create({
      data: { userId, tweetId },
    });
  }

  async findMany(
    where: GetTweetLikesInput,
    orderBy: OrderTweetLikesInput,
    paginate: PaginationInput,
  ) {
    return this.prisma.tweetLike.findMany({
      where,
      ...paginate,
      orderBy,
      include: { user: true },
    });
  }

  async findTweetLikes(tweetId: UUID) {
    const tweet = await this.prisma.tweet.findFirst({ where: { id: tweetId } });
    if (!tweet) throw new NotFoundException('tweet not found');

    return this.findMany({ tweetId }, { createdAt: orderBy.DESC }, {});
  }

  async getTweetsLikesByBatch(tweetIds: UUID[]) {
    const likes = await this.prisma.tweetLike.findMany({
      where: { tweetId: { in: tweetIds } },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });

    const mp: Map<UUID, TweetLike[]> = new Map(
      tweetIds.map((tweetId) => [tweetId, []]),
    );
    likes.forEach((like) => {
      mp.get(like.tweetId as UUID).push(like as TweetLike);
    });

    return tweetIds.map((tweetId) => mp.get(tweetId as UUID));
  }

  private async _validate(userId: UUID, tweetId: UUID) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) throw new NotFoundException('user not found');

    const tweet = await this.prisma.tweet.findFirst({ where: { id: tweetId } });
    if (!tweet) throw new NotFoundException('tweet not found');
  }
}

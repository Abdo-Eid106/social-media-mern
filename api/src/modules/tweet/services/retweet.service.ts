import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UUID } from 'crypto';

@Injectable()
export class RetweetService {
  constructor(private readonly prisma: PrismaService) {}

  async toggle(userId: UUID, tweetId: UUID) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('no user found with this id');

    const tweet = await this.prisma.tweet.findUnique({
      where: { id: tweetId },
    });
    if (!tweet || tweet.originalTweetId != null) {
      throw new NotFoundException('no tweet found with this id');
    }

    const retweet = await this.prisma.tweet.findFirst({
      where: {
        originalTweetId: tweetId,
        userId,
      },
    });

    if (retweet) {
      await this.prisma.tweet.deleteMany({
        where: { originalTweetId: tweetId, userId },
      });
      return null;
    }

    return this.prisma.tweet.create({
      data: {
        userId,
        originalTweetId: tweetId,
        content: tweet.content /*to apear in search*/,
      },
    });
  }

  async findRetweets(tweetId: UUID) {
    return this.prisma.tweet.findMany({
      where: { originalTweetId: tweetId },
      include: { user: true },
    });
  }
}

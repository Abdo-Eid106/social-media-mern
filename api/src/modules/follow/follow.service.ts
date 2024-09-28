import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UUID } from 'crypto';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}

  async toggle(followerId: UUID, followingId: UUID) {
    const follower = await this.prisma.user.findUnique({
      where: { id: followerId },
    });
    if (!follower) throw new NotFoundException('follower not found');

    const following = await this.prisma.user.findUnique({
      where: { id: followingId },
    });
    if (!following) throw new NotFoundException('following not found');

    if (followerId == followingId)
      throw new BadRequestException("follower can't be equal to following");

    const follow = await this.prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });

    if (follow) {
      await this.prisma.follow.delete({
        where: { followerId_followingId: { followerId, followingId } },
      });
      return null;
    }

    return this.prisma.follow.create({
      data: { followerId, followingId },
    });
  }
}

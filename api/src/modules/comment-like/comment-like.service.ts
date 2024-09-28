import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UUID } from 'crypto';
import { CommentLike } from '@prisma/client';

@Injectable()
export class CommentLikeService {
  constructor(private readonly prisma: PrismaService) {}

  async toggle(userId: UUID, commentId: UUID) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('user not found');

    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException('comment not found');

    const commentLike = await this.prisma.commentLike.findFirst({
      where: {
        userId,
        commentId,
      },
    });

    if (commentLike) {
      await this.prisma.commentLike.delete({ where: { id: commentLike.id } });
      return null;
    }

    return this.prisma.commentLike.create({
      data: {
        userId,
        commentId,
      },
    });
  }

  async findManyByCommentIds(commentIds: UUID[]) {
    const commentLikes = await this.prisma.commentLike.findMany({
      where: { commentId: { in: commentIds } },
      include: { user: { select: { id: true } } },
    });

    const mp: Map<UUID, CommentLike[]> = new Map(
      commentIds.map((commentId) => [commentId, []]),
    );

    commentLikes.forEach((commentLike) => {
      mp.get(commentLike.commentId as UUID).push(commentLike);
    });

    return commentIds.map((commentId) => mp.get(commentId));
  }
}

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UUID } from 'crypto';
import { GetCommentsInput } from './dto/get-comments.input';
import { PaginationInput } from 'src/shared/dtos/pagination.input';
import { OrderCommentsInput } from './dto/order-comments.input';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentInput: CreateCommentInput, userId: UUID) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) throw new NotFoundException('user not found');

    const tweet = await this.prisma.tweet.findFirst({
      where: { id: createCommentInput.tweetId },
    });
    if (!tweet) throw new NotFoundException('tweet not found');

    return this.prisma.comment.create({
      data: {
        ...createCommentInput,
        userId,
      },
    });
  }

  findMany(
    where: GetCommentsInput,
    paginate: PaginationInput,
    orderBy: OrderCommentsInput,
  ) {
    return this.prisma.comment.findMany({
      where,
      ...paginate,
      orderBy,
      include: { user: true },
    });
  }

  async findOne(id: UUID) {
    const comment = await this.prisma.comment.findFirst({
      where: { id },
      include: { user: true },
    });

    if (!comment) {
      throw new NotFoundException('no comment found with this id');
    }

    return comment;
  }

  async update(id: UUID, updateCommentInput: UpdateCommentInput, userId: UUID) {
    const comment = await this.findOne(id);

    if (comment.userId.toString() != userId.toString()) {
      throw new UnauthorizedException('unauthorized');
    }

    return this.prisma.comment.update({
      where: { id },
      data: updateCommentInput,
      include: { user: true },
    });
  }

  async remove(id: UUID, userId: UUID) {
    const comment = await this.findOne(id);

    if (comment.userId.toString() != userId.toString()) {
      throw new UnauthorizedException('unauthorized');
    }

    return this.prisma.comment.delete({
      where: { id },
      include: { user: true },
    });
  }

  async getTweetsCommentsByBatch(tweetIds: UUID[]) {
    const comments = await this.prisma.comment.findMany({
      where: { tweetId: { in: tweetIds } },
      include: { user: true },
    });

    const mp: Map<UUID, Comment[]> = new Map(
      tweetIds.map((tweetId) => [tweetId, []]),
    );
    comments.forEach((comment) => {
      mp.get(comment.tweetId as UUID).push(comment);
    });

    return tweetIds.map((tweetId) => mp.get(tweetId as UUID));
  }
}

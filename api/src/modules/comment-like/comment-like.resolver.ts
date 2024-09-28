import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { CommentLikeService } from './comment-like.service';
import { UUID } from 'crypto';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from 'src/modules/auth/guards/gql-jwt.guard';
import { IPayloud } from 'src/shared/interfaces/payloud.interface';
import { GqlCommentLike } from './dtos/comment-like.type';
import { NotificationService } from 'src/modules/notification/notification.service';
import { NotificatinType } from '@prisma/client';
import { currentUser } from 'src/shared/decorators/current-user.decorator';

@Resolver()
export class CommentLikeResolver {
  constructor(
    private readonly commentLikeService: CommentLikeService,
    private readonly notificationService: NotificationService,
  ) {}

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlCommentLike, { nullable: true })
  async toggleCommentLike(
    @Args('id', { type: () => ID }) id: UUID,
    @currentUser() user: IPayloud,
  ) {
    const commentLike = await this.commentLikeService.toggle(user.id, id);
    if (commentLike) {
      await this.notificationService.create(
        commentLike.id as UUID,
        NotificatinType.COMMENTLIKE,
      );
    }
    return commentLike;
  }
}

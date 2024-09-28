import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { GqlComment } from './dto/comment.type';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from 'src/modules/auth/guards/gql-jwt.guard';
import { UUID } from 'crypto';
import { currentUser } from 'src/shared/decorators/current-user.decorator';
import { IPayloud } from 'src/shared/interfaces/payloud.interface';
import { GetCommentsInput } from './dto/get-comments.input';
import { PaginationInput } from 'src/shared/dtos/pagination.input';
import { OrderCommentsInput } from './dto/order-comments.input';
import { NotificationService } from 'src/modules/notification/notification.service';
import { NotificatinType } from '@prisma/client';
import { GqlCommentLike } from 'src/modules/comment-like/dtos/comment-like.type';
import { IDataloaders } from 'src/shared/dataloader/dataloader.interface';

@Resolver(() => GqlComment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly notificationService: NotificationService,
  ) {}

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlComment)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @currentUser() user: IPayloud,
  ) {
    const comment = await this.commentService.create(
      createCommentInput,
      user.id,
    );
    await this.notificationService.create(
      comment.id as UUID,
      NotificatinType.COMMENT,
    );
    return comment;
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => [GqlComment], { name: 'comments' })
  findMany(
    @Args('getCommentsDto') GetCommentsInput: GetCommentsInput,
    @Args('orderBy', { nullable: true }) orderBy: OrderCommentsInput,
    @Args('paginate', { nullable: true }) paginate: PaginationInput,
  ) {
    return this.commentService.findMany(GetCommentsInput, paginate, orderBy);
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => GqlComment, { name: 'comment' })
  findOne(@Args('id', { type: () => ID }) id: UUID) {
    return this.commentService.findOne(id);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlComment)
  updateComment(
    @Args('id', { type: () => ID }) id: UUID,
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
    @currentUser() user: IPayloud,
  ) {
    return this.commentService.update(id, updateCommentInput, user.id);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlComment)
  removeComment(
    @Args('id', { type: () => ID }) id: UUID,
    @currentUser() user: IPayloud,
  ) {
    return this.commentService.remove(id, user.id);
  }

  @ResolveField(() => [GqlCommentLike])
  async likes(
    @Parent() comment: GqlComment,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    return loaders.commentsLikesLoader.load(comment.id);
  }
}

import { Injectable } from '@nestjs/common';
import { Comment, TweetLike, User, Tweet, CommentLike } from '@prisma/client';
import { TweetService } from 'src/modules/tweet/services/tweet.service';
import { UserService } from 'src/modules/user/user.service';
import { CommentService } from 'src/modules/comment/comment.service';
import { TweetLikeService } from 'src/modules/tweet-like/tweet-like.service';
import { IDataloaders } from './dataloader.interface';
import { CommentLikeService } from 'src/modules/comment-like/comment-like.service';
import * as DataLoader from 'dataloader';
import { UUID } from 'crypto';

@Injectable()
export class DataLoaderService {
  constructor(
    private readonly tweetService: TweetService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
    private readonly tweetLikeService: TweetLikeService,
    private readonly commentLikeService: CommentLikeService,
  ) {}

  getLoaders(): IDataloaders {
    const usersLoader = this._createUsersLoader();
    const tweetsLoader = this._createTweetsLoader();
    const commentsLoader = this._createCommentsLoader();
    const tweetsLikesLoader = this._createTweetsLikesLoader();
    const commentsLikesLoader = this._createCommentsLikesLoader();

    return {
      usersLoader,
      tweetsLoader,
      commentsLoader,
      tweetsLikesLoader,
      commentsLikesLoader,
    };
  }

  private _createTweetsLoader() {
    return new DataLoader<UUID, Tweet[]>(async (userIds: UUID[]) => {
      return (await this.tweetService.getTweetsByBatch(userIds)) as Tweet[][];
    });
  }

  private _createUsersLoader() {
    return new DataLoader<UUID, User>(async (userIds: UUID[]) => {
      return (await this.userService.getUsersByBatch(userIds)) as User[];
    });
  }

  private _createCommentsLoader() {
    return new DataLoader<UUID, Comment[]>(async (tweetIds: UUID[]) => {
      return this.commentService.getTweetsCommentsByBatch(tweetIds);
    });
  }

  private _createTweetsLikesLoader() {
    return new DataLoader<UUID, TweetLike[]>(async (tweetIds: UUID[]) => {
      return this.tweetLikeService.getTweetsLikesByBatch(tweetIds);
    });
  }

  private _createCommentsLikesLoader() {
    return new DataLoader<UUID, CommentLike[]>(async (commentIds: UUID[]) => {
      return this.commentLikeService.findManyByCommentIds(commentIds);
    });
  }
}

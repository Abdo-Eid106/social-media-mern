import DataLoader from 'dataloader';
import { UUID } from 'crypto';
import { Tweet, User, Comment, TweetLike, CommentLike } from '@prisma/client';

export interface IDataloaders {
  usersLoader: DataLoader<UUID, User>;
  tweetsLoader: DataLoader<UUID, Tweet[]>;
  commentsLoader: DataLoader<UUID, Comment[]>;
  tweetsLikesLoader: DataLoader<UUID, TweetLike[]>;
  commentsLikesLoader: DataLoader<UUID, CommentLike[]>;
}

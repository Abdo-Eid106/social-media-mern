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
import { TweetService } from '../services/tweet.service';
import { CreateTweetInput } from '../dto/create-tweet.input';
import { UpdateTweetInput } from '../dto/update-tweet.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from 'src/modules/auth/guards/gql-jwt.guard';
import { currentUser } from 'src/shared/decorators/current-user.decorator';
import { IPayloud } from 'src/shared/interfaces/payloud.interface';
import { GqlTweet } from '../dto/tweet.type';
import { GetTweetsInput } from '../dto/get-tweet.input';
import { UUID } from 'crypto';
import { IDataloaders } from 'src/shared/dataloader/dataloader.interface';
import { GqlComment } from 'src/modules/comment/dto/comment.type';
import { GqlTweetLike } from 'src/modules/tweet-like/dto/tweet-like.type';
import { PaginationInput } from 'src/shared/dtos/pagination.input';
import { OrderTweetsInput } from '../dto/order-tweets.input';
import { RetweetService } from '../services/retweet.service';

@Resolver(() => GqlTweet)
export class TweetResolver {
  constructor(
    private readonly tweetService: TweetService,
    private readonly retweetService: RetweetService,
  ) {}

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlTweet)
  createTweet(
    @Args('createTweetInput') createTweetInput: CreateTweetInput,
    @currentUser() user: IPayloud,
  ) {
    return this.tweetService.create(createTweetInput, user.id);
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => [GqlTweet], { name: 'tweets' })
  findAll(
    @Args('getTweetsInput', { nullable: true }) query: GetTweetsInput,
    @Args('paginate', { nullable: true }) paginate: PaginationInput,
    @Args('orderBy', { nullable: true }) orderBy: OrderTweetsInput,
  ) {
    return this.tweetService.findMany(query, paginate, orderBy);
  }

  @Query(() => GqlTweet, { name: 'tweet' })
  findOne(@Args('id', { type: () => ID }) id: UUID) {
    return this.tweetService.findOne(id);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlTweet, { name: 'updateTweet' })
  updateTweet(
    @Args('updateTweetInput') UpdateTweetInput: UpdateTweetInput,
    @currentUser() user: IPayloud,
  ) {
    return this.tweetService.update(
      UpdateTweetInput.id,
      UpdateTweetInput,
      user.id,
    );
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlTweet)
  removeTweet(
    @Args('id', { type: () => ID }) id: UUID,
    @currentUser() user: IPayloud,
  ) {
    return this.tweetService.remove(id, user.id);
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => [GqlTweet])
  homeTweets(
    @Args('getTweetsInput', { nullable: true }) query: GetTweetsInput,
    @Args('paginate', { nullable: true }) paginate: PaginationInput,
    @Args('orderBy', { nullable: true }) orderBy: OrderTweetsInput,
    @currentUser() user: IPayloud,
  ) {
    return this.tweetService.findHomeTweets(user.id, query, paginate, orderBy);
  }

  @ResolveField(() => [GqlComment])
  async comments(
    @Parent() tweet: GqlTweet,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    const comments = await loaders.commentsLoader.load(tweet.id);
    return comments;
  }

  @ResolveField(() => [GqlTweetLike])
  async likes(
    @Parent() tweet: GqlTweet,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    const likes = await loaders.tweetsLikesLoader.load(tweet.id);
    return likes;
  }

  @ResolveField(() => [GqlTweet])
  async retweets(@Parent() tweet: GqlTweet) {
    return this.retweetService.findRetweets(tweet.id);
  }
}

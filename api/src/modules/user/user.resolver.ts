import {
  Resolver,
  Query,
  Args,
  ID,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { GqlUser } from './dto/user.type';
import { UUID } from 'crypto';
import { IDataloaders } from 'src/shared/dataloader/dataloader.interface';
import { GqlTweet } from '../tweet/dto/tweet.type';
import { GetUsersInput } from './dto/get-users.input';
import { PaginationInput } from 'src/shared/dtos/pagination.input';
import { OrderUsersInput } from './dto/order-users.input';
import { currentUser } from 'src/shared/decorators/current-user.decorator';
import { IPayloud } from 'src/shared/interfaces/payloud.interface';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from '../auth/guards/gql-jwt.guard';

@Resolver(() => GqlUser)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => [GqlUser], { name: 'users' })
  findMany(
    @Args('filter', { nullable: true }) query: GetUsersInput,
    @Args('paginate', { nullable: true }) paginate: PaginationInput,
    @Args('orderBy', { nullable: true }) orderBy: OrderUsersInput,
  ) {
    return this.userService.findMany(query, paginate, orderBy);
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => GqlUser, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: UUID) {
    return this.userService.findOne(id);
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => GqlUser, { name: 'me' })
  currentUser(@currentUser() user: IPayloud) {
    return this.userService.findOne(user.id);
  }

  @ResolveField(() => [GqlTweet])
  async tweets(
    @Parent() user: GqlUser,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    const tweets = await loaders.tweetsLoader.load(user.id);
    return tweets;
  }

  @ResolveField(() => [GqlUser])
  async followers(@Parent() user: GqlUser) {
    return this.userService.findUserFollowers(user.id);
  }

  @ResolveField(() => [GqlUser])
  async followings(@Parent() user: GqlUser) {
    return this.userService.findUserFollowings(user.id);
  }
}

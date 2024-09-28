import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { GqlChat } from './dto/chat.type';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { GqlJwtGuard } from 'src/modules/auth/guards/gql-jwt.guard';
import { UseGuards } from '@nestjs/common';
import { MessageService } from 'src/modules/message/message.service';
import { IPayloud } from 'src/shared/interfaces/payloud.interface';
import { UUID } from 'crypto';
import { GqlMessage } from 'src/modules/message/dto/message.type';
import { orderBy } from 'src/shared/enums/order-by.enum';
import { currentUser } from 'src/shared/decorators/current-user.decorator';

@Resolver(() => GqlChat)
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlChat)
  createChat(
    @Args('createChatInput') createChatInput: CreateChatInput,
    @Context() { req: { user } }: { req: { user: IPayloud } },
  ) {
    return this.chatService.create(createChatInput, user.id);
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => [GqlChat], { name: 'chats' })
  findAll(@currentUser() user: IPayloud) {
    return this.chatService.findUserChats(user.id);
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => GqlChat, { name: 'chat' })
  findOne(@Args('id', { type: () => ID }) id: UUID) {
    return this.chatService.findOne(id);
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => GqlChat, { nullable: true })
  findLatestChat(@currentUser() user: IPayloud) {
    return this.chatService.findUserLatestChat(user.id);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlChat)
  updateChat(
    @Args('updateChatInput') updateChatInput: UpdateChatInput,
    @currentUser() user: IPayloud,
  ) {
    return this.chatService.update(updateChatInput, user.id);
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => GqlChat)
  getDirectChat(
    @Args('userId', { type: () => ID }) userId: UUID,
    @currentUser() user: IPayloud,
  ) {
    return this.chatService.findOrCreateDirectChat(userId, user.id);
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => [GqlChat])
  unreadedChats(@currentUser() user: IPayloud) {
    return this.chatService.findUnreadedChats(user.id);
  }

  @ResolveField(() => GqlMessage, { nullable: true })
  async latestMessage(@Parent() chat: GqlChat) {
    return this.messageService.findChatLatestMessage(chat.id);
  }

  @ResolveField(() => [GqlMessage])
  messages(@Parent() chat: GqlChat) {
    return this.messageService.findMany(
      { chatId: chat.id },
      {
        createdAt: orderBy.ASC,
      },
      {},
    );
  }
}

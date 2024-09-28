import { Resolver, Mutation, Args, ID, Query, Int } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { GqlMessage } from './dto/message.type';
import { CreateMessageInput } from './dto/create-message.input';
import { GqlJwtGuard } from 'src/modules/auth/guards/gql-jwt.guard';
import { UpdateMessageInput } from './dto/update-message.input';
import { UseGuards } from '@nestjs/common';
import { IPayloud } from 'src/shared/interfaces/payloud.interface';
import { UUID } from 'crypto';
import { GetMessagesInput } from './dto/get-messages.input';
import { currentUser } from 'src/shared/decorators/current-user.decorator';

@Resolver(() => GqlMessage)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlMessage)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @currentUser() user: IPayloud,
  ) {
    return this.messageService.create(createMessageInput, user.id);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => GqlMessage)
  updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
    @currentUser() user: IPayloud,
  ) {
    return this.messageService.update(
      updateMessageInput.id,
      updateMessageInput,
      user.id,
    );
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => GqlMessage, { nullable: true })
  async latestMessage(@Args('chatId', { type: () => ID }) chatId: UUID) {
    const message = await this.messageService.findChatLatestMessage(chatId);
    return message;
  }

  @Mutation(() => GqlMessage)
  @UseGuards(GqlJwtGuard)
  removeMessage(
    @Args('id', { type: () => ID }) id: UUID,
    @currentUser() user: IPayloud,
  ) {
    return this.messageService.remove(id, user.id);
  }

  @Mutation(() => [GqlMessage])
  @UseGuards(GqlJwtGuard)
  readMessages(
    @Args('getMessagesInput') GetMessagesInput: GetMessagesInput,
    @currentUser() user: IPayloud,
  ) {
    return this.messageService.readMessages(user.id, GetMessagesInput);
  }

  @Mutation(() => GqlMessage)
  @UseGuards(GqlJwtGuard)
  readMessage(
    @Args('id', { type: () => ID }) id: UUID,
    @currentUser() user: IPayloud,
  ) {
    return this.messageService.readMessage(user.id, id);
  }

  @Query(() => Int)
  @UseGuards(GqlJwtGuard)
  unreadedMessagesCount(@currentUser() user: IPayloud) {
    return this.messageService.getUserUnreadedMessagesCount(user.id);
  }
}

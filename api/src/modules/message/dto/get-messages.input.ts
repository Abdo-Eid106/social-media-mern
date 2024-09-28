import { ID, InputType, Field } from '@nestjs/graphql';
import { StringFilter } from 'src/shared/dtos/filter-operators.input';
import { DateFilter } from 'src/shared/dtos/filter-operators.input';
import { UUID } from 'crypto';

@InputType()
export class GetMessagesInput {
  @Field(() => ID, { nullable: true })
  userId?: UUID;

  @Field(() => ID)
  chatId: UUID;

  @Field(() => StringFilter, { nullable: true })
  content?: StringFilter;

  @Field(() => DateFilter, { nullable: true })
  createdAt?: DateFilter;
}

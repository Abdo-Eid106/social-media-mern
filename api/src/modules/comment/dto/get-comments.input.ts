import { InputType, Field, ID } from '@nestjs/graphql';
import { StringFilter } from 'src/shared/dtos/filter-operators.input';
import { UUID } from 'crypto';

@InputType()
export class GetCommentsInput {
  @Field(() => StringFilter, { nullable: true })
  content?: StringFilter;

  @Field(() => ID)
  tweetId: UUID;
}

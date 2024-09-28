import { InputType, Field, ID } from '@nestjs/graphql';
import { UUID } from 'crypto';
import { StringFilter } from 'src/shared/dtos/filter-operators.input';

@InputType()
export class GetTweetsInput {
  @Field(() => StringFilter, { nullable: true })
  content?: StringFilter;

  @Field(() => ID, { nullable: true })
  userId?: UUID;
}

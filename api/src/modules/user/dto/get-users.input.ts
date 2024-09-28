import { Field, InputType } from '@nestjs/graphql';
import { StringFilter } from 'src/shared/dtos/filter-operators.input';

@InputType()
export class GetUsersInput {
  @Field(() => StringFilter, { nullable: true })
  username?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  email?: StringFilter;
}

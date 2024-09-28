import { InputType, Field } from '@nestjs/graphql';
import { orderBy } from 'src/shared/enums/order-by.enum';

@InputType()
export class OrderTweetsInput {
  @Field(() => orderBy, { nullable: true })
  content?: orderBy;

  @Field(() => orderBy, { nullable: true })
  userId?: orderBy;

  @Field(() => orderBy, { nullable: true })
  createdAt?: orderBy;

  @Field(() => orderBy, { nullable: true })
  updatedAt?: orderBy;
}

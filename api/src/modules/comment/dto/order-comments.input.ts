import { InputType, Field, ID } from '@nestjs/graphql';
import { orderBy } from 'src/shared/enums/order-by.enum';

@InputType()
export class OrderCommentsInput {
  @Field(() => orderBy, { nullable: true })
  content?: orderBy;

  @Field(() => ID, { nullable: true })
  tweetId?: orderBy;

  @Field(() => orderBy, { nullable: true })
  createdAt: orderBy;

  @Field(() => orderBy, { nullable: true })
  updatedAt: orderBy;
}

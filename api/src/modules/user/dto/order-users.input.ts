import { Field, InputType } from '@nestjs/graphql';
import { orderBy } from 'src/shared/enums/order-by.enum';

@InputType()
export class OrderUsersInput {
  @Field(() => orderBy, { nullable: true })
  username?: orderBy;

  @Field(() => orderBy, { nullable: true })
  email?: orderBy;

  @Field(() => orderBy, { nullable: true })
  createdAt: orderBy;

  @Field(() => orderBy, { nullable: true })
  updatedAt: orderBy;
}

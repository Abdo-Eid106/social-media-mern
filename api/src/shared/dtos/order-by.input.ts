import { InputType, Field } from '@nestjs/graphql';
import { orderBy } from '../enums/order-by.enum';

@InputType()
export class OrderByInput {
  @Field(() => orderBy, { nullable: true })
  createdAt?: orderBy;

  @Field(() => orderBy, { nullable: true })
  updatedAt?: orderBy;
}

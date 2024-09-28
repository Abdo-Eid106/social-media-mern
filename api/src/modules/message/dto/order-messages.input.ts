import { InputType, Field } from '@nestjs/graphql';
import { orderBy } from 'src/shared/enums/order-by.enum';

@InputType()
export class OrderMessagesInput {
  @Field(() => orderBy, { nullable: true })
  createdAt?: orderBy;
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationInput {
  @Field({ nullable: true })
  readed?: boolean;

  @Field({ nullable: true })
  opened?: boolean;
}

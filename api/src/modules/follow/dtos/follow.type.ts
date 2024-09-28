import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Follow')
export class GqlFollow {
  @Field()
  createdAt: Date;
}

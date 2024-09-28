import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UUID } from 'crypto';

@ObjectType('User')
export class GqlUser {
  @Field(() => ID)
  id: UUID;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  profilePhoto?: string;

  @Field({ nullable: true })
  coverPhoto?: string;

  @Field(() => [GqlUser])
  followers: GqlUser[];

  @Field(() => [GqlUser])
  followings: GqlUser[];
}

import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { UUID } from 'crypto';

@InputType()
export class CreateCommentInput {
  @Field(() => ID)
  tweetId: UUID;

  @Field()
  @IsString()
  content: string;
}

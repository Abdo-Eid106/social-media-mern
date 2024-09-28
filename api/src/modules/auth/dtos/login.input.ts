import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @IsEmail({}, { message: 'Email is not valid' })
  @Field()
  email: string;

  @Field()
  @IsString()
  password: string;
}

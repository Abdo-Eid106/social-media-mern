import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

@InputType()
export class SignupInput {
  @Field()
  @IsString()
  firstname: string;

  @Field()
  @IsString()
  lastname: string;

  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @Field()
  @IsString()
  @IsString()
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/\d/, {
    message: 'Password must contain at least one number',
  })
  @Length(8, 30)
  password: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  profilePhoto: string;
}

import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length, Matches } from 'class-validator';

@InputType()
export class ResetPasswordInput {
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

  @Field()
  resetToken: string;
}

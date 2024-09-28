import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dtos/login.input';
import { User } from '@prisma/client';
import { GqlUser } from 'src/modules/user/dto/user.type';
import { SignupInput } from './dtos/signup.input';
import { ResetPasswordInput } from './dtos/reset-password.input';

@Resolver(() => GqlUser)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => GqlUser)
  signup(@Args('signupInput') input: SignupInput) {
    return this.authService.signup(input);
  }

  @Mutation(() => String)
  async login(@Args('loginInput') { email, password }: LoginInput) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user as User);
  }

  @Mutation(() => String)
  async forgotPassword(@Args('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Mutation(() => String)
  async resetPassword(
    @Args('resetPasswordInput') { password, resetToken }: ResetPasswordInput,
  ) {
    return this.authService.resetPassword(password, resetToken);
  }
}

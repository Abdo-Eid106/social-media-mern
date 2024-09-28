import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { IPayloud } from 'src/shared/interfaces/payloud.interface';
import { compare } from 'bcrypt';
import { SignupInput } from './dtos/signup.input';
import { EmailService } from 'src/shared/email/email.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async signup(input: SignupInput) {
    let user = await this.prisma.user.findFirst({
      where: { email: input.email },
    });
    if (user) {
      throw new BadRequestException('Email already in use');
    }

    user = await this.prisma.user.findFirst({
      where: { username: input.username },
    });
    if (user) {
      throw new BadRequestException('Username already in use');
    }

    input.password = await hash(input.password, 12);
    return this.prisma.user.create({ data: input });
  }

  async login(user: User) {
    return this.jwtService.signAsync({ id: user.id } as IPayloud);
  }

  async validateUser(email: string, passowrd: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user || !(await compare(passowrd, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) throw new NotFoundException('no user found with this email');
    await this.prisma.resetToken.deleteMany({ where: { userId: user.id } });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    await this.emailService.sendResetPasswordEmail(email, resetToken);
    await this.prisma.resetToken.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });
    return 'check your email';
  }

  async resetPassword(password: string, resetToken: string) {
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const token = await this.prisma.resetToken.findFirst({
      where: { token: hashedToken, expiresAt: { gt: new Date() } },
    });
    if (!token) throw new NotFoundException('invalid or expired token');
    await this.prisma.resetToken.delete({ where: { id: token.id } });

    const hashesedPassword = await hash(password, 12);
    await this.prisma.user.update({
      where: { id: token.userId },
      data: { password: hashesedPassword },
    });
    return 'password reset successfully';
  }
}

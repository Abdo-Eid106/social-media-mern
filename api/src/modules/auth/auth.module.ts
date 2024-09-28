import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/shared/database/database.module';
import { AuthResolver } from './auth.resolver';
import { EmailModule } from 'src/shared/email/email.module';

@Module({
  imports: [
    EmailModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
    DatabaseModule,
    PassportModule,
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService, AuthResolver],
})
export class AuthModule {}

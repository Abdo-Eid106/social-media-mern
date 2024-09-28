import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DatabaseModule } from 'src/shared/database/database.module';
import { UserController } from './user.controller';
import { UploadModule } from 'src/shared/upload/upload.module';

@Module({
  imports: [DatabaseModule, UploadModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

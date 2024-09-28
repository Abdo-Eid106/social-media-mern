import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './shared/database/database.module';
import { TweetModule } from './modules/tweet/tweet.module';
import { EmailModule } from './shared/email/email.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CommentModule } from './modules/comment/comment.module';
import { DataloaderModule } from './shared/dataloader/dataloader.module';
import { DataLoaderService } from './shared/dataloader/dataloader.service';
import { TweetLikeModule } from './modules/tweet-like/tweet-like.module';
import { FollowModule } from './modules/follow/follow.module';
import { ChatModule } from './modules/chat/chat.module';
import { MessageModule } from './modules/message/message.module';
import { APP_PIPE } from '@nestjs/core';
import { NotificationModule } from './modules/notification/notification.module';
import { CommentLikeModule } from './modules/comment-like/comment-like.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { UploadModule } from './shared/upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { validationPipe } from './shared/pipes/validation.pipe';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    EmailModule,
    TweetModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      inject: [DataLoaderService],
      useFactory: (dataloaderService: DataLoaderService) => {
        return {
          cors: {
            origin: '*',
            credentials: true,
          },
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          context: () => ({
            loaders: dataloaderService.getLoaders(),
          }),
        };
      },
    }),
    CommentModule,
    TweetLikeModule,
    FollowModule,
    ChatModule,
    MessageModule,
    NotificationModule,
    CommentLikeModule,
    UploadModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    LoggerMiddleware,
    AppService,
    {
      provide: APP_PIPE,
      useValue: validationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

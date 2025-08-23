import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './module/post/post.module';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/db.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { SocketModule } from './module/socket/socket.module';
import { CloudinaryModule } from './module/cloudinary/cloudinary.module';
import { MailModuleModule } from './module/mail/mail-module.module';
import { TasksModule } from './module/tasks/tasks.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    MailModuleModule,

    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }
        return AppDataSource;
      },
    }),

    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 1000,
        },
      ],
    }),

    LoggerModule.forRoot({
      pinoHttp : {
        transport : process.env.PORT !== 'development' ? {target : 'pino-pretty'} : undefined
      }
    }),

    SocketModule,

    CloudinaryModule,

    MailModuleModule,

    TasksModule,

  ],

  controllers: [AppController],

  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },


  ],
})

export class AppModule {}

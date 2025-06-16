/* eslint-disable import/no-unresolved */
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PROCESSOR } from 'src/common/constants';
import EmailService from 'src/email/email.service';
import SmsService from 'src/email/sms.service';
import { JwtSignService } from 'src/user-auth/jwt.sign.service';

import { PrismaModule } from '../prisma/prisma.module';
import { UserDashBoardController } from './controller/user-dashboard.controller';
import { UserDashBoardService } from './services/user-dashboard.service';


@Module({
  providers: [
    JwtSignService,
    SmsService,
    EmailService,
    UserDashBoardService,

  ],
  exports: [],
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt_secret'),
        // privateKey: configService.get<string>('keys.privateKey'),
        // publicKey: configService.get<string>('keys.publicKey'),
        signOptions: { /* expiresIn: '86400s', */algorithm: 'HS256' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    BullModule.registerQueueAsync(
      { name: PROCESSOR.QUEUES.MAIN, }
    ),
  ],
  controllers: [
    UserDashBoardController,
  ]
})

export class UsersModule { }

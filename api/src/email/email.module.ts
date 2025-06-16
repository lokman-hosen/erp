import { Module } from '@nestjs/common';
import EmailService from './email.service';
import { ConfigModule } from '@nestjs/config';
import SmsService from "./sms.service";
import { BullModule } from '@nestjs/bull';
import { PROCESSOR } from 'src/common/constants';

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueueAsync({
      name: PROCESSOR.QUEUES.MAIN,
    }),
  ],
  controllers: [],
  providers: [
    EmailService,
    SmsService,
  ],
  exports: [
    EmailService,
    SmsService,
  ],
})
export class EmailModule { }

/* eslint-disable */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BullModule } from '@nestjs/bull';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttachmentsModule } from './attachments/attachments.module';
import { PROCESSOR } from './common/constants';
import configuration from './config';
import { CrudModule } from './crud/crud.module';
import { EmailModule } from './email/email.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UsersModule } from './users/users.module';
import { SupplierModule } from './supplier/supplier.module';
import { GoodsReturnModule } from './goods-return/goods-return.module';
import { GoodReceiptModule } from './good-receipt/good-receipt.module';
import { InspectionCommitteeModule } from './inspection-committee/inspection-committee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASS
      },
    }),
    BullModule.registerQueueAsync(
      {
        name: PROCESSOR.QUEUES.MAIN,
      }
    ),
    PrismaModule,
    CrudModule,
    UserAuthModule,
    AttachmentsModule,
    UsersModule,
    AdminModule,
    EmailModule,
    AdminAuthModule,
    SupplierModule,
    GoodsReturnModule,
    GoodReceiptModule,
    InspectionCommitteeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { GoodReceiptService } from './good-receipt.service';
import { GoodReceiptController } from './good-receipt.controller';

@Module({
  controllers: [GoodReceiptController],
  providers: [GoodReceiptService],
})
export class GoodReceiptModule {}

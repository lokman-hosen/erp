import { Module } from '@nestjs/common';
import { GoodsReturnService } from './goods-return.service';
import { GoodsReturnController } from './goods-return.controller';

@Module({
  controllers: [GoodsReturnController],
  providers: [GoodsReturnService],
})
export class GoodsReturnModule {}

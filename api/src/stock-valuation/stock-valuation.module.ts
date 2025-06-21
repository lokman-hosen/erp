import { Module } from '@nestjs/common';
import { StockValuationService } from './stock-valuation.service';
import { StockValuationController } from './stock-valuation.controller';

@Module({
  controllers: [StockValuationController],
  providers: [StockValuationService],
})
export class StockValuationModule {}

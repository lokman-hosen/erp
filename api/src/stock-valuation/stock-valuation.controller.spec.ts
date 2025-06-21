import { Test, TestingModule } from '@nestjs/testing';
import { StockValuationController } from './stock-valuation.controller';
import { StockValuationService } from './stock-valuation.service';

describe('StockValuationController', () => {
  let controller: StockValuationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockValuationController],
      providers: [StockValuationService],
    }).compile();

    controller = module.get<StockValuationController>(StockValuationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

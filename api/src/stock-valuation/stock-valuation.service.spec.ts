import { Test, TestingModule } from '@nestjs/testing';
import { StockValuationService } from './stock-valuation.service';

describe('StockValuationService', () => {
  let service: StockValuationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockValuationService],
    }).compile();

    service = module.get<StockValuationService>(StockValuationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

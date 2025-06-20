import { Test, TestingModule } from '@nestjs/testing';
import { GoodReceiptService } from './good-receipt.service';

describe('GoodReceiptService', () => {
  let service: GoodReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodReceiptService],
    }).compile();

    service = module.get<GoodReceiptService>(GoodReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GoodsReturnService } from './goods-return.service';

describe('GoodsReturnService', () => {
  let service: GoodsReturnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodsReturnService],
    }).compile();

    service = module.get<GoodsReturnService>(GoodsReturnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

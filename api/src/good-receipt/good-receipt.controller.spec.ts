import { Test, TestingModule } from '@nestjs/testing';
import { GoodReceiptController } from './good-receipt.controller';
import { GoodReceiptService } from './good-receipt.service';

describe('GoodReceiptController', () => {
  let controller: GoodReceiptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodReceiptController],
      providers: [GoodReceiptService],
    }).compile();

    controller = module.get<GoodReceiptController>(GoodReceiptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

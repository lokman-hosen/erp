import { Test, TestingModule } from '@nestjs/testing';
import { GoodsReturnController } from './goods-return.controller';
import { GoodsReturnService } from './goods-return.service';

describe('GoodsReturnController', () => {
  let controller: GoodsReturnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodsReturnController],
      providers: [GoodsReturnService],
    }).compile();

    controller = module.get<GoodsReturnController>(GoodsReturnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { InspectionCommitteeController } from './inspection-committee.controller';
import { InspectionCommitteeService } from './inspection-committee.service';

describe('InspectionCommitteeController', () => {
  let controller: InspectionCommitteeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionCommitteeController],
      providers: [InspectionCommitteeService],
    }).compile();

    controller = module.get<InspectionCommitteeController>(InspectionCommitteeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

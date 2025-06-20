import { Test, TestingModule } from '@nestjs/testing';
import { InspectionCommitteeService } from './inspection-committee.service';

describe('InspectionCommitteeService', () => {
  let service: InspectionCommitteeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspectionCommitteeService],
    }).compile();

    service = module.get<InspectionCommitteeService>(InspectionCommitteeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

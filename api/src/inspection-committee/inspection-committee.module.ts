import { Module } from '@nestjs/common';
import { InspectionCommitteeService } from './inspection-committee.service';
import { InspectionCommitteeController } from './inspection-committee.controller';

@Module({
  controllers: [InspectionCommitteeController],
  providers: [InspectionCommitteeService],
})
export class InspectionCommitteeModule {}

import { PartialType } from '@nestjs/swagger';
import { CreateInspectionCommitteeDto } from './create-inspection-committee.dto';

export class UpdateInspectionCommitteeDto extends PartialType(CreateInspectionCommitteeDto) {}

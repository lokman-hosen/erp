import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateInspectionCommitteeDto {
  @IsString()
  name: string;

  @IsInt()
  created_by: number;

  @IsDateString()
  valid_until: string; // Expect ISO 8601 format

  @IsString()
  status: string;
}

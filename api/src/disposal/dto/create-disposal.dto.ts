import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApprovalStatus } from '@prisma/client'; // Assuming you're using Prisma

export class CreateDisposalDto {
  @IsInt()
  inventory_item_id: number;

  @IsDateString()
  disposal_date: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsEnum(ApprovalStatus)
  approval_status: ApprovalStatus;

  @IsString()
  @IsNotEmpty()
  disposal_code: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

import { ReceiptStatus } from '@prisma/client'; // Import the enum from Prisma client
import { IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGoodReceiptDto {
  @IsString()
  grn_number: string;

  @IsInt()
  purchase_order_id: number;

  @IsDateString()
  receipt_date: string;

  @IsEnum(ReceiptStatus)
  status: ReceiptStatus; // Use the enum type

  @IsInt()
  created_by: number;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsBoolean()
  return_status: boolean;
}
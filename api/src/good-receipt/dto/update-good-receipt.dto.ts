import { IsEnum, IsBoolean, IsDateString, IsInt, IsOptional, IsString } from 'class-validator';
import { ReceiptStatus } from '@prisma/client'; // Import the enum from Prisma client


export class UpdateGoodReceiptDto {
  @IsOptional()
  @IsString()
  grn_number?: string;

  @IsOptional()
  @IsInt()
  purchase_order_id?: number;

  @IsOptional()
  @IsDateString()
  receipt_date?: string;

  @IsOptional()
  @IsEnum(ReceiptStatus)
  status?: ReceiptStatus; // Use the enum type

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @IsBoolean()
  return_status?: boolean;
}

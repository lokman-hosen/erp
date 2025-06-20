import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateGoodsReturnDto {
  @IsInt()
  good_receipt_id: number;

  @IsDateString()
  return_date: string; // ISO format

  @IsString()
  reason: string;

  @IsInt()
  supplier_id: number;

  @IsString()
  status: string;
}

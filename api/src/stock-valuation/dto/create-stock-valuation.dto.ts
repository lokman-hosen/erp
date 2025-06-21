import { ValuationMethod } from '@prisma/client'; // Import the enum from Prisma client
import { IsDateString, IsEnum, IsInt, IsNumber,IsString } from 'class-validator';

export class CreateStockValuationDto {
  @IsInt()
  inventory_item_id: number;

  @IsEnum(ValuationMethod)
  valuation_method: ValuationMethod; // Enum field

  @IsDateString()
  last_valuation_date: string; // ISO 8601 format

  @IsNumber()
  valuation_amount: number;

  @IsString()
  status: string;
}

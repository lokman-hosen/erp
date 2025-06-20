import { IsOptional, IsString, IsNumber, IsInt, IsDateString, IsJSON } from 'class-validator';

export class CreateInventoryItemDto {
  @IsString()
  item_code: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  unit_price: number;

  @IsInt()
  min_stock_quantity: number;

  @IsInt()
  max_stock_quantity: number;

  @IsInt()
  reorder_stock_quantity: number;

  @IsInt()
  safety_stock_level: number;

  @IsOptional()
  @IsDateString()
  expiry_date?: string; // Expect ISO 8601 format

  @IsOptional()
  @IsDateString()
  last_stock_date?: string;

  @IsOptional()
  @IsString()
  cycle_count_code?: string;

  @IsOptional()
  @IsJSON()
  attributes?: object; // JSON field

  @IsString()
  status: string;
}

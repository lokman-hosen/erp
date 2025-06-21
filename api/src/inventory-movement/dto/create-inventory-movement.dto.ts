import { IsInt, IsString, IsEnum, IsDateString } from 'class-validator';
import { MovementType } from '@prisma/client'; // Import the enum from Prisma client

export class CreateInventoryMovementDto {
  @IsInt()
  inventory_item_id: number;

  @IsInt()
  from_location_id: number;

  @IsInt()
  to_location_id: number;

  @IsInt()
  quantity: number;

  @IsDateString()
  movement_date: string; // ISO 8601 format

  @IsEnum(MovementType)
  movement_type: MovementType; // Enum field

  @IsString()
  status: string;
}

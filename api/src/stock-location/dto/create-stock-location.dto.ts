import { LocationType } from '@prisma/client'; // Import LocationType enum from Prisma client
import { IsEnum,IsString } from 'class-validator';

export class CreateStockLocationDto {
  @IsString()
  name: string;

  @IsEnum(LocationType)
  type: LocationType; // Enum field for LocationType

  @IsString()
  status: string;
}

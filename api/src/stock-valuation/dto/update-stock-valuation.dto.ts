import { PartialType } from '@nestjs/swagger';
import { CreateStockValuationDto } from './create-stock-valuation.dto';

export class UpdateStockValuationDto extends PartialType(CreateStockValuationDto) {}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockValuationService } from './stock-valuation.service';
import { CreateStockValuationDto } from './dto/create-stock-valuation.dto';
import { UpdateStockValuationDto } from './dto/update-stock-valuation.dto';

@Controller('stock-valuation')
export class StockValuationController {
  constructor(private readonly stockValuationService: StockValuationService) {}

  @Post()
  create(@Body() createStockValuationDto: CreateStockValuationDto) {
    return this.stockValuationService.create(createStockValuationDto);
  }

  @Get()
  findAll() {
    return this.stockValuationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockValuationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockValuationDto: UpdateStockValuationDto) {
    return this.stockValuationService.update(+id, updateStockValuationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockValuationService.remove(+id);
  }
}

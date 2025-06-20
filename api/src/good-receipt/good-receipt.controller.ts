import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoodReceiptService } from './good-receipt.service';
import { CreateGoodReceiptDto } from './dto/create-good-receipt.dto';
import { UpdateGoodReceiptDto } from './dto/update-good-receipt.dto';

@Controller('good-receipt')
export class GoodReceiptController {
  constructor(private readonly goodReceiptService: GoodReceiptService) {}

  @Post()
  create(@Body() createGoodReceiptDto: CreateGoodReceiptDto) {
    return this.goodReceiptService.create(createGoodReceiptDto);
  }

  @Get()
  findAll() {
    return this.goodReceiptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodReceiptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodReceiptDto: UpdateGoodReceiptDto) {
    return this.goodReceiptService.update(+id, updateGoodReceiptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodReceiptService.remove(+id);
  }
}

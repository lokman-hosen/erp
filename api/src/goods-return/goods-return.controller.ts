import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoodsReturnService } from './goods-return.service';
import { CreateGoodsReturnDto } from './dto/create-goods-return.dto';
import { UpdateGoodsReturnDto } from './dto/update-goods-return.dto';

@Controller('goods-return')
export class GoodsReturnController {
  constructor(private readonly goodsReturnService: GoodsReturnService) {}

  @Post()
  create(@Body() createGoodsReturnDto: CreateGoodsReturnDto) {
    return this.goodsReturnService.create(createGoodsReturnDto);
  }


  @Get()
  findAll() {
    return this.goodsReturnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodsReturnService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodsReturnDto: UpdateGoodsReturnDto) {
    return this.goodsReturnService.update(+id, updateGoodsReturnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsReturnService.remove(+id);
  }
}

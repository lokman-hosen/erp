import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisposalService } from './disposal.service';
import { CreateDisposalDto } from './dto/create-disposal.dto';
import { UpdateDisposalDto } from './dto/update-disposal.dto';

@Controller('disposal')
export class DisposalController {
  constructor(private readonly disposalService: DisposalService) {}

  @Post()
  create(@Body() createDisposalDto: CreateDisposalDto) {
    return this.disposalService.create(createDisposalDto);
  }

  @Get()
  findAll() {
    return this.disposalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disposalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDisposalDto: UpdateDisposalDto) {
    return this.disposalService.update(+id, updateDisposalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disposalService.remove(+id);
  }
}

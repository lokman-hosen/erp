import { Body, Controller, Delete,Get, Param, Patch, Post } from '@nestjs/common';

import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto';
import { UpdateInventoryMovementDto } from './dto/update-inventory-movement.dto';
import { InventoryMovementService } from './inventory-movement.service';

  @Controller('inventory-movement')
export class InventoryMovementController {
  constructor(private readonly inventoryMovementService: InventoryMovementService) {}

  @Post()
  create(@Body() createInventoryMovementDto: CreateInventoryMovementDto) {
    return this.inventoryMovementService.create(createInventoryMovementDto);
  }

  @Get()
  findAll() {
    return this.inventoryMovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryMovementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryMovementDto: UpdateInventoryMovementDto) {
    return this.inventoryMovementService.update(+id, updateInventoryMovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryMovementService.remove(+id);
  }
}

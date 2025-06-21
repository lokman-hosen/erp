import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service'; // Ensure PrismaService is set up
import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto';
import { UpdateInventoryMovementDto } from './dto/update-inventory-movement.dto';

@Injectable()
export class InventoryMovementService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new Inventory Movement
  async create(createInventoryMovementDto: CreateInventoryMovementDto) {
    const data = {
      inventory_item_id: createInventoryMovementDto.inventory_item_id,
      from_location_id: createInventoryMovementDto.from_location_id,
      to_location_id: createInventoryMovementDto.to_location_id,
      quantity: createInventoryMovementDto.quantity,
      movement_date: new Date(createInventoryMovementDto.movement_date),
      movement_type: createInventoryMovementDto.movement_type,
      status: createInventoryMovementDto.status,
    };

    try {
      return await this.prisma.inventoryMovement.create({ data });
    } catch (error) {
      throw new Error(`Failed to create inventory movement: ${error.message}`);
    }
  }

  // Retrieve all Inventory Movements
  async findAll() {
    try {
      return await this.prisma.inventoryMovement.findMany({
        include: {
          InventoryItem: true,
          FromLocation: true,
          ToLocation: true,
        },
      });
    } catch (error) {
      throw new Error(`Failed to retrieve inventory movements: ${error.message}`);
    }
  }

  // Retrieve a single Inventory Movement by ID
  async findOne(id: number) {
    try {
      const movement = await this.prisma.inventoryMovement.findUnique({
        where: { id },
        include: {
          InventoryItem: true,
          FromLocation: true,
          ToLocation: true,
        },
      });

      if (!movement) {
        throw new Error(`Inventory movement with ID ${id} not found`);
      }

      return movement;
    } catch (error) {
      throw new Error(`Failed to retrieve inventory movement with ID ${id}: ${error.message}`);
    }
  }

  // Update an Inventory Movement by ID
  async update(id: number, updateInventoryMovementDto: UpdateInventoryMovementDto) {
    const data = {
      inventory_item_id: updateInventoryMovementDto.inventory_item_id,
      from_location_id: updateInventoryMovementDto.from_location_id,
      to_location_id: updateInventoryMovementDto.to_location_id,
      quantity: updateInventoryMovementDto.quantity,
      movement_date: updateInventoryMovementDto.movement_date
          ? new Date(updateInventoryMovementDto.movement_date)
          : undefined,
      movement_type: updateInventoryMovementDto.movement_type,
      status: updateInventoryMovementDto.status,
    };

    try {
      return await this.prisma.inventoryMovement.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Failed to update inventory movement with ID ${id}: ${error.message}`);
    }
  }

  // Remove an Inventory Movement by ID
  async remove(id: number) {
    try {
      return await this.prisma.inventoryMovement.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to delete inventory movement with ID ${id}: ${error.message}`);
    }
  }
}

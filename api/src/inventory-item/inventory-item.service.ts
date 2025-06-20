import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ensure PrismaService is set up
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';

@Injectable()
export class InventoryItemService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new Inventory Item
  async create(createInventoryItemDto: CreateInventoryItemDto) {
    const data = {
      item_code: createInventoryItemDto.item_code,
      name: createInventoryItemDto.name,
      description: createInventoryItemDto.description,
      unit_price: createInventoryItemDto.unit_price,
      min_stock_quantity: createInventoryItemDto.min_stock_quantity,
      max_stock_quantity: createInventoryItemDto.max_stock_quantity,
      reorder_stock_quantity: createInventoryItemDto.reorder_stock_quantity,
      safety_stock_level: createInventoryItemDto.safety_stock_level,
      expiry_date: createInventoryItemDto.expiry_date
          ? new Date(createInventoryItemDto.expiry_date)
          : undefined,
      last_stock_date: createInventoryItemDto.last_stock_date
          ? new Date(createInventoryItemDto.last_stock_date)
          : undefined,
      cycle_count_code: createInventoryItemDto.cycle_count_code,
      attributes: createInventoryItemDto.attributes,
      status: createInventoryItemDto.status,
    };

    try {
      return await this.prisma.inventoryItem.create({ data });
    } catch (error) {
      throw new Error(`Failed to create inventory item: ${error.message}`);
    }
  }

  // Retrieve all Inventory Items
  async findAll() {
    try {
      return await this.prisma.inventoryItem.findMany();
    } catch (error) {
      throw new Error(`Failed to retrieve inventory items: ${error.message}`);
    }
  }

  // Retrieve a single Inventory Item by ID
  async findOne(id: number) {
    try {
      const inventoryItem = await this.prisma.inventoryItem.findUnique({
        where: { id },
      });

      if (!inventoryItem) {
        throw new Error(`Inventory item with ID ${id} not found`);
      }

      return inventoryItem;
    } catch (error) {
      throw new Error(`Failed to retrieve inventory item with ID ${id}: ${error.message}`);
    }
  }

  // Update an Inventory Item by ID
  async update(id: number, updateInventoryItemDto: UpdateInventoryItemDto) {
    const data = {
      item_code: updateInventoryItemDto.item_code,
      name: updateInventoryItemDto.name,
      description: updateInventoryItemDto.description,
      unit_price: updateInventoryItemDto.unit_price,
      min_stock_quantity: updateInventoryItemDto.min_stock_quantity,
      max_stock_quantity: updateInventoryItemDto.max_stock_quantity,
      reorder_stock_quantity: updateInventoryItemDto.reorder_stock_quantity,
      safety_stock_level: updateInventoryItemDto.safety_stock_level,
      expiry_date: updateInventoryItemDto.expiry_date
          ? new Date(updateInventoryItemDto.expiry_date)
          : undefined,
      last_stock_date: updateInventoryItemDto.last_stock_date
          ? new Date(updateInventoryItemDto.last_stock_date)
          : undefined,
      cycle_count_code: updateInventoryItemDto.cycle_count_code,
      attributes: updateInventoryItemDto.attributes,
      status: updateInventoryItemDto.status,
    };

    try {
      return await this.prisma.inventoryItem.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Failed to update inventory item with ID ${id}: ${error.message}`);
    }
  }

  // Remove an Inventory Item by ID
  async remove(id: number) {
    try {
      return await this.prisma.inventoryItem.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to delete inventory item with ID ${id}: ${error.message}`);
    }
  }
}

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service'; // Ensure PrismaService is set up
import { CreateStockValuationDto } from './dto/create-stock-valuation.dto';
import { UpdateStockValuationDto } from './dto/update-stock-valuation.dto';

@Injectable()
export class StockValuationService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new Stock Valuation
  async create(createStockValuationDto: CreateStockValuationDto) {
    const data = {
      inventory_item_id: createStockValuationDto.inventory_item_id,
      valuation_method: createStockValuationDto.valuation_method,
      last_valuation_date: new Date(createStockValuationDto.last_valuation_date),
      valuation_amount: createStockValuationDto.valuation_amount,
      status: createStockValuationDto.status,
    };

    try {
      return await this.prisma.stockValuation.create({ data });
    } catch (error) {
      throw new Error(`Failed to create stock valuation: ${error.message}`);
    }
  }

  // Retrieve all Stock Valuations
  async findAll() {
    try {
      return await this.prisma.stockValuation.findMany({include:{InventoryItem: true,}});
    } catch (error) {
      throw new Error(`Failed to retrieve stock valuations: ${error.message}`);
    }
  }

  // Retrieve a single Stock Valuation by ID
  async findOne(id: number) {
    try {
      const stockValuation = await this.prisma.stockValuation.findUnique({where: { id },include:{InventoryItem: true,}});

      if (!stockValuation) {
        throw new Error(`Stock valuation with ID ${id} not found`);
      }

      return stockValuation;
    } catch (error) {
      throw new Error(`Failed to retrieve stock valuation with ID ${id}: ${error.message}`);
    }
  }

  // Update a Stock Valuation by ID
  async update(id: number, updateStockValuationDto: UpdateStockValuationDto) {
    const data = {
      inventory_item_id: updateStockValuationDto.inventory_item_id,
      valuation_method: updateStockValuationDto.valuation_method,
      last_valuation_date: updateStockValuationDto.last_valuation_date
          ? new Date(updateStockValuationDto.last_valuation_date)
          : undefined,
      valuation_amount: updateStockValuationDto.valuation_amount,
      status: updateStockValuationDto.status,
    };

    try {
      return await this.prisma.stockValuation.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Failed to update stock valuation with ID ${id}: ${error.message}`);
    }
  }

  // Remove a Stock Valuation by ID
  async remove(id: number) {
    try {
      return await this.prisma.stockValuation.delete({where: { id },});
    } catch (error) {
      throw new Error(`Failed to delete stock valuation with ID ${id}: ${error.message}`);
    }
  }
}

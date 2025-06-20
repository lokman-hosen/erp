import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service'; // Ensure PrismaService is set up
import { CreateStockLocationDto } from './dto/create-stock-location.dto';
import { UpdateStockLocationDto } from './dto/update-stock-location.dto';

@Injectable()
export class StockLocationService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new Stock Location
  async create(createStockLocationDto: CreateStockLocationDto) {
    const data = {
      name: createStockLocationDto.name,
      type: createStockLocationDto.type,
      status: createStockLocationDto.status,
    };

    try {
      return await this.prisma.stockLocation.create({ data });
    } catch (error) {
      throw new Error(`Failed to create stock location: ${error.message}`);
    }
  }

  // Retrieve all Stock Locations
  async findAll() {
    try {
      return await this.prisma.stockLocation.findMany();
    } catch (error) {
      throw new Error(`Failed to retrieve stock locations: ${error.message}`);
    }
  }

  // Retrieve a single Stock Location by ID
  async findOne(id: number) {
    try {
      const stockLocation = await this.prisma.stockLocation.findUnique({
        where: { id },
      });

      if (!stockLocation) {
        throw new Error(`Stock location with ID ${id} not found`);
      }

      return stockLocation;
    } catch (error) {
      throw new Error(`Failed to retrieve stock location with ID ${id}: ${error.message}`);
    }
  }

  // Update a Stock Location by ID
  async update(id: number, updateStockLocationDto: UpdateStockLocationDto) {
    const data = {
      name: updateStockLocationDto.name,
      type: updateStockLocationDto.type,
      status: updateStockLocationDto.status,
    };

    try {
      return await this.prisma.stockLocation.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Failed to update stock location with ID ${id}: ${error.message}`);
    }
  }

  // Remove a Stock Location by ID
  async remove(id: number) {
    try {
      return await this.prisma.stockLocation.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to delete stock location with ID ${id}: ${error.message}`);
    }
  }
}

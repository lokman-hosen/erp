import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto) {
    try {
      return await this.prisma.supplier.create({
        data:createSupplierDto
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Failed to create supplier: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.supplier.findMany(); // Fetch all suppliers
    } catch (error) {
      throw new Error(`Failed to retrieve suppliers: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const supplier = await this.prisma.supplier.findUnique({
        where: { id },
      });
      if (!supplier) {
        throw new Error(`Supplier with ID ${id} not found.`);
      }
      return supplier;
    } catch (error) {
      throw new Error(`Failed to retrieve supplier: ${error.message}`);
    }
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    try {
      return await this.prisma.supplier.update({
        where: { id },
        data: updateSupplierDto, // Update fields dynamically based on DTO
      });
    } catch (error) {
      throw new Error(`Failed to update supplier: ${error.message}`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}

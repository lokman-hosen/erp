import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service'; // Ensure PrismaService is set up
import { CreateDisposalDto } from './dto/create-disposal.dto';
import { UpdateDisposalDto } from './dto/update-disposal.dto';

@Injectable()
export class DisposalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDisposalDto: CreateDisposalDto) {
    try {
      const { inventory_item_id, disposal_date, reason, approval_status, disposal_code, status } = createDisposalDto;
      return await this.prisma.disposal.create({
        data: {
          inventory_item_id,
          disposal_date,
          reason,
          approval_status,
          disposal_code,
          status,
        },
      });
    } catch (error) {
      throw new Error(`Error creating disposal: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.disposal.findMany({
        include: {InventoryItem : true,}
      });
    } catch (error) {
      throw new Error(`Error fetching disposals: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const disposal = await this.prisma.disposal.findUnique({
        where: { id },
      });
      if (!disposal) {
        throw new Error(`Disposal with ID ${id} not found`);
      }
      return disposal;
    } catch (error) {
      throw new Error(`Error fetching disposal with ID ${id}: ${error.message}`);
    }
  }

  async update(id: number, updateDisposalDto: UpdateDisposalDto) {
    try {
      return await this.prisma.disposal.update({
        where: { id },
        data: updateDisposalDto,
      });
    } catch (error) {
      throw new Error(`Error updating disposal with ID ${id}: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.disposal.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Error deleting disposal with ID ${id}: ${error.message}`);
    }
  }
}

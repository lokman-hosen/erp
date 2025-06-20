import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ensure PrismaService is set up
import { CreateGoodsReturnDto } from './dto/create-goods-return.dto';
import { UpdateGoodsReturnDto } from './dto/update-goods-return.dto';

@Injectable()
export class GoodsReturnService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new Goods Return
  async create(createGoodsReturnDto: CreateGoodsReturnDto) {
    const data = {
      good_receipt_id: createGoodsReturnDto.good_receipt_id,
      return_date: new Date(createGoodsReturnDto.return_date),
      reason: createGoodsReturnDto.reason,
      supplier_id: createGoodsReturnDto.supplier_id,
      status: createGoodsReturnDto.status,
    };

    try {
      return await this.prisma.goodsReturn.create({ data });
    } catch (error) {
      throw new Error(`Failed to create goods return: ${error.message}`);
    }
  }

  // Retrieve all Goods Returns
  async findAll() {
    try {
      return await this.prisma.goodsReturn.findMany({
        include: {
          GoodReceipt: true, // Include related GoodReceipt data
        },
      });
    } catch (error) {
      throw new Error(`Failed to retrieve goods returns: ${error.message}`);
    }
  }

  // Retrieve a single Goods Return by ID
  async findOne(id: number) {
    try {
      const goodsReturn = await this.prisma.goodsReturn.findUnique({
        where: { id },
        include: {
          GoodReceipt: true, // Include related GoodReceipt data
        },
      });

      if (!goodsReturn) {
        throw new Error(`Goods return with ID ${id} not found`);
      }

      return goodsReturn;
    } catch (error) {
      throw new Error(`Failed to retrieve goods return with ID ${id}: ${error.message}`);
    }
  }

  // Update a Goods Return by ID
  async update(id: number, updateGoodsReturnDto: UpdateGoodsReturnDto) {
    const data: Partial<{
      good_receipt_id: number;
      return_date: Date;
      reason: string;
      supplier_id: number;
      status: string;
    }> = {
      good_receipt_id: updateGoodsReturnDto.good_receipt_id,
      return_date: updateGoodsReturnDto.return_date
        ? new Date(updateGoodsReturnDto.return_date)
        : undefined,
      reason: updateGoodsReturnDto.reason,
      supplier_id: updateGoodsReturnDto.supplier_id,
      status: updateGoodsReturnDto.status,
    };

    try {
      return await this.prisma.goodsReturn.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Failed to update goods return with ID ${id}: ${error.message}`);
    }
  }

  // Remove a Goods Return by ID
  async remove(id: number) {
    try {
      return await this.prisma.goodsReturn.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to delete goods return with ID ${id}: ${error.message}`);
    }
  }
}

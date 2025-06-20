import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service'; // Ensure PrismaService is set up
import { CreateGoodReceiptDto } from './dto/create-good-receipt.dto';
import { UpdateGoodReceiptDto } from './dto/update-good-receipt.dto';
import { ReceiptStatus } from '@prisma/client'; // Import the enum from Prisma client


@Injectable()
export class GoodReceiptService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new Good Receipt
  async create(createGoodReceiptDto: CreateGoodReceiptDto) {
    const data = {
      grn_number: createGoodReceiptDto.grn_number,
      purchase_order_id: createGoodReceiptDto.purchase_order_id,
      receipt_date: new Date(createGoodReceiptDto.receipt_date),
      status: createGoodReceiptDto.status, // Enum value is directly passed
      created_by: createGoodReceiptDto.created_by,
      remarks: createGoodReceiptDto.remarks,
      return_status: createGoodReceiptDto.return_status,
    };

    try {
      return await this.prisma.goodReceipt.create({ data });
    } catch (error) {
      throw new Error(`Failed to create good receipt: ${error.message}`);
    }
  }


  // Retrieve all Good Receipts
  async findAll() {
    try {
      return await this.prisma.goodReceipt.findMany({
        include: {
          InspectionReport: true, // Include related Inspection Reports
          GoodsReturn: true, // Include related Goods Returns
        },
      });
    } catch (error) {
      throw new Error(`Failed to retrieve good receipts: ${error.message}`);
    }
  }

  // Retrieve a single Good Receipt by ID
  async findOne(id: number) {
    try {
      const goodReceipt = await this.prisma.goodReceipt.findUnique({
        where: { id },
        include: {
          InspectionReport: true, // Include related Inspection Reports
          GoodsReturn: true, // Include related Goods Returns
        },
      });

      if (!goodReceipt) {
        throw new Error(`Good receipt with ID ${id} not found`);
      }

      return goodReceipt;
    } catch (error) {
      throw new Error(`Failed to retrieve good receipt with ID ${id}: ${error.message}`);
    }
  }

  // Update a Good Receipt by ID
  async update(id: number, updateGoodReceiptDto: UpdateGoodReceiptDto) {
    const data: Partial<{
      grn_number: string;
      purchase_order_id: number;
      receipt_date: Date;
      status: ReceiptStatus; // Enum type
      created_by: number;
      remarks: string | null;
      return_status: boolean;
    }> = {
      grn_number: updateGoodReceiptDto.grn_number,
      purchase_order_id: updateGoodReceiptDto.purchase_order_id,
      receipt_date: updateGoodReceiptDto.receipt_date
        ? new Date(updateGoodReceiptDto.receipt_date)
        : undefined,
      status: updateGoodReceiptDto.status, // Enum value
      created_by: updateGoodReceiptDto.created_by,
      remarks: updateGoodReceiptDto.remarks,
      return_status: updateGoodReceiptDto.return_status,
    };

    try {
      return await this.prisma.goodReceipt.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Failed to update good receipt with ID ${id}: ${error.message}`);
    }
  }


  // Remove a Good Receipt by ID
  async remove(id: number) {
    try {
      return await this.prisma.goodReceipt.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to delete good receipt with ID ${id}: ${error.message}`);
    }
  }
}

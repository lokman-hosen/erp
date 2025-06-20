import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service'; // Ensure PrismaService is properly set up
import { CreateInspectionCommitteeDto } from './dto/create-inspection-committee.dto';
import { UpdateInspectionCommitteeDto } from './dto/update-inspection-committee.dto';

@Injectable()
export class InspectionCommitteeService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new Inspection Committee
  async create(createInspectionCommitteeDto: CreateInspectionCommitteeDto) {
    const data = {
      name: createInspectionCommitteeDto.name,
      created_by: createInspectionCommitteeDto.created_by,
      valid_until: new Date(createInspectionCommitteeDto.valid_until),
      status: createInspectionCommitteeDto.status,
    };

    try {
      return await this.prisma.inspectionCommittee.create({ data });
    } catch (error) {
      throw new Error(`Failed to create inspection committee: ${error.message}`);
    }
  }

  // Retrieve all Inspection Committees
  async findAll() {
    try {
      return await this.prisma.inspectionCommittee.findMany();
    } catch (error) {
      throw new Error(`Failed to retrieve inspection committees: ${error.message}`);
    }
  }

  // Retrieve a single Inspection Committee by ID
  async findOne(id: number) {
    try {
      const committee = await this.prisma.inspectionCommittee.findUnique({
        where: { id },
      });

      if (!committee) {
        throw new Error(`Inspection committee with ID ${id} not found`);
      }

      return committee;
    } catch (error) {
      throw new Error(`Failed to retrieve inspection committee with ID ${id}: ${error.message}`);
    }
  }

  // Update an Inspection Committee by ID
  async update(id: number, updateInspectionCommitteeDto: UpdateInspectionCommitteeDto) {
    const data = {
      name: updateInspectionCommitteeDto.name,
      created_by: updateInspectionCommitteeDto.created_by,
      valid_until: updateInspectionCommitteeDto.valid_until
        ? new Date(updateInspectionCommitteeDto.valid_until)
        : undefined,
      status: updateInspectionCommitteeDto.status,
    };

    try {
      return await this.prisma.inspectionCommittee.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Failed to update inspection committee with ID ${id}: ${error.message}`);
    }
  }

  // Remove an Inspection Committee by ID
  async remove(id: number) {
    try {
      return await this.prisma.inspectionCommittee.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to delete inspection committee with ID ${id}: ${error.message}`);
    }
  }
}

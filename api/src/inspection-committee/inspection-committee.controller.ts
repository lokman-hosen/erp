import { Body, Controller, Delete,Get, Param, Patch, Post } from '@nestjs/common';

import { CreateInspectionCommitteeDto } from './dto/create-inspection-committee.dto';
import { UpdateInspectionCommitteeDto } from './dto/update-inspection-committee.dto';
import { InspectionCommitteeService } from './inspection-committee.service';

@Controller('inspection-committee')
export class InspectionCommitteeController {
  constructor(private readonly inspectionCommitteeService: InspectionCommitteeService) {}

  @Post()
  create(@Body() createInspectionCommitteeDto: CreateInspectionCommitteeDto) {
    return this.inspectionCommitteeService.create(createInspectionCommitteeDto);
  }

  @Get()
  findAll() {
    return this.inspectionCommitteeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inspectionCommitteeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInspectionCommitteeDto: UpdateInspectionCommitteeDto) {
    return this.inspectionCommitteeService.update(+id, updateInspectionCommitteeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inspectionCommitteeService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctortimeslotService } from './doctortimeslot.service';
import { CreateDoctortimeslotDto } from './dto/create-doctortimeslot.dto';
import { UpdateDoctortimeslotDto } from './dto/update-doctortimeslot.dto';

@Controller('doctortimeslot')
export class DoctortimeslotController {
  constructor(private readonly doctortimeslotService: DoctortimeslotService) {}

  @Post()
  create(@Body() createDoctortimeslotDto: CreateDoctortimeslotDto) {
    return this.doctortimeslotService.create(createDoctortimeslotDto);
  }

  @Get()
  findAll() {
    return this.doctortimeslotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctortimeslotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctortimeslotDto: UpdateDoctortimeslotDto) {
    return this.doctortimeslotService.update(+id, updateDoctortimeslotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctortimeslotService.remove(+id);
  }
}

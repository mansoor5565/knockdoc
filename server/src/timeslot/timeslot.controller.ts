import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { TimeslotService } from './timeslot.service';
import { CreateTimeslotDto } from './dto/create-timeslot.dto';
import { UpdateTimeslotDto } from './dto/update-timeslot.dto';

@Controller('timeslot')
export class TimeslotController {
  constructor(private readonly timeslotService: TimeslotService) { }
  @Get('/create-time-slot')
  async createTimeSlots(): Promise<any> {
    const selectedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const startTimes = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00'];
    const log:any[]=[];
    try {
      for (const day of selectedDays) {
        for (const time of startTimes) {
          try {
            const createdTimeslot = await this.timeslotService.createSlot(day, time);
            log.push({ day, time, status: 'Created', details: createdTimeslot });
          } catch (error) {
            log.push({ day, time, status: 'Failed', error: error.message });
          }
        }
      }
      return log;
    } catch (error) {
      console.error("Error creating time slots:", error);
      throw new InternalServerErrorException('Failed to create time slots');
    }
  }
  @Post()
  create(@Body() createTimeslotDto: CreateTimeslotDto) {
    return this.timeslotService.create(createTimeslotDto);
  }

  @Get()
  findAll() {
    return this.timeslotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeslotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeslotDto: UpdateTimeslotDto) {
    return this.timeslotService.update(+id, updateTimeslotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeslotService.remove(+id);
  }

}

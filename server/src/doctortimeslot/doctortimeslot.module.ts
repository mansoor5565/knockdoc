import { Module } from '@nestjs/common';
import { DoctortimeslotService } from './doctortimeslot.service';
import { DoctortimeslotController } from './doctortimeslot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorTimeSlot } from './entities/doctortimeslot.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DoctorTimeSlot]),DoctortimeslotModule],
  controllers: [DoctortimeslotController],
  providers: [DoctortimeslotService],
  exports:[DoctortimeslotService],
})
export class DoctortimeslotModule {}

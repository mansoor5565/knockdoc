import { Module } from '@nestjs/common';
import { TimeslotService } from './timeslot.service';
import { TimeslotController } from './timeslot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timeslot } from './entities/timeslot.entity';
import { Doctor } from 'src/doctor/doctor.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Timeslot])],
    controllers: [TimeslotController],
    providers: [TimeslotService],
    exports:[TimeslotService]
})
export class TimeslotModule {}

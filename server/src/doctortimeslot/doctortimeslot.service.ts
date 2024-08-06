import { Injectable } from '@nestjs/common';
import { CreateDoctortimeslotDto } from './dto/create-doctortimeslot.dto';
import { UpdateDoctortimeslotDto } from './dto/update-doctortimeslot.dto';
import { DoctorTimeSlot } from './entities/doctortimeslot.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DoctortimeslotService {
  constructor(
    @InjectRepository(DoctorTimeSlot)
    private readonly doctorTimeSlotRepository:Repository<DoctorTimeSlot>
  )
  {}
  async create(createDoctortimeslotDto: CreateDoctortimeslotDto):Promise<DoctorTimeSlot>{
    const doctorTimeSlot = new DoctorTimeSlot();
    doctorTimeSlot.doctor = { id: createDoctortimeslotDto.doctorId } as any;
    doctorTimeSlot.timeslot = { id: createDoctortimeslotDto.timeslotId } as any;
    return await this.doctorTimeSlotRepository.save(doctorTimeSlot);
  }

  findAll() {
    return `This action returns all doctortimeslot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctortimeslot`;
  }

  update(id: number, updateDoctortimeslotDto: UpdateDoctortimeslotDto) {
    return `This action updates a #${id} doctortimeslot`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctortimeslot`;
  }
}

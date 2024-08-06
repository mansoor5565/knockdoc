import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/doctor/doctor.entity';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository:Repository<Doctor>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository:Repository<Appointment>,
  ){}
  create(createAppointmentDto: CreateAppointmentDto) {
    
    return 'This action adds a new appointment';
  }

  findAll() {
    return `This action returns all appointments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
  async getNext30Days():Promise<any>{
    const dates = [];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
  
      const dayOfWeek = daysOfWeek[date.getDay()];
      const formattedDate = date.toISOString().split('T')[0];
  
      dates.push({ date: formattedDate, day: dayOfWeek });
    }
  
    return dates;
  }
}

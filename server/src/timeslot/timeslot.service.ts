import { Injectable } from '@nestjs/common';
import { CreateTimeslotDto } from './dto/create-timeslot.dto';
import { UpdateTimeslotDto } from './dto/update-timeslot.dto';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Timeslot } from './entities/timeslot.entity';
import { InternalServerErrorException, ConflictException } from '@nestjs/common';
@Injectable()
export class TimeslotService {
  constructor(
    @InjectRepository(Timeslot)
    private readonly timeslotRespository: Repository<Timeslot>,
  )
  {}
  create(createTimeslotDto: CreateTimeslotDto) {
    return 'This action adds a new timeslot';
  }

  findAll() {
    return `This action returns all timeslot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timeslot`;
  }

  update(id: number, updateTimeslotDto: UpdateTimeslotDto) {
    return `This action updates a #${id} timeslot`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeslot`;
  }
  async createSlot(day:string,time:string){
    const existingTimeSlot= await this.timeslotRespository.findOne({
      where:{
        startTime:time,
        dayOfWeek:day,
      }
    });
    if (existingTimeSlot) {
      throw new ConflictException('A timeslot with this start time already exists');
    }
    const timeslot: Timeslot= new Timeslot();
    timeslot.dayOfWeek=day;
    timeslot.startTime=time;
    try{
      let resp= await this.timeslotRespository.save(timeslot);
      return resp;
    }
    catch(error){
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }
}

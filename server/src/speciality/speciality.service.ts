import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationError,
} from "@nestjs/common";
import { CreateSpecialityDto } from "./dto/create-speciality.dto";
import { Speciality } from "./speciality.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { emitWarning } from "process";
import { PaginationDto } from "./dto/pagination.dto";
import { Doctor } from "src/doctor/doctor.entity";

@Injectable()
export class SpecialityService {
  constructor(
    @InjectRepository(Speciality)
    private readonly specialityRepository: Repository<Speciality>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>
  ) {}


  async createSpeciality(
    createSpecialityDto: CreateSpecialityDto
  ): Promise<Speciality> {
    const speciality: Speciality = new Speciality();

    speciality.name = createSpecialityDto.name;

    try {
      const resp = await this.specialityRepository.save(speciality);
      delete resp["user"];
      return resp;
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }

  async getAllSpeciality(): Promise<{}> {
    const data = await this.specialityRepository.find();
    return data;
  }


  async deleteSpeciality(id): Promise<any> {
    try {
      const data = await this.specialityRepository.delete({
        id,
      });
      return data;
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }
}

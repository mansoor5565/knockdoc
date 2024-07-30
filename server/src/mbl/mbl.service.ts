import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationError,
} from "@nestjs/common";
import { CreateMblDto } from "./dto/create-mbl.dto";
import { Mbl } from "./mbl.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { emitWarning } from "process";
import { PaginationDto } from "./dto/pagination.dto";
import { Doctor } from "src/doctor/doctor.entity";

@Injectable()
export class MblService {
  constructor(
    @InjectRepository(Mbl)
    private readonly mblRepository: Repository<Mbl>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>
  ) {}


  async createMbl(
    createMblDto: CreateMblDto,
    userId: string
  ): Promise<Mbl> {
    const mbl: Mbl = new Mbl();

    mbl.country = createMblDto.country;
    mbl.state = createMblDto.stateLisence;
    mbl.number = createMblDto.lisenceNumber;
    mbl.npiNumber = createMblDto.npiNumber;
   // mbl.date = createMblDto.date;
    mbl.certificateImage = createMblDto.certificateImage;
  
    const doctor = await this.doctorRepository.findOneBy({ id: userId });
    mbl.doctor = doctor;

    try {
      const resp = await this.mblRepository.save(mbl);
      delete resp["user"];
      return resp;
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }

  async getAllMbl(userId: any): Promise<{}> {
    const doctor = await this.doctorRepository.findOneBy({ id: userId });

    if (!doctor) {
      throw new InternalServerErrorException();
    }

    const data = await this.mblRepository.find({
      where: {
        doctor: {id: userId}, // Assuming the relation is named "doctor" in the Mbl entity
      },
      //relations: ["doctor"],
    });
    return data;
  }


  async deleteMbl(id): Promise<any> {
    try {
      const data = await this.mblRepository.delete({
        id,
      });
      return data;
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }
}

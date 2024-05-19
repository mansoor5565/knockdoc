import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationError,
} from "@nestjs/common";
import { CreateAwardDto } from "./dto/create-award.dto";
import { Award } from "./award.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { emitWarning } from "process";
import { PaginationDto } from "./dto/pagination.dto";
import { Doctor } from "src/doctor/doctor.entity";

@Injectable()
export class AwardService {
  constructor(
    @InjectRepository(Award)
    private readonly awardRepository: Repository<Award>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>
  ) {}


  async createAward(
    createAwardDto: CreateAwardDto,
    userId: string
  ): Promise<Award> {
    const award: Award = new Award();

    award.awardName = createAwardDto.awardName;
    award.year = createAwardDto.year;
    award.attachment = createAwardDto.attachment;
    const doctor = await this.doctorRepository.findOneBy({ id: userId });
    award.doctor = doctor;

    try {
      const resp = await this.awardRepository.save(award);
      delete resp["user"];
      return resp;
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }

  async getAllAward(userId: any): Promise<{}> {
    const doctor = await this.doctorRepository.findOneBy({ id: userId });

    if (!doctor) {
      throw new InternalServerErrorException();
    }

    const data = await this.awardRepository.find({
      where: {
        doctor: {id: userId}, // Assuming the relation is named "doctor" in the Award entity
      },
      //relations: ["doctor"],
    });
    return data;
  }


  async deleteAward(id): Promise<any> {
    try {
      const data = await this.awardRepository.delete({
        id,
      });
      return data;
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }
}

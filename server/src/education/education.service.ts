import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationError,
} from "@nestjs/common";
import { CreateEducationDto } from "./dto/create-education.dto";
import { Education } from "./education.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { emitWarning } from "process";
import { PaginationDto } from "./dto/pagination.dto";
import { Doctor } from "src/doctor/doctor.entity";

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>
  ) {}


  async createEducation(
    createEducationDto: CreateEducationDto,
    userId: string
  ): Promise<Education> {
    const education: Education = new Education();

    education.schoolName = createEducationDto.medicalSchool;
    education.educated = createEducationDto.educated;
    education.degree = createEducationDto.degree;
    education.year = createEducationDto.year;
    education.educated = createEducationDto.educated;

    const doctor = await this.doctorRepository.findOneBy({ id: userId });
    education.doctor = doctor;

    try {
      const resp = await this.educationRepository.save(education);
      delete resp["user"];
      return resp;
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }

  async getAllEducation(userId: any): Promise<{}> {
    const doctor = await this.doctorRepository.findOneBy({ id: userId });

    if (!doctor) {
      throw new InternalServerErrorException();
    }

    const data = await this.educationRepository.find({
      where: {
        doctor: {id: userId}, // Assuming the relation is named "doctor" in the Education entity
      },
      //relations: ["doctor"],
    });
    return data;
  }


  async deleteEducation(id): Promise<any> {
    try {
      const data = await this.educationRepository.delete({
        id,
      });
      return data;
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }
}

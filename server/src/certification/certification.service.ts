import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationError,
} from "@nestjs/common";
import { CreateCertificationDto } from "./dto/create-certification.dto";
import { Certification } from "./certification.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { emitWarning } from "process";
import { PaginationDto } from "./dto/pagination.dto";
import { Doctor } from "src/doctor/doctor.entity";

@Injectable()
export class CertificationService {
  constructor(
    @InjectRepository(Certification)
    private readonly certificationRepository: Repository<Certification>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>
  ) {}


  async createCertification(
    createCertificationDto: CreateCertificationDto,
    userId: string
  ): Promise<Certification> {
    const certification: Certification = new Certification();

    certification.certificateName = createCertificationDto.certificateName;
    certification.year = createCertificationDto.year;
    certification.attachment = createCertificationDto.attachment;
    const doctor = await this.doctorRepository.findOneBy({ id: userId });
    certification.doctor = doctor;

    try {
      const resp = await this.certificationRepository.save(certification);
      delete resp["user"];
      return resp;
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }

  async getAllCertification(userId: any): Promise<{}> {
    const doctor = await this.doctorRepository.findOneBy({ id: userId });

    if (!doctor) {
      throw new InternalServerErrorException();
    }

    const data = await this.certificationRepository.find({
      where: {
        doctor: {id: userId}, // Assuming the relation is named "doctor" in the Certification entity
      },
      //relations: ["doctor"],
    });
    return data;
  }


  async deleteCertification(id): Promise<any> {
    try {
      const data = await this.certificationRepository.delete({
        id,
      });
      return data;
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationError,
} from "@nestjs/common";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { Language } from "./language.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { emitWarning } from "process";
import { PaginationDto } from "./dto/pagination.dto";
import { Doctor } from "src/doctor/doctor.entity";

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>
  ) {}


  async createLanguage(
    createLanguageDto: CreateLanguageDto
  ): Promise<Language> {
    const language: Language = new Language();

    language.name = createLanguageDto.name;

    try {
      const resp = await this.languageRepository.save(language);
      delete resp["user"];
      return resp;
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }

  async getAllLanguage(): Promise<{}> {
    const data = await this.languageRepository.find();
    return data;
  }


  async deleteLanguage(id): Promise<any> {
    try {
      const data = await this.languageRepository.delete({
        id,
      });
      return data;
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }
}

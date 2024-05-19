import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationError,
} from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { Doctor } from "./doctor.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import * as bcrypt from "bcrypt";
import { LoginDoctorDto } from "./dto/login-doctor.dto";
import { JwtService } from "@nestjs/jwt";
import { emitWarning } from "process";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { Language } from "src/language/language.entity";
import { Certificate } from "crypto";

import * as crypto from "crypto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { UpdateVerifiedPasswordDto } from "./dto/update-verified-password.dto";
import { UpdateprofilePasswordDto } from "./dto/update-profile-password.dto";

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    // @InjectRepository(Language)
    // private readonly languageRepository: Repository<Language>,
    private jwtService: JwtService
  ) {}

  async generateRandomNumber(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      crypto.randomBytes(2, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          const randomNumber = parseInt(buffer.toString("hex"), 16);
          resolve((randomNumber % 90000) + 10000); // Ensures it's a 5-digit number
        }
      });
    });
  }

  async forgetPassword(id: string): Promise<Boolean> {
    const doctor = await this.doctorRepository.findOneBy({ id });
    try {
      if (doctor) {
        const verificationCode = (await this.generateRandomNumber()).toString();

        doctor.verificationCode = verificationCode;

        await this.doctorRepository.save(doctor);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }

  async updateVerifiedPassword(
    id: string,
    updateVerifiedPasswordDto: UpdateVerifiedPasswordDto
  ): Promise<Boolean> {
    const doctor = await this.doctorRepository.findOneBy({
      id,
      verificationCode: updateVerifiedPasswordDto.verificationCode,
    });
    try {
      if (doctor) {
        doctor.password = updateVerifiedPasswordDto.password;

        doctor.verificationCode = null;
        await this.doctorRepository.save(doctor);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }

  async verifyPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto
  ): Promise<Boolean> {
    const doctor = await this.doctorRepository.findOneBy({
      id,
      verificationCode: updatePasswordDto.verificationCode,
    });

    try {
      if (doctor) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }

  async updateProfilePassword(
    id: string,
    updateprofilePasswordDto: UpdateprofilePasswordDto
  ): Promise<Boolean> {
    const doctor = await this.doctorRepository.findOneBy({
      id,
    });

    try {
      if (doctor) {
        doctor.password = updateprofilePasswordDto.password;
        await this.doctorRepository.save(doctor);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }

  async updateDoctor(
    updateDoctorDto: UpdateDoctorDto,
    userId: any
  ): Promise<{ accessToken: string }> {
    const doctor = await this.doctorRepository.findOneBy({ id: userId });

    doctor.firstName = updateDoctorDto.firstName;
    doctor.middleName = updateDoctorDto.middleName;
    doctor.lastName = updateDoctorDto.lastName;
    doctor.phoneNumber = updateDoctorDto.phoneNumber;
    doctor.insuranceIdAttachment = updateDoctorDto.insuranceIdAttachment;
    doctor.drivingLicenseAttachment = updateDoctorDto.drivingLicenseAttachment;
    doctor.age = updateDoctorDto.age;
    doctor.basicEducation = updateDoctorDto.basicEducation;
    doctor.suffix = updateDoctorDto.suffix;
    doctor.boardCertified = updateDoctorDto.boardCertified;
    doctor.hospitalAffiliate = updateDoctorDto.hospitalAffiliate;
    doctor.hospitalName = updateDoctorDto.hospitalName;
    doctor.facultyAppoinment = updateDoctorDto.facultyAppoinment;
    doctor.facultyAppoinmentTitle = updateDoctorDto.facultyAppoinmentTitle;
    //doctor.acceptedInsurancePlans = updateDoctorDto.acceptedInsurancePlans
    doctor.providerOfficeLocation = updateDoctorDto.providerOfficeLocation;
    doctor.providerCity = updateDoctorDto.providerCity;
    doctor.providerStreet = updateDoctorDto.providerStreet;
    doctor.providerZip = updateDoctorDto.providerZip;
    doctor.providerState = updateDoctorDto.providerState;
    doctor.providerSuite = updateDoctorDto.providerSuite;
    doctor.officeDays = updateDoctorDto.officeDays;
    doctor.officeHours = updateDoctorDto.officeHours;
    doctor.website = updateDoctorDto.website;
    // doctor.languages = await this.languageRepository.findByIds(
    //   updateDoctorDto.languages
    // );

    try {
      let resp = await this.doctorRepository.save(doctor);

      if (resp) {
        const doctorData = {
          id: resp.id,
          firstName: resp.firstName,
          lastName: resp.lastName,
          email: resp.email,
          middleName: resp.middleName,
          image: resp.image,
        };
        return {
          accessToken: this.jwtService.sign(doctorData),
        };
      }
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }

  async createDoctor(
    createDoctorDto: CreateDoctorDto
  ): Promise<{ accessToken: string }> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createDoctorDto.password, salt);
    const doctor: Doctor = new Doctor();
    doctor.firstName = createDoctorDto.firstName;
    doctor.lastName = createDoctorDto.lastName;
    doctor.email = createDoctorDto.email;
    doctor.middleName = createDoctorDto.middleName;
    doctor.password = hashedPassword;
    doctor.image = createDoctorDto.image;

    const isEmailExist = await this.doctorRepository.findOne({
      where: { email: doctor.email },
    });
    if (isEmailExist) {
      throw new BadRequestException(
        "The email is already taken. Please choose another one"
      );
    }
    try {
      let resp = await this.doctorRepository.save(doctor);

      if (resp) {
        const doctorData = {
          id: resp.id,
          firstName: resp.firstName,
          lastName: resp.lastName,
          email: resp.email,
          middleName: resp.middleName,
          image: resp.image,
        };
        return {
          accessToken: this.jwtService.sign(doctorData),
        };
      }
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }

  async signIn(
    loginDoctorDto: LoginDoctorDto
  ): Promise<{ accessToken: string }> {
    const { email, password } = loginDoctorDto;
    const doctor = await this.doctorRepository.findOne({
      where: { email: email },
    });

    if (doctor && (await bcrypt.compare(password, doctor.password))) {
      const doctorData = {
        id: doctor.id, //So we can get it from Jwt token
        image: doctor.image,
        firstName: doctor.firstName,
        middleName: doctor.middleName,
        lastName: doctor.lastName,
        email: doctor.email,
      };
      return {
        accessToken: this.jwtService.sign(doctorData),
      };
    } else {
      throw new BadRequestException("Please check your login credentials");
    }
  }

  async list() {
    const data = await this.doctorRepository.find({
      relations: ["awards", "certifications", "educations", "mbls"],
    });

    return data;
  }
}

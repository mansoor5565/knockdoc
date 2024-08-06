
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationError,
} from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { Doctor } from "./doctor.entity";
import { Inject } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import * as bcrypt from "bcrypt";
import { LoginDoctorDto } from "./dto/login-doctor.dto";
import { JwtService } from "@nestjs/jwt";

import * as crypto from "crypto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { UpdateVerifiedPasswordDto } from "./dto/update-verified-password.dto";
import { UpdateprofilePasswordDto } from "./dto/update-profile-password.dto";
import { CreateDoctorDto2 } from "./dto/create-doctor2.dto";
import { CreateDoctorDto3 } from "./dto/create-doctor3.dto";
import { CreateDoctorDto4 } from "./dto/create-doctor4.dto";
import { Certification } from "src/certification/certification.entity";
import { Education } from "src/education/education.entity";
import { Mbl } from "src/mbl/mbl.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DoctortimeslotService } from '../doctortimeslot/doctortimeslot.service';
import { DoctorTimeSlot } from './../doctortimeslot/entities/doctortimeslot.entity';
import { Timeslot } from "src/timeslot/entities/timeslot.entity";
import { TimeslotService } from "src/timeslot/timeslot.service";
@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Mbl)
    private readonly mblRepository: Repository<Mbl>,
    @InjectRepository(Certification)
    private readonly certificationRepository: Repository<Certification>,
    @InjectRepository(Timeslot)
    private readonly timeslotRespository: Repository<Timeslot>,
    private readonly timeslotService:TimeslotService,
    private jwtService: JwtService
  ) { }

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




  async createDoctor2(
    createDoctorDto2: CreateDoctorDto2, id: string
  ): Promise<boolean> {

    const doctor = await this.doctorRepository.findOneBy({ id });
    console.log(doctor);
    doctor.npiNumber = createDoctorDto2.npiNumber;
    doctor.drivingLicense = createDoctorDto2.drivingLicense;
    doctor.age = createDoctorDto2.age;
    doctor.basicEducation = createDoctorDto2.education;
    doctor.suffix = createDoctorDto2.suffix;
    doctor.boardCertified = createDoctorDto2.boardCertified;
    doctor.hospitalAffiliate = createDoctorDto2.hospitalAffiliate;
    doctor.hospitalName = createDoctorDto2.hospitalName;
    try {

      if (doctor) {
        doctor.verificationCode = null;
        await this.doctorRepository.save(doctor);
        return true;
      } else {
        throw new BadRequestException("Sorry, we are not able to update this record");
      }

    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException(error);
    }
  }


  async createDoctor3(
    createDoctorDto3: CreateDoctorDto3, id: string
  ): Promise<boolean> {

    const doctor = await this.doctorRepository.findOneBy({ id });

    doctor.facultyAppoinment = createDoctorDto3.facultyAppoinment;
    doctor.title = createDoctorDto3.title;
    doctor.insurancePlan = createDoctorDto3.insurancePlan;
    doctor.providerOfficeLocation = createDoctorDto3.officeLocation;
    doctor.providerCity = createDoctorDto3.city;
    doctor.providerStreet = createDoctorDto3.street;
    doctor.providerZip = createDoctorDto3.zipCode;
    doctor.providerState = createDoctorDto3.state;
    doctor.officeDays = createDoctorDto3.officeDays;
    doctor.officeHours = createDoctorDto3.officeHours;
    doctor.website = createDoctorDto3.website;

    
    try {
      if (doctor) {
        doctor.verificationCode = null;
        await this.doctorRepository.save(doctor);
        return true;
      } else {
        throw new BadRequestException("Sorry, we are not able to update this record");
      }

    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException(error);
    }
  }

  async createDoctor4(
    createDoctorDto4: CreateDoctorDto4, id: string
  ): Promise<boolean> {

    console.log("createDoctorDto4", createDoctorDto4);

    const doctor = await this.doctorRepository.findOneBy({ id });


    if (createDoctorDto4.certifications) {

      await this.certificationRepository.delete({ doctor });
      createDoctorDto4.certifications.forEach(arr => {
        const certification: Certification = new Certification();
        certification.certificateName = arr.certificateName;
        certification.year = arr.year;
        certification.attachment = arr.attachment;
        certification.doctor = doctor;
        this.certificationRepository.save(certification);
      })

    }


    await this.educationRepository.delete({ doctor });
    createDoctorDto4.education.forEach(arr => {
      const education: Education = new Education();
      education.schoolName = arr.schoolName;
      education.educated = arr.educated;
      education.degree = arr.degree;
      education.year = arr.year;
      education.doctor = doctor;
      this.educationRepository.save(education);
    })


    await this.mblRepository.delete({ doctor });
    const mbl: Mbl = new Mbl();
    mbl.country = createDoctorDto4.mbl.country;
    mbl.state = createDoctorDto4.mbl.state;
    mbl.number = createDoctorDto4.mbl.number;
    mbl.npiNumber = createDoctorDto4.mbl.npiNumber;
    mbl.expiration = createDoctorDto4.mbl.expiration;
    mbl.doctor = doctor;
    this.mblRepository.save(mbl);

    try {

      if (doctor) {
        await this.doctorRepository.save(doctor);
        return true;
      } else {
        throw new BadRequestException("Sorry, we are not able to update this record");
      }

    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException(error);
    }
  }


  async forgetPassword(email: string): Promise<Boolean> {

    const user = await this.doctorRepository.findOne({
      where: { email: email },
    });
    try {
      if (user) {
        const verificationCode = "0000"; //(await this.generateRandomNumber()).toString();
        user.verificationCode = verificationCode;
        await this.doctorRepository.save(user);

        return true;
      } else {
        throw new BadRequestException("Failed to reset password");
      }
    } catch (error) {
      throw new BadRequestException("Failed to reset password");
    }
  }

  async updateVerifiedPassword(
    updateVerifiedPasswordDto: UpdateVerifiedPasswordDto
  ): Promise<Boolean> {
    const user = await this.doctorRepository.findOneBy({
      email: updateVerifiedPasswordDto.email,
      verificationCode: updateVerifiedPasswordDto.verificationCode,
    });
    try {
      if (user) {
        const salt = await bcrypt.genSalt();
        const newhashedPassword = await bcrypt.hash(updateVerifiedPasswordDto.password, salt);
        user.password = newhashedPassword

        user.verificationCode = null;
        await this.doctorRepository.save(user);
        return true;
      } else {
        throw new InternalServerErrorException('Sorry, we are unable to update your password');
      }
    } catch (error) {
      throw new InternalServerErrorException('Sorry, we are unable to update your password');
    }
  }

  async verifyPassword(
    email: string,
    updatePasswordDto: UpdatePasswordDto
  ): Promise<Boolean> {
    const user = await this.doctorRepository.findOneBy({
      email,
      verificationCode: updatePasswordDto.verificationCode,
    });

    try {
      if (user) {
        return true;
      } else {
        throw new InternalServerErrorException('Hash is not correct');
      }
    } catch (error) {
      throw new InternalServerErrorException('Hash is not correct');
    }
  }

  async updateProfilePassword(
    id: string,
    updateprofilePasswordDto: UpdateprofilePasswordDto
  ): Promise<Boolean> {
    const user = await this.doctorRepository.findOneBy({
      id,
    });

    console.log("user", user);
    try {

      if (user && (await bcrypt.compare(updateprofilePasswordDto.old_password, user.password))) {
        const salt = await bcrypt.genSalt();
        const newhashedPassword = await bcrypt.hash(updateprofilePasswordDto.new_password, salt);
        user.password = newhashedPassword
        await this.doctorRepository.save(user);
        return true;
      } else {
        throw new InternalServerErrorException('Sorry, we are unable to update your password');
      }
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException('Sorry, we are unable to update your password');
    }
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    userId: any
  ): Promise<{ accessToken: string }> {
    const user = await this.doctorRepository.findOneBy({ id: userId });

    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.phoneNumber = updateUserDto.phoneNumber;
    user.image = updateUserDto.image;

    try {
      let resp = await this.doctorRepository.save(user);

      if (resp) {
        const userData = {
          id: resp.id,
          firstName: resp.firstName,
          lastName: resp.lastName,
          phoneNumber: resp.phoneNumber,
          basicEducation: resp.basicEducation,
          image: resp.image,
        };
        return {
          accessToken: this.jwtService.sign(userData),
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

  async profileDetail(id) {
    const data = await this.doctorRepository.findOne(
      {
        where: { id: id },
        relations: ["awards", "certifications", "educations", "mbls"],
      });

    return data;
  }
  expandWeekDayRange(range: string): string[] {
    const weekDaysLong = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weekDaysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [startDay, endDay] = range.split('-').map(day => day.trim());
    const startIndex = weekDaysShort.indexOf(startDay);
    const endIndex = weekDaysShort.indexOf(endDay);
    return weekDaysLong.slice(startIndex, endIndex + 1);
  }
  expandTimeRange(range: string): string[] {
    const times = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00'];
    const [startTimes, endTimes] = range.split('-').map(day => day.trim());
    const startIndex = times.indexOf(startTimes);
    const endIndex = times.indexOf(endTimes);
    return times.slice(startIndex, endIndex + 1);
  }
}

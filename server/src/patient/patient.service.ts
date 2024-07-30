import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationError,
} from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { Patient } from "./patient.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import * as bcrypt from "bcrypt";
import { LoginPatientDto } from "./dto/login-patient.dto";
import { JwtService } from "@nestjs/jwt";

import * as crypto from "crypto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { UpdateVerifiedPasswordDto } from "./dto/update-verified-password.dto";
import { UpdateprofilePasswordDto } from "./dto/update-profile-password.dto";
import { CreatePatientDto2 } from "./dto/create-patient2.dto";
import { CreatePatientDto3 } from "./dto/create-patient3.dto";
import { CreatePatientDto4 } from "./dto/create-patient4.dto";
import { Certification } from "src/certification/certification.entity";
import { Education } from "src/education/education.entity";
import { Mbl } from "src/mbl/mbl.entity";
import { UpdateUserDto } from "./dto/update-patient.dto";

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Education)
     private readonly educationRepository: Repository<Education>,
    @InjectRepository(Mbl)
    private readonly mblRepository: Repository<Mbl>,
    @InjectRepository(Certification)
    private readonly certificationRepository: Repository<Certification>,
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

  async createPatient(
    createPatientDto: CreatePatientDto
  ): Promise<{ accessToken: string }> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createPatientDto.password, salt);
    const patient: Patient = new Patient();
    patient.firstName = createPatientDto.firstName;
    patient.lastName = createPatientDto.lastName;
    patient.email = createPatientDto.email;
    patient.middleName = createPatientDto.middleName;
    patient.password = hashedPassword;
    patient.image = createPatientDto.image;

    const isEmailExist = await this.patientRepository.findOne({
      where: { email: patient.email },
    });
    if (isEmailExist) {
      throw new BadRequestException(
        "The email is already taken. Please choose another one"
      );
    }
    try {
      let resp = await this.patientRepository.save(patient);

      if (resp) {
        const patientData = {
          id: resp.id,
          firstName: resp.firstName,
          lastName: resp.lastName,
          email: resp.email,
          middleName: resp.middleName,
          image: resp.image,
        };
        return {
          accessToken: this.jwtService.sign(patientData),
        };
      }
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException();
    }
  }




  async createPatient2(
    createPatientDto2: CreatePatientDto2, id:string
  ): Promise<boolean> {
    
    const patient = await this.patientRepository.findOneBy({ id });
    
    patient.npiNumber = createPatientDto2.npiNumber;
    patient.drivingLicense = createPatientDto2.drivingLicense;
    patient.age = createPatientDto2.age;
    patient.basicEducation = createPatientDto2.education;
    patient.suffix = createPatientDto2.suffix;
    patient.boardCertified = createPatientDto2.boardCertified;
    patient.hospitalAffiliate = createPatientDto2.hospitalAffiliate;
    patient.hospitalName = createPatientDto2.hospitalName;
    
    try {

      if (patient) {
        patient.verificationCode = null;
        await this.patientRepository.save(patient);
        return true;
      } else {
        throw new BadRequestException("Sorry, we are not able to update this record");
      }
      
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException(error);
    }
  }


  async createPatient3(
    createPatientDto3: CreatePatientDto3, id:string
  ): Promise<boolean> {
    
    const patient = await this.patientRepository.findOneBy({ id });
    
    patient.facultyAppoinment = createPatientDto3.facultyAppoinment;
    patient.title = createPatientDto3.title;
    patient.insurancePlan = createPatientDto3.insurancePlan;
    patient.providerOfficeLocation = createPatientDto3.officeLocation;
    patient.providerCity = createPatientDto3.city;
    patient.providerStreet = createPatientDto3.street;
    patient.providerZip = createPatientDto3.zipCode;
    patient.providerState = createPatientDto3.state;
    patient.officeDays = createPatientDto3.officeDays;
    patient.officeHours = createPatientDto3.officeHours;
    patient.website = createPatientDto3.website;


    try {

      if (patient) {
        patient.verificationCode = null;
        await this.patientRepository.save(patient);
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

    const user = await this.patientRepository.findOne({
      where: { email: email },
    });
    try {
      if (user) {
        const verificationCode =  "0000"; //(await this.generateRandomNumber()).toString();
        user.verificationCode = verificationCode;
        await this.patientRepository.save(user);

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
    const user = await this.patientRepository.findOneBy({
      email:updateVerifiedPasswordDto.email,
      verificationCode: updateVerifiedPasswordDto.verificationCode,
    });
    try {
      if (user) {
        user.password = updateVerifiedPasswordDto.password;

        user.verificationCode = null;
        await this.patientRepository.save(user);
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
    const user = await this.patientRepository.findOneBy({
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
    const user = await this.patientRepository.findOneBy({
      id,
    });

    console.log("user",user);
    try {

        if (user && (await bcrypt.compare(updateprofilePasswordDto.old_password, user.password))) {
          const salt = await bcrypt.genSalt();
          const newhashedPassword = await bcrypt.hash(updateprofilePasswordDto.new_password, salt);
          user.password = newhashedPassword
          await this.patientRepository.save(user);
          return true;
        } else {
          throw new InternalServerErrorException('Sorry, we are unable to update your password');
        }
    } catch (error) {
      console.log("error",error);
      throw new InternalServerErrorException('Sorry, we are unable to update your password');
    }
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    userId: any
  ): Promise<{ accessToken: string }> {
    const user = await this.patientRepository.findOneBy({ id: userId });

    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.phoneNumber = updateUserDto.phoneNumber;
    user.image = updateUserDto.image;

    try {
      let resp = await this.patientRepository.save(user);

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
    loginPatientDto: LoginPatientDto
  ): Promise<{ accessToken: string }> {
    const { email, password } = loginPatientDto;
    const patient = await this.patientRepository.findOne({
      where: { email: email },
    });

    if (patient && (await bcrypt.compare(password, patient.password))) {
      const patientData = {
        id: patient.id, //So we can get it from Jwt token
        image: patient.image,
        firstName: patient.firstName,
        middleName: patient.middleName,
        lastName: patient.lastName,
        email: patient.email,
      };
      return {
        accessToken: this.jwtService.sign(patientData),
      };
    } else {
      throw new BadRequestException("Please check your login credentials");
    }
  }

  async list() {
    const data = await this.patientRepository.find({
      relations: ["awards", "certifications", "educations", "mbls"],
    });

    return data;
  }
}

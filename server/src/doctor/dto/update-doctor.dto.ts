import { Optional } from '@nestjs/common';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateDoctorDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  middleName?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  insuranceIdAttachment?: string;


  @IsString()
  @MaxLength(1000)
  @IsOptional()
  drivingLicenseAttachment?: string;



  @IsString()
  @MaxLength(1000)
  @IsOptional()
  age?: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  basicEducation?: string;


  @IsString()
  @MaxLength(1000)
  @IsOptional()
  suffix?: string;


  @IsString()
  @MaxLength(1000)
  @IsOptional()
  boardCertified?: string;


  @IsString()
  @MaxLength(1000)
  @IsOptional()
  hospitalAffiliate?: string;



  @IsString()
  @MaxLength(1000)
  @IsOptional()
  hospitalName?: string;


  @IsString()
  @MaxLength(1000)
  @IsOptional()
  facultyAppoinment?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  facultyAppoinmentTitle?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  acceptedInsurancePlans?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  providerOfficeLocation?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  providerCity?: string;

  @IsString()
  @MaxLength(250)
  @IsOptional()
  providerStreet?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  providerZip?: string;


  @IsString()
  @MaxLength(100)
  @IsOptional()
  providerState?: string;



  @IsString()
  @MaxLength(100)
  @IsOptional()
  providerSuite?: string;


  @IsString()
  @MaxLength(50)
  @IsOptional()
  officeDays?: string;


  @IsString()
  @MaxLength(50)
  @IsOptional()
  officeHours?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  website?: string;


  @IsOptional()
  languages?: any;

  
}

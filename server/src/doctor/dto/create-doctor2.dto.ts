import { Optional } from '@nestjs/common';
import { IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateDoctorDto2 {
  @IsString()
  @MinLength(9)
  @MaxLength(10)
  npiNumber: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  drivingLicense: string;


  @IsString()
  @MaxLength(12)
  @IsOptional()
  age?: string;

  @IsString()
  @MaxLength(50)
  @MinLength(2)
  education: string;

  @IsString()
  @MaxLength(6)
  @MinLength(2)
  suffix: string;

  @IsString()
  @MaxLength(6)
  @MinLength(2)
  boardCertified: string;

  @IsString()
  @MaxLength(6)
  @MinLength(2)
  hospitalAffiliate: string;

  @IsString()
  @MaxLength(80)
  @MinLength(2)
  hospitalName: string;

}
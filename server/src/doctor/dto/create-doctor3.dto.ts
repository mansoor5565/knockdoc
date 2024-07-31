import { Optional } from '@nestjs/common';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateDoctorDto3 {
  @IsString()
  @MinLength(2)
  @MaxLength(6)
  facultyAppoinment: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  insurancePlan: string;


  @IsString()
  @MaxLength(80)
  @MinLength(2)
  officeLocation?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  city: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  street: string;

  @IsString()
  @MinLength(4)
  @MaxLength(6)
  @IsOptional()
  zipCode: string;


  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  state: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  officeDays: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  officeHours: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  website: string;

}

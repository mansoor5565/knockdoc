import { Optional } from '@nestjs/common';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreatePatientDto3 {
 
  @IsString()
  @MaxLength(500)
  @MinLength(2)
  home_address: string;

  @IsString()
  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  home_city: string;

  @IsString()
  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  home_state: string;

  @IsString()
  @MaxLength(8)
  @MinLength(4)
  @IsOptional()
  home_zip: string;

  @IsString()
  @MaxLength(500)
  @MinLength(2)
  @IsOptional()
  home_street: string;

  @IsString()
  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  home_suite: string;

  @IsString()
  @IsOptional()
  drivingLicense: string;




  @IsString()
  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  preferred_age: string;

  @IsString()
  @MaxLength(20)
  @MinLength(2)
  @IsOptional()
  preferred_gender: string;

  @IsString()
  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  preferred_insurance: string;


  @IsString()
  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  allergy: string;

}

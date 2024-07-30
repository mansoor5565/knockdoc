import { Optional } from '@nestjs/common';
import { IsDate, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreatePatientDto2 {
  @IsDate()
  dob: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  gender: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  race: string;

  @IsString()
  @MaxLength(500)
  @MinLength(2)
  mail_address: string;

  @IsString()
  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  mail_city: string;

  @IsString()
  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  mail_state: string;

  @IsString()
  @MaxLength(8)
  @MinLength(4)
  @IsOptional()
  mail_zip: string;

  @IsString()
  @MaxLength(500)
  @MinLength(2)
  @IsOptional()
  mail_street: string;

  @IsString()
  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  mail_suite: string;

  @IsString()
  @MaxLength(500)
  @MinLength(2)
  work_address: string;

  @IsString()
  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  work_city: string;

  @IsString()
  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  work_state: string;

  @IsString()
  @MaxLength(8)
  @MinLength(4)
  @IsOptional()
  work_zip: string;

  @IsString()
  @MaxLength(500)
  @MinLength(2)
  @IsOptional()
  work_street: string;

  @IsString()
  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  work_suite: string;

}

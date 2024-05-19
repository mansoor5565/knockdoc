import { Optional } from '@nestjs/common';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateEducationDto {

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  medicalSchool: string;

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  degree: string;

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  year: string;

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  educated: string;

}

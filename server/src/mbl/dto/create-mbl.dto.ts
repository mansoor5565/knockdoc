import { Optional } from '@nestjs/common';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateMblDto {

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  stateLisence: string;

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  lisenceNumber: string;

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  npiNumber: string;

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  date: string;



  @IsString()
  @MinLength(2)
  @MaxLength(250)
  certificateImage: string;



  @IsString()
  @MinLength(2)
  @MaxLength(250)
  country: string;


  






}

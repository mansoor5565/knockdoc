import { Optional } from '@nestjs/common';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  lastName: string;


  @IsString()
  @MinLength(9)
  @MaxLength(14)
  phoneNumber: string;


  @IsOptional()
  @IsString()
  @MaxLength(500)
  image: string;
  
}

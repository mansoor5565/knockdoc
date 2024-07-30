import { Optional } from '@nestjs/common';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(4)
  @MaxLength(8)
  verificationCode: string;


  @IsString()
  @MinLength(2)
  @MaxLength(30)
  email: string;
  
}

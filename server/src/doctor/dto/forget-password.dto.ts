import { Optional } from '@nestjs/common';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ForgetPasswordDto {

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  email: string;

}

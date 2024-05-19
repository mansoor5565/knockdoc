import { Optional } from '@nestjs/common';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  email: string;


  @IsString()
  @MaxLength(20)
  @IsOptional()
  middleName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  image: string;


  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}

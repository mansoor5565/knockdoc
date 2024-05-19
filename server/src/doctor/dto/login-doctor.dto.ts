import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginDoctorDto {

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  email: string;

  @IsString()
  @MaxLength(32)
  password: string;
}

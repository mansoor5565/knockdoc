import { Optional } from "@nestjs/common";
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateCertificationDto {
  @IsString()
  @MinLength(2)
  @MaxLength(250)
  certificateName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  attachment: string;

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  year: string;
}

import { Optional } from "@nestjs/common";
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateAwardDto {
  @IsString()
  @MinLength(2)
  @MaxLength(250)
  awardName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  attachment: string;

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  year: string;
}

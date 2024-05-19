import { Optional } from "@nestjs/common";
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateLanguageDto {
  @IsString()
  @MinLength(2)
  @MaxLength(250)
  name: string;

}

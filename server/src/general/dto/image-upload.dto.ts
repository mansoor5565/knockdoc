import { Optional } from '@nestjs/common';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ImageUploadDto {

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  file: string;

}

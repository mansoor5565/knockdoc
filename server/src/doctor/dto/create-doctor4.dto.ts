import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Certification } from 'src/certification/certification.entity';
import { Education } from 'src/education/education.entity';
import { Mbl } from 'src/mbl/mbl.entity';

export class CreateDoctorDto4 {
  @IsOptional()
  education: Education[];

  @IsOptional()
  mbl: Mbl;

  @IsOptional()
  certifications: Certification[];
}

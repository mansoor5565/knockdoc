import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class CreateDoctortimeslotDto {
    @IsString()
    doctorId:string;

    @IsString()
    timeslotId:string;

}

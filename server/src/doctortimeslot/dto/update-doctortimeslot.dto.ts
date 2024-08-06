import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctortimeslotDto } from './create-doctortimeslot.dto';

export class UpdateDoctortimeslotDto extends PartialType(CreateDoctortimeslotDto) {}

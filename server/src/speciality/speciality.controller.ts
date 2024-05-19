import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from './dto/pagination.dto';



@Controller('speciality')
export class SpecialityController {
    constructor(private readonly specialityService: SpecialityService, ) { }

   
    @Get('/all')
    async getAllSpeciality(): Promise<any> {
        
        const  data  = await this.specialityService.getAllSpeciality();
        const response = { data:data, message: 'Data fetched successfully', status: true };
        return response;
    }

         //For Dish creation
    @Post('/create')
    async createSpeciality(@Body() createSpecialityDto: CreateSpecialityDto): Promise<any> {
        const data = await this.specialityService.createSpeciality(createSpecialityDto);
        const response = { data: data, message: 'Record created successfully', status: true }
        return response;
    }

     
     //To get Speciality Data
     @Delete('/:id')
     async deleteSpeciality(@Param('id') id: string): Promise<any> {
         const data = await this.specialityService.deleteSpeciality(id);
         const response = { data: data, message: 'Record Delete successfully', status: true }
         return response;
     }


}






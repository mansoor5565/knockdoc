import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from './dto/pagination.dto';



@Controller('education')
export class EducationController {
    constructor(private readonly educationService: EducationService, ) { }

   
    @Get('/all')
    @UseGuards(AuthGuard())
    async getAllEducation(@Req() req, @Query() paginationDto: PaginationDto): Promise<any> {
        
        
        const userId = req.user.id; 
        const  data  = await this.educationService.getAllEducation(userId);
        const response = { data:data, message: 'Data fetched successfully', status: true };
        return response;
    }

         //For Dish creation
    @Post('/create')
    @UseGuards(AuthGuard())
    async createEducation(@Body() createEducationDto: CreateEducationDto, @Req() req): Promise<any> {
        const userId = req.user.id;
        const data = await this.educationService.createEducation(createEducationDto, userId);
        const response = { data: data, message: 'Record created successfully', status: true }
        return response;
    }

     
     //To get Education Data
     @Delete('/:id')
    @UseGuards(AuthGuard())
     async deleteEducation(@Param('id') id: string): Promise<any> {
         const data = await this.educationService.deleteEducation(id);
         const response = { data: data, message: 'Record Delete successfully', status: true }
         return response;
     }



}






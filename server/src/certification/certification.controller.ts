import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from './dto/pagination.dto';



@Controller('certification')
export class CertificationController {
    constructor(private readonly certificationService: CertificationService, ) { }

   
    @Get('/all')
    @UseGuards(AuthGuard())
    async getAllCertification(@Req() req, @Query() paginationDto: PaginationDto): Promise<any> {
        
        
        const userId = req.user.id; 
        const  data  = await this.certificationService.getAllCertification(userId);
        const response = { data:data, message: 'Data fetched successfully', status: true };
        return response;
    }

         //For Dish creation
    @Post('/create')
    @UseGuards(AuthGuard())
    async createCertification(@Body() createCertificationDto: CreateCertificationDto, @Req() req): Promise<any> {
        const userId = req.user.id;
        const data = await this.certificationService.createCertification(createCertificationDto, userId);
        const response = { data: data, message: 'Record created successfully', status: true }
        return response;
    }

     
     //To get Certification Data
     @Delete('/:id')
    @UseGuards(AuthGuard())
     async deleteCertification(@Param('id') id: string): Promise<any> {
         const data = await this.certificationService.deleteCertification(id);
         const response = { data: data, message: 'Record Delete successfully', status: true }
         return response;
     }


}






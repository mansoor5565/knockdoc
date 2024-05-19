import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { MblService } from './mbl.service';
import { CreateMblDto } from './dto/create-mbl.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from './dto/pagination.dto';



@Controller('mbl')
export class MblController {
    constructor(private readonly mblService: MblService, ) { }

   
    @Get('/all')
    @UseGuards(AuthGuard())
    async getAllMbl(@Req() req, @Query() paginationDto: PaginationDto): Promise<any> {
        
        
        const userId = req.user.id; 
        const  data  = await this.mblService.getAllMbl(userId);
        const response = { data:data, message: 'Data fetched successfully', status: true };
        return response;
    }

         //For Dish creation
    @Post('/create')
    @UseGuards(AuthGuard())
    async createMbl(@Body() createMblDto: CreateMblDto, @Req() req): Promise<any> {
        const userId = req.user.id;
        const data = await this.mblService.createMbl(createMblDto, userId);
        const response = { data: data, message: 'Record created successfully', status: true }
        return response;
    }

     
     //To get Mbl Data
     @Delete('/:id')
    @UseGuards(AuthGuard())
     async deleteMbl(@Param('id') id: string): Promise<any> {
         const data = await this.mblService.deleteMbl(id);
         const response = { data: data, message: 'Record Delete successfully', status: true }
         return response;
     }



}






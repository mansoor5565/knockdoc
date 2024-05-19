import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AwardService } from './award.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from './dto/pagination.dto';



@Controller('award')
export class AwardController {
    constructor(private readonly awardService: AwardService, ) { }

   
    @Get('/all')
    @UseGuards(AuthGuard())
    async getAllAward(@Req() req, @Query() paginationDto: PaginationDto): Promise<any> {
        
        
        const userId = req.user.id; 
        const  data  = await this.awardService.getAllAward(userId);
        const response = { data:data, message: 'Data fetched successfully', status: true };
        return response;
    }

         //For Dish creation
    @Post('/create')
    @UseGuards(AuthGuard())
    async createAward(@Body() createAwardDto: CreateAwardDto, @Req() req): Promise<any> {
        const userId = req.user.id;
        const data = await this.awardService.createAward(createAwardDto, userId);
        const response = { data: data, message: 'Record created successfully', status: true }
        return response;
    }

     
     //To get Award Data
     @Delete('/:id')
    @UseGuards(AuthGuard())
     async deleteAward(@Param('id') id: string): Promise<any> {
         const data = await this.awardService.deleteAward(id);
         const response = { data: data, message: 'Record Delete successfully', status: true }
         return response;
     }


}






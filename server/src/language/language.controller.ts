import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from './dto/pagination.dto';



@Controller('language')
export class LanguageController {
    constructor(private readonly languageService: LanguageService, ) { }

   
    @Get('/all')
    async getAllLanguage(): Promise<any> {
        
        const  data  = await this.languageService.getAllLanguage();
        const response = { data:data, message: 'Data fetched successfully', status: true };
        return response;
    }

         //For Dish creation
    @Post('/create')
    async createLanguage(@Body() createLanguageDto: CreateLanguageDto): Promise<any> {
        const data = await this.languageService.createLanguage(createLanguageDto);
        const response = { data: data, message: 'Record created successfully', status: true }
        return response;
    }

     
     //To get Language Data
     @Delete('/:id')
     async deleteLanguage(@Param('id') id: string): Promise<any> {
         const data = await this.languageService.deleteLanguage(id);
         const response = { data: data, message: 'Record Delete successfully', status: true }
         return response;
     }


}






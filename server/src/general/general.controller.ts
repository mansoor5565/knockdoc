import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { GeneralService } from './general.service';
import { AuthGuard } from '@nestjs/passport';
import { ImageUploadDto } from './dto/image-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('general')
export class GeneralController {
    constructor(private readonly generalService: GeneralService, ) { }

    @Post('/upload/image')
   @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
            @UploadedFile() file: Express.Multer.File, @Req() req): Promise<any> {
       
            if (!file) {
            throw new BadRequestException('No file uploaded');
            }
            const data = await this.generalService.uploadImage(file);
            return { data, message: 'Image uploaded successfully', status: true };
    }

}






import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { LoginDoctorDto } from './dto/login-doctor.dto';
// import { DishesService } from '../dishes/dishes.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateVerifiedPasswordDto } from './dto/update-verified-password.dto';
// import { PaginationDto } from '../dishes/dto/pagination.dto';



@Controller('doctor')
export class DoctorsController {
    constructor(private readonly doctorService: DoctorService) { }

    //private readonly dishesService: DishesService

    //Doctor account creation API
    @Post('/signup')
    async createDoctor(@Body() createDoctorDto: CreateDoctorDto): Promise<any> {
        const { accessToken } = await this.doctorService.createDoctor(createDoctorDto);
        const response = { accessToken, message: 'Your account has been created successfully', status: true };
        return response;
    }

    @Get('/list')
    async list(): Promise<any> {
        const data = await this.doctorService.list();
        const response = { data,message: 'Fetched successfully', status: true };
        return response;
    }


    @UseGuards(AuthGuard())
    @Put('/update')
    async updateDoctor(@Body() updateDoctorDto: UpdateDoctorDto, @Req() req): Promise<any> {
        const userId = req.user.id; 
        const { accessToken } = await this.doctorService.updateDoctor(updateDoctorDto,userId);
        const response = { accessToken, message: 'Your account has been updated successfully', status: true };
        return response;
    }




    @Get('/forget-password/:id')
    async forgetPassword(@Param('id') id: string): Promise<Object> { 
        const data = await this.doctorService.forgetPassword(id);
        if (data) {
            return { message: 'Please check your email for password reset', status: true };
        } else {
            // Assuming data is false if forgetPassword fails
            return { message: 'Failed to reset password', status: false };
        }
    }



    @Put('/verify-password/:id')
    async verifyPassword(@Param('id') id: string,@Body() updatePasswordDto: UpdatePasswordDto): Promise<Object> { 
        const data = await this.doctorService.verifyPassword(id,updatePasswordDto);
        if (data) {
            return { message: 'Hash is correct', status: true };
        } else {
            // Assuming data is false if forgetPassword fails
            return { message: 'Hash is not correct', status: false };
        }
    }

    
    @Put('/update-verified-password/:id')
    async updateVerifiedPassword(@Param('id') id: string,@Body() updateVerifiedPasswordDto: UpdateVerifiedPasswordDto): Promise<Object> { 
        const data = await this.doctorService.updateVerifiedPassword(id,updateVerifiedPasswordDto);
        if (data) {
            return { message: 'Password has been updated successfully', status: true };
        } else {
            // Assuming data is false if forgetPassword fails
            return { message: 'Sorry, we are unable to update your password', status: false };
        }
    }


    @UseGuards(AuthGuard())
    @Put('/update-profile-password')
    async updateProfilePassword(@Body() updateDoctorDto: UpdateDoctorDto, @Req() req): Promise<Object> {
        const userId = req.user.id; 
        const data = await this.doctorService.updateProfilePassword(updateDoctorDto,userId);
        
        if (data) {
            return { message: 'Password has been updated successfully', status: true };
        } else {
            // Assuming data is false if forgetPassword fails
            return { message: 'Sorry, we are unable to update your password', status: false };
        }

    }


    //Doctor login API
    @Post('/signin')
    async signIn(@Body() loginDoctorDto: LoginDoctorDto): Promise<any> {
        const { accessToken } = await this.doctorService.signIn(loginDoctorDto);
        const response = { accessToken, message: 'Signin successfully', status: true };
        return response;
    }


    //Get doctor own dishes.
    // @UseGuards(AuthGuard())
    // @Get('/dishes')
    // async getDoctorDishes(@Req() req, @Query() paginationDto: PaginationDto): Promise<any> {
    //     const doctorId = req.doctor.id
    //     const data = await this.dishesService.getDoctorDishes(doctorId, paginationDto);
    //     const response = { data, message: 'Signin successfully', status: true };
    //     return response;

    // }




}






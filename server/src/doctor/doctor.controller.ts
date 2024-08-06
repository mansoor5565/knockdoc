import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { CreateDoctorDto2 } from './dto/create-doctor2.dto';
import { CreateDoctorDto3 } from './dto/create-doctor3.dto';
import { CreateDoctorDto4 } from './dto/create-doctor4.dto';


import { LoginDoctorDto } from './dto/login-doctor.dto';
// import { DishesService } from '../dishes/dishes.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateVerifiedPasswordDto } from './dto/update-verified-password.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { UpdateprofilePasswordDto } from './dto/update-profile-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  @UseGuards(AuthGuard())
  @Post('/signup2')
  async createDoctor2(@Body() createDoctorDto2: CreateDoctorDto2, @Req() req): Promise<any> {
    const userId = req.user.id;
    await this.doctorService.createDoctor2(createDoctorDto2, userId);
    const response = { message: 'Your account has been updated successfully', status: true };
    return response;
  }


  @UseGuards(AuthGuard())
  @Post('/signup3')
  async createDoctor3(@Body() createDoctorDto3: CreateDoctorDto3, @Req() req): Promise<any> {
    const userId = req.user.id;
    await this.doctorService.createDoctor3(createDoctorDto3, userId);
    const response = { message: 'Your account has been updated successfully', status: true };
    return response;
  }


  @UseGuards(AuthGuard())
  @Post('/signup4')
  async createDoctor4(@Body() createDoctorDto4: CreateDoctorDto4, @Req() req): Promise<any> {
    const userId = req.user.id;
    await this.doctorService.createDoctor4(createDoctorDto4, userId);
    const response = { message: 'Your account has been updated successfully', status: true };
    return response;
  }




  @UseGuards(AuthGuard())
  @Get('/list')
  async list(): Promise<any> {
    const data = await this.doctorService.list();
    const response = { data, message: 'Fetched successfully', status: true };
    return response;
  }



  @UseGuards(AuthGuard())
  @Get('/')
  async profileDetail(@Req() req): Promise<any> {
    const userId = req.user.id;
    const data = await this.doctorService.profileDetail(userId);
    const response = { data, message: 'Fetched successfully', status: true };
    return response;
  }


  @Put("/forget-password")
  async forgetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
    @Req() req
  ): Promise<any> {
    const email = forgetPasswordDto.email;

    const data = await this.doctorService.forgetPassword(email);
    if (data) {
      return {
        message: "Please check your email for password reset",
        status: true,
      };
    } else {
      // Assuming data is false if forgetPassword fails
      return { message: "Failed to reset password", status: false };
    }
  }

  @Put("/verify-password")
  async verifyPassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Req() req
  ): Promise<any> {
    const email = updatePasswordDto.email;

    const data = await this.doctorService.verifyPassword(
      email,
      updatePasswordDto
    );
    if (data) {
      return { message: "Hash is correct", status: true };
    } else {
      // Assuming data is false if forgetPassword fails
      return { message: "Hash is not correct", status: false };
    }
  }


  @Put("/update-verified-password")
  async updateVerifiedPassword(
    @Body() updateVerifiedPasswordDto: UpdateVerifiedPasswordDto
  ): Promise<Object> {
    const data = await this.doctorService.updateVerifiedPassword(
      updateVerifiedPasswordDto
    );
    if (data) {
      return {
        message: "Password has been updated successfully",
        status: true,
      };
    } else {
      // Assuming data is false if forgetPassword fails
      return {
        message: "Sorry, we are unable to update your password",
        status: false,
      };
    }
  }


  @UseGuards(AuthGuard())
  @Put("/update-profile-password")
  async updateProfilePassword(
    @Body() updateUserDto: UpdateprofilePasswordDto,
    @Req() req
  ): Promise<Object> {
    const userId = req.user.id;
    const data = await this.doctorService.updateProfilePassword(
      userId,
      updateUserDto
    );

    if (data) {
      return {
        message: "Password has been updated successfully",
        status: true,
      };
    } else {
      // Assuming data is false if forgetPassword fails
      return {
        message: "Sorry, we are unable to update your password",
        status: false,
      };
    }
  }



  @UseGuards(AuthGuard())
  @Put("/update")
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ): Promise<any> {
    const userId = req.user.id;
    const { accessToken } = await this.doctorService.updateUser(
      updateUserDto,
      userId
    );
    const response = {
      accessToken,
      message: "Your account has been updated successfully",
      status: true,
    };
    return response;
  }



  //Doctor login API
  @Post('/signin')
  async signIn(@Body() loginDoctorDto: LoginDoctorDto): Promise<any> {
    const { accessToken } = await this.doctorService.signIn(loginDoctorDto);
    const response = { accessToken, message: 'Signin successfully', status: true };
    return response;
  }
  @Get('/check-function')
  checkFunction(@Req() req) {
    const range = req.query.range as string;
    const daylist = this.doctorService.expandTimeRange(range);
    return daylist;
  }
}






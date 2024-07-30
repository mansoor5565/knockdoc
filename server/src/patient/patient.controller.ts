import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreatePatientDto2 } from './dto/create-patient2.dto';
import { CreatePatientDto3 } from './dto/create-patient3.dto';
import { LoginPatientDto } from './dto/login-patient.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateVerifiedPasswordDto } from './dto/update-verified-password.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { UpdateprofilePasswordDto } from './dto/update-profile-password.dto';
import { UpdateUserDto } from './dto/update-patient.dto';
// import { PaginationDto } from '../dishes/dto/pagination.dto';



@Controller('patient')
export class PatientsController {
    constructor(private readonly patientService: PatientService) { }

    //private readonly dishesService: DishesService

    //Patient account creation API
    @Post('/signup')
    async createPatient(@Body() createPatientDto: CreatePatientDto): Promise<any> {
        const { accessToken } = await this.patientService.createPatient(createPatientDto);
        const response = { accessToken, message: 'Your account has been created successfully', status: true };
        return response;
    }

    @UseGuards(AuthGuard())
    @Post('/signup2')
    async createPatient2(@Body() createPatientDto2: CreatePatientDto2,@Req() req): Promise<any> {
        const userId = req.user.id; 
         await this.patientService.createPatient2(createPatientDto2,userId);
        const response = { message: 'Your account has been updated successfully', status: true };
        return response;
    }


    @UseGuards(AuthGuard())
    @Post('/signup3')
    async createPatient3(@Body() createPatientDto3: CreatePatientDto3,@Req() req): Promise<any> {
        const userId = req.user.id; 
        await this.patientService.createPatient3(createPatientDto3,userId);
        const response = { message: 'Your account has been updated successfully', status: true };
        return response;
    }



    @Get('/list')
    async list(): Promise<any> {
        const data = await this.patientService.list();
        const response = { data,message: 'Fetched successfully', status: true };
        return response;
    }


    @Put("/forget-password")
    async forgetPassword(
      @Body() forgetPasswordDto: ForgetPasswordDto,
      @Req() req
    ): Promise<any> {
      const email = forgetPasswordDto.email;
  
      const data = await this.patientService.forgetPassword(email);
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
  
      const data = await this.patientService.verifyPassword(
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
      const data = await this.patientService.updateVerifiedPassword(
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
      const data = await this.patientService.updateProfilePassword(
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
      const { accessToken } = await this.patientService.updateUser(
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



    //Patient login API
    @Post('/signin')
    async signIn(@Body() loginPatientDto: LoginPatientDto): Promise<any> {
        const { accessToken } = await this.patientService.signIn(loginPatientDto);
        const response = { accessToken, message: 'Signin successfully', status: true };
        return response;
    }

}






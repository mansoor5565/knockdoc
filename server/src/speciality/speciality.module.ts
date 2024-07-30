import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speciality } from './speciality.entity';
import { JwtStrategy } from '../jwt.strategy';
//import { Dish } from '../dishes/dish.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { Doctor } from 'src/doctor/doctor.entity';
import { DoctorService } from 'src/doctor/doctor.service';
import { DoctorModule } from 'src/doctor/doctor.module';
import { EducationModule } from 'src/education/education.module';
import { Education } from 'src/education/education.entity';
import { Mbl } from 'src/mbl/mbl.entity';
import { Certification } from 'src/certification/certification.entity';


@Module({
  imports: [
    DoctorModule,
    EducationModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your own secret key
      signOptions: { expiresIn: '300h' }, // Token expiration time
    }),
    TypeOrmModule.forFeature([Speciality,Doctor,Education,Mbl,Certification ])],
    //Dish
  controllers: [SpecialityController],
  providers: [SpecialityService,DoctorService, JwtStrategy]
})
//DishesService
export class SpecialityModule { }

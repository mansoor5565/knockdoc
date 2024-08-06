import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './language.entity';
import { JwtStrategy } from '../jwt.strategy';
//import { Dish } from '../dishes/dish.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { Doctor } from 'src/doctor/doctor.entity';
import { DoctorService } from 'src/doctor/doctor.service';
import { CertificationModule } from 'src/certification/certification.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { EducationModule } from 'src/education/education.module';
import { Education } from 'src/education/education.entity';
import { Mbl } from 'src/mbl/mbl.entity';
import { Certification } from 'src/certification/certification.entity';
import { Timeslot } from 'src/timeslot/entities/timeslot.entity';
import { TimeslotModule } from 'src/timeslot/timeslot.module';


@Module({
  imports: [
    TimeslotModule,
    DoctorModule,
    EducationModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your own secret key
      signOptions: { expiresIn: '300h' }, // Token expiration time
    }),
    TypeOrmModule.forFeature([Language,Doctor,Education,Mbl,Certification,Timeslot ])],
    //Dish
  controllers: [LanguageController],
  providers: [LanguageService,DoctorService, JwtStrategy]
})
//DishesService
export class LanguageModule { }

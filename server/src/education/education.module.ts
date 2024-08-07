import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './education.entity';
import { JwtStrategy } from '../jwt.strategy';
//import { Dish } from '../dishes/dish.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { Doctor } from 'src/doctor/doctor.entity';
import { DoctorService } from 'src/doctor/doctor.service';
import { Language } from 'src/language/language.entity';
import { DoctorModule } from 'src/doctor/doctor.module';
import { Mbl } from 'src/mbl/mbl.entity';
import { Certification } from 'src/certification/certification.entity';
import { Timeslot } from 'src/timeslot/entities/timeslot.entity';
import { TimeslotModule } from 'src/timeslot/timeslot.module';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your own secret key
      signOptions: { expiresIn: '300h' }, // Token expiration time
    }),
    TypeOrmModule.forFeature([Education,Doctor, Language,Mbl,Certification,Timeslot ]),
    TimeslotModule,
  ],
    //Dish
  controllers: [EducationController],
  providers: [EducationService,DoctorService, JwtStrategy]
})
//DishesService
export class EducationModule { }

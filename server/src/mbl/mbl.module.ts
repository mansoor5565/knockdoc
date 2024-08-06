import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mbl } from './mbl.entity';
import { JwtStrategy } from '../jwt.strategy';
//import { Dish } from '../dishes/dish.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MblService } from './mbl.service';
import { MblController } from './mbl.controller';
import { Doctor } from 'src/doctor/doctor.entity';
import { DoctorService } from 'src/doctor/doctor.service';
import { DoctorModule } from 'src/doctor/doctor.module';
import { EducationModule } from 'src/education/education.module';
import { Education } from 'src/education/education.entity';
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
    TypeOrmModule.forFeature([Mbl,Doctor,Education, Certification,Timeslot ])],
    //Dish
  controllers: [MblController],
  providers: [MblService,DoctorService, JwtStrategy]
})
//DishesService
export class MblModule { }

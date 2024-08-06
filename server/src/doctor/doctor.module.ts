  import { DoctorTimeSlot } from './../doctortimeslot/entities/doctortimeslot.entity';
  import { Module } from '@nestjs/common';
  import { DoctorsController } from './doctor.controller';
  import { DoctorService } from './doctor.service';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Doctor } from './doctor.entity';
  import { JwtStrategy } from '../jwt.strategy';
  import { JwtModule } from '@nestjs/jwt';
  import { PassportModule } from '@nestjs/passport';
  import { Language } from 'src/language/language.entity';
  import { LanguageService } from 'src/language/language.service';
  import { Certification } from 'src/certification/certification.entity';
  import { Award } from 'src/award/award.entity';
  import { Education } from 'src/education/education.entity';
  import { Mbl } from 'src/mbl/mbl.entity';
  import { EducationModule } from 'src/education/education.module';
  import { CertificationModule } from 'src/certification/certification.module';
  import { TimeslotModule } from 'src/timeslot/timeslot.module';
  import { Timeslot } from 'src/timeslot/entities/timeslot.entity';
  import { TimeslotService } from 'src/timeslot/timeslot.service';

  @Module({
    imports: [
      TimeslotModule,
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: 'yourSecretKey', // Replace with your own secret key
        signOptions: { expiresIn: '1000h' }, // Token expiration time
      }),
      TypeOrmModule.forFeature([Doctor, Language, Certification, Award, Education, Mbl,Timeslot]),
    ],
    controllers: [DoctorsController],
    providers: [DoctorService, LanguageService, JwtStrategy]
  })

  //DishesService
  export class DoctorModule { }

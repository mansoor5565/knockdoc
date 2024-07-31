import { Module } from '@nestjs/common';
import { PatientsController } from './patient.controller';
import { PatientService } from './patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { JwtStrategy } from '../jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Language } from 'src/language/language.entity';
import { LanguageService } from 'src/language/language.service';
import { Certification } from 'src/certification/certification.entity';
import { Award } from 'src/award/award.entity';
import { Education } from 'src/education/education.entity';
import { Mbl } from 'src/mbl/mbl.entity';
import { Doctor } from 'src/doctor/doctor.entity';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your own secret key
      signOptions: { expiresIn: '1000h' }, // Token expiration time
    }),
    TypeOrmModule.forFeature([Patient,Language,Certification,Award,Education,Mbl,Doctor ])],
  controllers: [PatientsController],
  providers: [PatientService,LanguageService, JwtStrategy]
})

//DishesService
export class PatientModule { }

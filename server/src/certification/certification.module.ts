import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certification } from './certification.entity';
import { JwtStrategy } from '../jwt.strategy';
//import { Dish } from '../dishes/dish.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CertificationService } from './certification.service';
import { CertificationController } from './certification.controller';
import { Doctor } from 'src/doctor/doctor.entity';
import { DoctorService } from 'src/doctor/doctor.service';
import { DoctorModule } from 'src/doctor/doctor.module';
import { EducationModule } from 'src/education/education.module';
import { Education } from 'src/education/education.entity';
import { Mbl } from 'src/mbl/mbl.entity';


@Module({
  imports: [
    DoctorModule,
    EducationModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your own secret key
      signOptions: { expiresIn: '300h' }, // Token expiration time
    }),
    TypeOrmModule.forFeature([Certification,Doctor,Education, Mbl ])],
    //Dish
  controllers: [CertificationController],
  providers: [CertificationService,DoctorService, JwtStrategy]
})
//DishesService
export class CertificationModule { }

import { Module } from '@nestjs/common';
import { DoctorsController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { JwtStrategy } from '../jwt.strategy';
// import { Dish } from '../dishes/dish.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Language } from 'src/language/language.entity';
import { LanguageService } from 'src/language/language.service';
import { Certification } from 'src/certification/certification.entity';
import { Award } from 'src/award/award.entity';
// import { DishesService } from '../dishes/dishes.service';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    TypeOrmModule.forFeature([Doctor,Language,Certification,Award ])],

    //Dish
  controllers: [DoctorsController],
  providers: [DoctorService,LanguageService, JwtStrategy]
})

//DishesService
export class DoctorModule { }

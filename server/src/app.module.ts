import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { EducationModule } from './education/education.module';
import { CertificationModule } from './certification/certification.module';
import { AwardModule } from './award/award.module';
import { MblModule } from './mbl/mbl.module';
import { SpecialityModule } from './speciality/speciality.module';
import { LanguageModule } from './language/language.module';

@Module({
  imports: [
    CacheModule.register({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'testtest',
      database: 'doctorApp',
      synchronize: true,
      autoLoadEntities: true,
    }),
    DoctorModule,
    EducationModule,
    CertificationModule,
    AwardModule,
    MblModule,
    SpecialityModule,
    LanguageModule
  ],
})
export class AppModule { }

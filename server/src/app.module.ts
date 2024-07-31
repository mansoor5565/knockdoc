import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { EducationModule } from './education/education.module';
import { CertificationModule } from './certification/certification.module';
import { MblModule } from './mbl/mbl.module';
import { SpecialityModule } from './speciality/speciality.module';
import { LanguageModule } from './language/language.module';
import { PatientModule } from './patient/patient.module';


@Module({
  imports: [
    CacheModule.register({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'knockdoc',
      synchronize: true,
      autoLoadEntities: true,
    }),
    DoctorModule,
    EducationModule,
    CertificationModule,
    MblModule,
    SpecialityModule,
    LanguageModule,
    PatientModule
  ],
})
export class AppModule { }

import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { EducationModule } from './education/education.module';
import { CertificationModule } from './certification/certification.module';
import { MblModule } from './mbl/mbl.module';
import { SpecialityModule } from './speciality/speciality.module';
import { LanguageModule } from './language/language.module';
import { PatientModule } from './patient/patient.module';
import { GeneralModule } from './general/general.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the uploads folder
    }),
    CacheModule.register({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'testtest',
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
    PatientModule,
    GeneralModule
  ],
})
export class AppModule { }

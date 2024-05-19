import { Award } from "src/award/award.entity";
import { Certification } from "src/certification/certification.entity";
import { Education } from "src/education/education.entity";
import { Language } from "src/language/language.entity";
import { Mbl } from "src/mbl/mbl.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
//import { Dish } from '../dishes/dish.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: null })
  middleName: string;

  @Column({ default: null })
  phoneNumber: string;

  @Column({ default: null })
  npiNumber: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  image: string;

  @OneToMany(() => Education, (education) => education.doctor)
  educations: Education[];


  @OneToMany(() => Certification, (certification) => certification.doctor)
  certifications: Certification[];


  @OneToMany(() => Award, (award) => award.doctor)
  awards: Award[];


  @OneToMany(() => Mbl, (mbl) => mbl.doctor)
  mbls: Mbl[];
  


  @ManyToMany(() => Language, language => language.doctors)
  @JoinTable()
  languages: Language[];


  // @OneToMany(() => Language, (language) => language.doctor)
  // languages: Language[];

  // @OneToMany(() => AcceptedInsurancePlan,
  //   (acceptedInsurancePlan) => acceptedInsurancePlan.doctor
  // )
  // acceptedInsurancePlans: AcceptedInsurancePlan[];

  @Column({ default: null })
  insuranceIdAttachment: string;

  @Column({ default: null })
  boardCertified: string;

  @Column({ default: null })
  suffix: string;

  @Column({ default: null })
  basicEducation: string;

  @Column({ default: null })
  age: string;

  @Column({ default: null })
  drivingLicenseAttachment: string;

  @Column({ default: null })
  hospitalAffiliate: string;

  @Column({ default: null })
  hospitalName: string;

  @Column({ default: null })
  facultyAppoinment: string;

  @Column({ default: null })
  facultyAppoinmentTitle: string;

  @Column({ default: null })
  providerOfficeLocation: string;

  @Column({ default: null })
  providerZip: string;

  @Column({ default: null })
  providerStreet: string;

  @Column({ default: null })
  providerCity: string;

  @Column({ default: null })
  website: string;

  @Column({ default: null })
  officeHours: string;

  @Column({ default: null })
  officeDays: string;

  @Column({ default: null })
  providerSuite: string;

  @Column({ default: null })
  providerState: string;

  @Column({ default: null })
  verificationCode: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

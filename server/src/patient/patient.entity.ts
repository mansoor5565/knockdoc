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
export class Patient {
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

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  image: string;

  @Column({ default: null })
  dob: Date;

  @Column({ default: null })
  gender: string;

  @Column({ default: null })
  race: string;

  @Column({ default: null })
  mail_address: string;

  @Column({ default: null })
  mail_city: string;

  @Column({ default: null })
  mail_state: string;

  @Column({ default: null })
  mail_zip: string;

  @Column({ default: null })
  mail_street: string;

  @Column({ default: null })
  mail_suite: string;


  @Column({ default: null })
  work_address: string;

  @Column({ default: null })
  work_city: string;

  @Column({ default: null })
  work_state: string;

  @Column({ default: null })
  work_zip: string;

  @Column({ default: null })
  work_street: string;

  @Column({ default: null })
  work_suite: string;


  @Column({ default: null })
  home_address: string;

  @Column({ default: null })
  home_city: string;

  @Column({ default: null })
  home_state: string;

  @Column({ default: null })
  home_zip: string;

  @Column({ default: null })
  home_street: string;

  @Column({ default: null })
  home_suite: string;

  @Column({ default: null })
  drivingLicense: string;


  @Column({ default: null })
  preferred_age: string;

  @Column({ default: null })
  preferred_gender: string;
  
  @Column({ default: null })
  preferred_insurance: string;

  @Column({ default: null })
  allergy: string;

  @Column({ default: null })
  verificationCode: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

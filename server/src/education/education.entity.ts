
import { Doctor } from 'src/doctor/doctor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  medicalSchool: string;

  @Column()
  educated: string;


  @Column()
  degree: string;


  @Column()
  year: string;


  @ManyToOne(() => Doctor, (doctor) => doctor.educations)
  doctor: Doctor

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
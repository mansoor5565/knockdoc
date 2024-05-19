
import { Doctor } from 'src/doctor/doctor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  certificateName: string;

  @Column()
  year: string;

  @Column()
  attachment: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.certifications)
  doctor: Doctor

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

import { Doctor } from 'src/doctor/doctor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Mbl {
  @PrimaryGeneratedColumn('uuid')
  id: string;  

  @Column()
  country: string;

  @Column()
  stateLisence: string;

  @Column()
  lisenceNumber: string;

  @Column()
  npiNumber: string;

  @Column()
  date: string;

  @Column()
  certificateImage: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.mbls)
  doctor: Doctor

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
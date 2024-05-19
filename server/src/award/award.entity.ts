
import { Doctor } from 'src/doctor/doctor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Award {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  awardName: string;

  @Column()
  year: string;

  @Column()
  attachment: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.awards)
  doctor: Doctor

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
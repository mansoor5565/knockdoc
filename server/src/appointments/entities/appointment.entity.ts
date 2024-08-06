import { Patient } from './../../patient/patient.entity';
import { Doctor } from 'src/doctor/doctor.entity';
import { Timeslot } from 'src/timeslot/entities/timeslot.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    ManyToOne
} from "typeorm";
@Entity()
export class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
    doctor: Doctor
    @ManyToOne(() => Patient, (patient) => patient.appointments)
    patient: Patient
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

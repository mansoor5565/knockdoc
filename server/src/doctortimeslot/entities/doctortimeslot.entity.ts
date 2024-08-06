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
} from 'typeorm';

@Entity()
export class DoctorTimeSlot {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Doctor, doctor => doctor.DoctorTimeSlots)
    doctor: Doctor;

    @ManyToOne(() => Timeslot, timeslot => timeslot.DoctorTimeSlots)
    timeslot: Timeslot;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({default: true})
    available:boolean
}
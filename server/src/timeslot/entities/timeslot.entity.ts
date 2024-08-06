import { Doctor } from 'src/doctor/doctor.entity';
import { DoctorTimeSlot } from '../../doctortimeslot/entities/doctortimeslot.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
    Unique
} from "typeorm";
@Entity()
@Unique(['startTime','dayOfWeek']) 
export class Timeslot {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('time')
    startTime:string;

    @Column()
    dayOfWeek:string;
    
    @OneToMany(() => DoctorTimeSlot, doctorTimeSlot => doctorTimeSlot.timeslot)
    DoctorTimeSlots: DoctorTimeSlot[];
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

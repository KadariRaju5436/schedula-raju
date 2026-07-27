import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Doctor } from '../../doctor/doctor.entity';

@Entity()
export class RecurringAvailability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dayOfWeek: string;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.recurringAvailabilities, {
    onDelete: 'CASCADE',
  })
  doctor: Doctor;
}
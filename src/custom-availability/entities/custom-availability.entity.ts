import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Doctor } from '../../doctor/doctor.entity';

@Entity()
export class CustomAvailability {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'time' })
  startTime!: string;

  @Column({ type: 'time' })
  endTime!: string;

  @ManyToOne(
    () => Doctor,
    (doctor) => doctor.customAvailabilities,
    { onDelete: 'CASCADE' },
  )
  doctor!: Doctor;
}
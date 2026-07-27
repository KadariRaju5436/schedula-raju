import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecurringAvailability } from '../recurring-availability/entities/recurring-availability.entity';
import { CustomAvailability } from '../custom-availability/entities/custom-availability.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  userId!: string;

  @Column()
  fullName!: string;

  @Column()
  specialization!: string;

  @Column({ type: 'int' })
  experienceYears!: number;

  @Column()
  qualification!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  consultationFee!: number;

  @Column()
  availabilityHours!: string;

  @Column({ type: 'text', nullable: true })
  profileDetails!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  @OneToMany(
  () => RecurringAvailability,
  (availability) => availability.doctor,
)
recurringAvailabilities!: RecurringAvailability[];

@OneToMany(
  () => CustomAvailability,
  (availability) => availability.doctor,
)
customAvailabilities!: CustomAvailability[];
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from '../doctor/doctor.entity';
import { RecurringAvailability } from './entities/recurring-availability.entity';
import { RecurringAvailabilityController } from './recurring-availability.controller';
import { RecurringAvailabilityService } from './recurring-availability.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
  RecurringAvailability,
  Doctor,
]),
  ],
  controllers: [RecurringAvailabilityController],
  providers: [RecurringAvailabilityService],
})
export class RecurringAvailabilityModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringAvailability } from '../recurring-availability/entities/recurring-availability.entity';
import { CustomAvailability } from './entities/custom-availability.entity';
import { Doctor } from '../doctor/doctor.entity';

import { CustomAvailabilityController } from './custom-availability.controller';
import { CustomAvailabilityService } from './custom-availability.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomAvailability,
      Doctor,
       RecurringAvailability,
    ]),
  ],
  controllers: [CustomAvailabilityController],
  providers: [CustomAvailabilityService],
})
export class CustomAvailabilityModule {}
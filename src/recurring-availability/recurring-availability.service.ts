import { Doctor } from '../doctor/doctor.entity';
  import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

import { RecurringAvailability } from './entities/recurring-availability.entity';
import { CreateRecurringAvailabilityDto } from './dto/create-recurring-availability.dto';
import { UpdateRecurringAvailabilityDto } from './dto/update-recurring-availability.dto';

@Injectable()
export class RecurringAvailabilityService {
  constructor(
  @InjectRepository(RecurringAvailability)
  private readonly recurringAvailabilityRepository: Repository<RecurringAvailability>,

  @InjectRepository(Doctor)
  private readonly doctorRepository: Repository<Doctor>,
) {}

  async create(userId: string,
    dto: CreateRecurringAvailabilityDto) {

  const doctor = await this.doctorRepository.findOne({
    where: {userId},
  });
  
  if (!doctor) {
    throw new BadRequestException('Doctor not found');
  }
  if (dto.startTime >= dto.endTime) {
  throw new BadRequestException(
    'Start time must be earlier than end time',
  );
}

const existingAvailability =
    await this.recurringAvailabilityRepository.findOne({
      where: {
        doctor: { id: doctor.id },
        dayOfWeek: dto.dayOfWeek,
      },
    });


  if (existingAvailability) {
    const overlaps =
      dto.startTime < existingAvailability.endTime &&
      dto.endTime > existingAvailability.startTime;

    if (overlaps) {
      throw new BadRequestException(
        'Availability time overlaps with an existing slot',
      );
    }
  }
  const availability = this.recurringAvailabilityRepository.create({
    ...dto,
    doctor,
  });

  return await this.recurringAvailabilityRepository.save(availability);
}

  async findAll() {
    return await this.recurringAvailabilityRepository.find();
  }

  async update(
    id: string,
    dto: UpdateRecurringAvailabilityDto,
  ) {
    await this.recurringAvailabilityRepository.update(id, dto);

    return await this.recurringAvailabilityRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string) {
    await this.recurringAvailabilityRepository.delete(id);

    return {
      message: 'Availability deleted successfully',
    };
  }
}
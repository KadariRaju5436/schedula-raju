import { RecurringAvailability } from '../recurring-availability/entities/recurring-availability.entity';

import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Doctor } from '../doctor/doctor.entity';
import { CustomAvailability } from './entities/custom-availability.entity';
import { CreateCustomAvailabilityDto } from './dto/create-custom-availability.dto';
import { UpdateCustomAvailabilityDto } from './dto/update-custom-availability.dto';

@Injectable()
export class CustomAvailabilityService {
  constructor(
    @InjectRepository(CustomAvailability)
    private readonly customAvailabilityRepository: Repository<CustomAvailability>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(RecurringAvailability)
  private readonly recurringAvailabilityRepository: Repository<RecurringAvailability>,
  ) {}

  async create(
    userId: string,
    dto: CreateCustomAvailabilityDto,
  ) {
    const doctor = await this.doctorRepository.findOne({
      where: { userId },
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
      await this.customAvailabilityRepository.findOne({
        where: {
          doctor: { id: doctor.id },
          date: dto.date,
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

    const availability = this.customAvailabilityRepository.create({
      ...dto,
      doctor,
    });

    return await this.customAvailabilityRepository.save(availability);
  }

  async findAll() {
    return await this.customAvailabilityRepository.find({
      relations: ['doctor'],
    });
  }

  async update(
    id: string,
    dto: UpdateCustomAvailabilityDto,
  ) {
    await this.customAvailabilityRepository.update(id, dto);

    return await this.customAvailabilityRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string) {
    await this.customAvailabilityRepository.delete(id);

    return {
      message: 'Custom availability deleted successfully',
    };
  }

 
   async findByDate(userId: string, date: string) {
  const doctor = await this.doctorRepository.findOne({
    where: { userId },
  });

  if (!doctor) {
    throw new BadRequestException('Doctor not found');
  }

  
  const customAvailability =
    await this.customAvailabilityRepository.find({
      where: {
        doctor: { id: doctor.id },
        date,
      },
    });

  if (customAvailability.length > 0) {
    return customAvailability;
  }

 
  const dayOfWeek = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
  });

  return await this.recurringAvailabilityRepository.find({
    where: {
      doctor: { id: doctor.id },
      dayOfWeek,
    },
  });
}
}
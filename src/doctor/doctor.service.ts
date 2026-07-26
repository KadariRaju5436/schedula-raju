import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async create(userId: string, dto: CreateDoctorDto) {
    const existing = await this.doctorRepo.findOne({ where: { userId } });
    if (existing) {
      throw new ConflictException('Doctor profile already exists');
    }

    const doctor = this.doctorRepo.create({ ...dto, userId });
    return this.doctorRepo.save(doctor);
  }

  async findOne(userId: string) {
    const doctor = await this.doctorRepo.findOne({ where: { userId } });
    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }
    return doctor;
  }

  async update(userId: string, dto: UpdateDoctorDto) {
    const doctor = await this.findOne(userId);
    Object.assign(doctor, dto);
    return this.doctorRepo.save(doctor);
  }
}

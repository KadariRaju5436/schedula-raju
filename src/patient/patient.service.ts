import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async create(userId: string, dto: CreatePatientDto) {
    const existing = await this.patientRepo.findOne({ where: { userId } });
    if (existing) {
      throw new ConflictException('Patient profile already exists');
    }

    const patient = this.patientRepo.create({ ...dto, userId });
    return this.patientRepo.save(patient);
  }

  async findOne(userId: string) {
    const patient = await this.patientRepo.findOne({ where: { userId } });
    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }
    return patient;
  }

  async update(userId: string, dto: UpdatePatientDto) {
    const patient = await this.findOne(userId);
    Object.assign(patient, dto);
    return this.patientRepo.save(patient);
  }
}

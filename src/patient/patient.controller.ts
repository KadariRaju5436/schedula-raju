import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.PATIENT)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('profile')
  create(@Req() req: Request, @Body() dto: CreatePatientDto) {
    const userId = (req.user as { userId: string }).userId;
    return this.patientService.create(userId, dto);
  }

  @Get('profile')
  findOne(@Req() req: Request) {
    const userId = (req.user as { userId: string }).userId;
    return this.patientService.findOne(userId);
  }

  @Patch('profile')
  update(@Req() req: Request, @Body() dto: UpdatePatientDto) {
    const userId = (req.user as { userId: string }).userId;
    return this.patientService.update(userId, dto);
  }
}

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
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.DOCTOR)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('profile')
  create(@Req() req: Request, @Body() dto: CreateDoctorDto) {
    const userId = (req.user as { userId: string }).userId;
    return this.doctorService.create(userId, dto);
  }

  @Get('profile')
  findOne(@Req() req: Request) {
    const userId = (req.user as { userId: string }).userId;
    return this.doctorService.findOne(userId);
  }

  @Patch('profile')
  update(@Req() req: Request, @Body() dto: UpdateDoctorDto) {
    const userId = (req.user as { userId: string }).userId;
    return this.doctorService.update(userId, dto);
  }
}

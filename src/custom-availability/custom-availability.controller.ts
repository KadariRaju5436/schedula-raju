
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';

import { CustomAvailabilityService } from './custom-availability.service';
import { CreateCustomAvailabilityDto } from './dto/create-custom-availability.dto';
import { UpdateCustomAvailabilityDto } from './dto/update-custom-availability.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.DOCTOR)
@Controller('doctor/availability')
export class CustomAvailabilityController {
  constructor(
    private readonly customAvailabilityService: CustomAvailabilityService,
  ) {}

  @Post('override')
  create(
    @Req() req: Request,
    @Body() dto: CreateCustomAvailabilityDto,
  ) {
    const userId = (req.user as { userId: string }).userId;
    return this.customAvailabilityService.create(userId, dto);
  }

  @Get('override')
  findAll() {
    return this.customAvailabilityService.findAll();
  }

  @Patch('override/:id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomAvailabilityDto,
  ) {
    return this.customAvailabilityService.update(id, dto);
  }

  @Delete('override/:id')
  remove(@Param('id') id: string) {
    return this.customAvailabilityService.remove(id);
  }

  @Get('date')
findByDate(
  @Req() req: Request,
  @Query('date') date: string,
) {
  const userId = (req.user as { userId: string }).userId;
  return this.customAvailabilityService.findByDate(userId, date);
}
}

